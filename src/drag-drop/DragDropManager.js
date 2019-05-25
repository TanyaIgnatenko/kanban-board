import React from 'react';
import DragDropContext from './internal/DragDropContext';

class DragDropManager extends React.Component {
  state = {
    draggedObjectPosition: null,
  };

  draggedObject = null;
  hoveredDroppable = null;
  droppables = {};

  registerAsDroppable = ({
    id,
    node,
    context,
    acceptTypes,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  }) => {
    this.droppables[id] = {
      node,
      context,
      acceptTypes,
      onDraggableEnter,
      onDraggableHover,
      onDraggableLeave,
    };
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
    };

    this.dndContext = {
      ...this.dndContext,
      draggedObject: this.draggedObject,
    };

    this.setState(
      {
        draggedObjectPosition: {
          x: boundingRect.left,
          y: boundingRect.top,
        },
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
    this.setState({ draggedObjectPosition: newPosition });

    const lastDroppable = this.hoveredDroppable;
    const currentDroppable = this.findDroppable(newPosition);
    const droppableChanged =
      !lastDroppable ||
      (currentDroppable && currentDroppable.id !== lastDroppable.id);

    if (droppableChanged) {
      this.hoveredDroppable = this.droppables[currentDroppable.id];

      this.hoveredDroppable.acceptDraggedObject = this.hoveredDroppable.acceptTypes.includes(
        this.draggedObject.type,
      );
      if (this.hoveredDroppable.acceptDraggedObject) {
        this.hoveredDroppable.onDraggableEnter(this.draggedObject);
      }
    }
    if (this.hoveredDroppable.acceptDraggedObject) {
      this.hoveredDroppable.onDraggableHover(this.draggedObject);
    }
  };

  findDroppable = position => {
    this.draggedObject.node.style.visibility = 'hidden';
    const element = document.elementFromPoint(position.x, position.y);
    this.draggedObject.node.style.visibility = 'visible';
    console.log('element in findDroppable in DragDropManager: ', element);
    console.log(
      'element.closest() in findDroppable in DragDropManager: ',
      element.closest('droppable'),
    );

    return element.closest('.droppable');
  };

  releaseDraggable = event => {
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
      console.error('Releasing draggable while haven\'t grabbed one yet');
      return;
    }
    if (currentHoveredDroppable === null) {
      console.error('Releasing draggable, which doesn\'t hover any droppable');
      return;
    }

    currentHoveredDroppable.onDraggableLeave();
    console.log('currentDraggedObject in releaseDraggable in DragDropManager: ', currentDraggedObject);
    console.log('currentHoveredDroppable in releaseDraggable in DragDropManager: ', currentHoveredDroppable);
    currentDraggedObject.onRelease({
      draggableContext: currentDraggedObject.context,
      droppableContext: currentHoveredDroppable.context,
    });
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
