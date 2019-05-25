import React from 'react';
import DragDropContext from './internal/DragDropContext';

class DragDropManager extends React.Component {
  state = {
    draggedObjectPosition: null,
  };

  draggedObject = null;
  hoveredDroppable = null;
  droppables = {};

  registerAsDroppable = droppable => {
    this.droppables[droppable.id] = droppable;
  };

  grabDraggable = (
    grabPosition,
    context,
    type,
    node,
    renderElement,
    onRelease,
  ) => {
    if (this.draggedObject !== null) {
      console.error('Grabbing object while object already grabbed');
      return;
    }

    const grabbedNode = node.current;
    if (!grabbedNode) {
      console.error('Null ref to grabbed node');
      return;
    }
    const boundingRect = node.current.getBoundingClientRect();

    this.draggedObject = {
      context,
      type,
      renderElement,
      onRelease,
      geometry: {
        width: boundingRect.right - boundingRect.left,
        height: boundingRect.bottom - boundingRect.top,
        grabShift: {
          x: boundingRect.left - grabPosition.x,
          y: boundingRect.top - grabPosition.y,
        },
      },
      position: {
        x: boundingRect.left,
        y: boundingRect.top,
      },
    };

    this.dndContext = {
      ...this.dndContext,
      draggedObject: this.draggedObject,
    };

    this.manageDroppables();

    this.setState(
      {
        draggedObjectPosition: this.draggedObject.position,
      },
      () => {
        document.addEventListener('mousemove', this.moveDraggable);
        document.addEventListener('mouseup', this.releaseDraggable);
      },
    );
  };

  dndContext = {
    draggedObject: null,
    grabDraggable: this.grabDraggable,
    registerAsDroppable: this.registerAsDroppable,
  };

  manageDroppables() {
    const { position, geometry } = this.draggedObject;

    const lastDroppable = this.hoveredDroppable;
    const currentDroppable = this.findDroppable({
      x: position.x + geometry.width / 2,
      y: position.y + geometry.height / 2,
    });

    if (!currentDroppable) {
      return;
    }

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

  moveDraggable = event => {
    const { clientX, clientY } = event;
    const { position } = this.state;

    if (position === null) {
      console.warn('Position is null in moveDraggable');
      return;
    }

    const { geometry } = this.draggedObject;

    const newPosition = {
      x: clientX + geometry.grabShift.x,
      y: clientY + geometry.grabShift.y,
    };
    this.draggedObject.position = newPosition;

    this.manageDroppables();

    this.setState({ draggedObjectPosition: newPosition });
  };

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

  releaseDraggable = () => {
    const currentDraggedObject = this.draggedObject;
    const currentHoveredDroppable = this.hoveredDroppable;

    document.removeEventListener('mousemove', this.moveDraggable);
    document.removeEventListener('mouseup', this.releaseDraggable);

    this.draggedObject = null;
    this.hoveredDroppable = null;
    this.dndContext.draggedObject = null;
    this.setState({
      draggedObjectPosition: null,
    });

    if (currentDraggedObject === null) {
      console.error('Releasing draggable while have not grabbed one yet');
      return;
    }
    if (currentHoveredDroppable === null) {
      console.error('Releasing draggable, which does not hover any droppable');
      return;
    }

    currentDraggedObject.onRelease({
      draggableContext: currentDraggedObject.context,
      droppableContext: currentHoveredDroppable.context,
    });
    currentHoveredDroppable.onDraggableLeave();
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
