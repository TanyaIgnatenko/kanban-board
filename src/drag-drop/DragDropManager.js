import React from 'react';

import DragDropContext from './internal/DragDropContext';

class DragDropManager extends React.Component {
  draggedObject = null;
  hoveredDroppable = null;
  droppables = {};

  registerDroppable = droppable => {
    this.droppables[droppable.id] = droppable;

    return function unregisterDroppable() {
      delete this.droppables[droppable.id];
    }.bind(this);
  };

  registerDraggable = ({ dragHandle, ...draggable }) => {
    const onMouseDown = event => {
      const { clientX, clientY } = event;
      this.grabDraggable({
        grabPosition: {
          x: clientX,
          y: clientY,
        },
        ...draggable,
      });

      event.stopPropagation();
    };

    const handle = dragHandle.current;
    handle.addEventListener('mousedown', onMouseDown);

    return function unregisterDraggable() {
      handle.removeEventListener('mousedown', onMouseDown);
    };
  };

  grabDraggable = ({
    grabPosition,
    id,
    context,
    type,
    node,
    onGrab = () => {},
    onMove = () => {},
    onRelease = () => {},
  }) => {
    onGrab();
    const draggedObjectRect = node.current.getBoundingClientRect();

    this.draggedObject = {
      id,
      context,
      type,
      onMove,
      onRelease,
      geometry: {
        width: draggedObjectRect.width,
        height: draggedObjectRect.height,
        grabShift: {
          x: draggedObjectRect.left - grabPosition.x,
          y: draggedObjectRect.top - grabPosition.y,
        },
      },
      position: {
        x: draggedObjectRect.left,
        y: draggedObjectRect.top,
      },
      node,
    };

    this.setState(state => ({
      dndContext: {
        ...state.dndContext,
        draggedObjectId: this.draggedObject.id,
        draggedObjectPosition: this.draggedObject.position,
      },
    }));

    document.addEventListener('mousemove', this.moveDraggable);
    document.addEventListener('mouseup', this.releaseDraggable);

    this.manageDroppables();
  };

  state = {
    dndContext: {
      draggedObjectId: null,
      draggedObjectPosition: null,
      registerDraggable: this.registerDraggable,
      registerDroppable: this.registerDroppable,
    },
  };

  moveDraggable = event => {
    const { clientX, clientY } = event;
    const { geometry } = this.draggedObject;

    const newPosition = {
      x: clientX + geometry.grabShift.x,
      y: clientY + geometry.grabShift.y,
    };
    this.draggedObject.position = newPosition;
    this.setState(state => ({
      dndContext: { ...state.dndContext, draggedObjectPosition: newPosition },
    }));

    this.manageDroppables();

    this.draggedObject.onMove(newPosition);
  };

  releaseDraggable = () => {
    const currentDraggedObject = this.draggedObject;
    const currentHoveredDroppable = this.hoveredDroppable;

    document.removeEventListener('mousemove', this.moveDraggable);
    document.removeEventListener('mouseup', this.releaseDraggable);

    this.draggedObject = null;
    this.hoveredDroppable = null;
    this.setState(state => ({
      dndContext: {
        ...state.dndContext,
        draggedObjectId: null,
        draggedObjectPosition: null,
      },
    }));

    currentDraggedObject.onRelease({
      draggableContext: currentDraggedObject.context,
      droppableContext: currentHoveredDroppable.context,
    });
    currentHoveredDroppable.onDraggableLeave();
  };

  manageDroppables() {
    const { position, geometry } = this.draggedObject;

    const lastDroppable = this.hoveredDroppable;
    const currentDroppable = this.findDroppable({
      x: position.x + geometry.width / 2,
      y: position.y + geometry.height / 2,
    });

    if (!currentDroppable) return;

    const droppableChanged =
      !lastDroppable || currentDroppable.id !== lastDroppable.id;

    if (droppableChanged) {
      if (lastDroppable) {
        lastDroppable.onDraggableLeave();
      }

      this.hoveredDroppable = this.droppables[currentDroppable.id];

      this.hoveredDroppable.onDraggableEnter(this.draggedObject);
    }
    this.hoveredDroppable.onDraggableHover(this.draggedObject);
  }

  findDroppable = position => {
    const draggedNode = this.draggedObject.node.current;

    if (draggedNode) {
      draggedNode.style.visibility = 'hidden';
    }
    const element = document.elementFromPoint(position.x, position.y);
    if (draggedNode) {
      draggedNode.style.visibility = 'visible';
    }
    if (element == null) {
      return null;
    }

    return element.closest(`.droppable-${this.draggedObject.type}`);
  };

  render() {
    const { children } = this.props;
    const { dndContext } = this.state;

    return (
      <DragDropContext.Provider value={dndContext}>
        {children}
      </DragDropContext.Provider>
    );
  }
}

export default DragDropManager;
