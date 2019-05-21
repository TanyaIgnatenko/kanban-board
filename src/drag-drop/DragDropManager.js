import React from 'react';
import DragDropContext from './internal/DragDropContext';

class DragDropManager extends React.Component {
  grabDraggable = (
    grabPosition,
    { context, type, onRelease, node, renderElement },
  ) => {
    if (this.draggedObject !== null) {
      console.error('Grabbing object while object already grabbed');
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

    this.setState({
      draggedObjectPosition: newPosition,
    });

    event.preventDefault();
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

    currentHoveredDroppable.onDraggableLeaveCallback();
    currentDraggedObject.onRelease({
      draggableContext: currentDraggedObject.context,
      droppableContext: currentHoveredDroppable.context,
    });

    event.preventDefault();
  };

  onDraggableEnterDroppable = (context, onDraggableLeaveCallback) => {
    if (this.hoveredDroppable !== null) {
      this.hoveredDroppable.onDraggableLeaveCallback();
    }

    this.hoveredDroppable = {
      context,
      onDraggableLeaveCallback,
    };
  };

  state = {
    draggedObjectPosition: null,
  };

  draggedObject = null;
  hoveredDroppable = null;
  dndContext = {
    draggedObject: null,
    grabDraggable: this.grabDraggable,
    onDraggableEnterDroppable: this.onDraggableEnterDroppable,
  };

  render() {
    const { children } = this.props;
    const { draggedObjectPosition } = this.state;
    const { draggedObject } = this;

    return (
      <>
        {draggedObject &&
          draggedObject.renderElement({
            clientPosition: draggedObjectPosition,
          })}
        <DragDropContext.Provider value={this.dndContext}>
          {children}
        </DragDropContext.Provider>
      </>
    );
  }
}

export default DragDropManager;
