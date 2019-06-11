import React from 'react';

import DragDropContext from './internal/DragDropContext';

class DragDropManager extends React.Component {
  state = {
    draggedObjectPosition: null,
  };

  draggedObject = null;
  hoveredDroppable = null;
  droppables = {};

  registerDroppable = droppable => {
    this.droppables[droppable.id] = droppable;
    return () => {};
  };

  registerDraggable = ({ dragHandle, ...draggable }) => {
    const handle = dragHandle.current;

    const onPointerDown = event => {
      const { clientX, clientY } = event;

      this.grabDraggable({
        grabPosition: {
          x: clientX,
          y: clientY,
        },
        handle,
        ...draggable,
      });

      event.stopPropagation();
    };

    handle.addEventListener('pointerdown', onPointerDown);

    return function unregisterDraggable() {
      handle.removeEventListener('pointerdown', onPointerDown);
    };
  };

  grabDraggable = ({
    grabPosition,
    context,
    type,
    node,
    handle,
    renderElement,
    onRelease,
  }) => {
    const draggedObjectRect = node.current.getBoundingClientRect();

    this.draggedObject = {
      context,
      type,
      renderElement,
      handle,
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
    };

    this.dndContext.draggedObject = this.draggedObject;

    this.manageDroppables();

    this.setState(
      {
        draggedObjectPosition: this.draggedObject.position,
      },
      () => {
        document.addEventListener('pointermove', this.moveDraggable);
        document.addEventListener('pointerup', this.releaseDraggable);
      },
    );
  };

  dndContext = {
    draggedObject: null,
    registerDraggable: this.registerDraggable,
    registerDroppable: this.registerDroppable,
  };

  moveDraggable = event => {
    const { clientX, clientY } = event;
    const { geometry } = this.draggedObject;

    const newPosition = {
      x: clientX + geometry.grabShift.x,
      y: clientY + geometry.grabShift.y,
    };
    this.draggedObject.position = newPosition;

    this.scrollIfOutOfClient({ x: clientX, y: clientY });

    this.manageDroppables();

    this.setState({ draggedObjectPosition: newPosition });
  };

  scrollIfOutOfClient(position) {
    const {
      mainScrollbarContainer: { current: scrollbarContainer },
    } = this.props;

    if (position.x >= scrollbarContainer.clientWidth - 50) {
      scrollbarContainer.scrollBy(10, 0);
    }

    if (position.y >= scrollbarContainer.innerHeight - 50) {
      scrollbarContainer.scrollBy(0, 20);
    }

    if (position.x <= scrollbarContainer.clientLeft - 50) {
      scrollbarContainer.scrollBy(-20, 0);
    }

    if (position.y <= scrollbarContainer.clientTop - 50) {
      scrollbarContainer.scrollBy(0, -20);
    }
  }

  releaseDraggable = () => {
    const currentDraggedObject = this.draggedObject;
    const currentHoveredDroppable = this.hoveredDroppable;

    document.removeEventListener('pointermove', this.moveDraggable);
    document.removeEventListener('pointerup', this.releaseDraggable);

    this.draggedObject = null;
    this.hoveredDroppable = null;
    this.dndContext.draggedObject = null;
    this.setState({
      draggedObjectPosition: null,
    });

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
    const draggedNode = this.draggedObject.node;

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

  setDraggedObjectRef = draggedObjectNode => {
    if (this.draggedObject) {
      this.draggedObject.node = draggedObjectNode;
    }
  };

  render() {
    const { children } = this.props;
    const { draggedObjectPosition } = this.state;
    const { draggedObject, dndContext } = this;

    return (
      <>
        {draggedObject &&
          draggedObject.renderElement({
            clientPosition: draggedObjectPosition,
            draggedObjectRef: this.setDraggedObjectRef,
          })}
        <DragDropContext.Provider value={dndContext}>
          {children}
        </DragDropContext.Provider>
      </>
    );
  }
}

export default DragDropManager;
