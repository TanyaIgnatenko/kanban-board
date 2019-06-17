import React from 'react';
import PropTypes from 'prop-types';

import DragDropContext from './internal/DragDropContext';

import {
  hasHorizontalScrollbar,
  hasVerticalScrollbar,
} from '../helpers/scrollbar';

import { hideElement, showElement } from '../helpers/visibility';
import { MOUSE_BUTTON, MOVEMENT } from '../constants';
import { inside } from '../helpers/inside';

class DragDropManager extends React.Component {
  state = {
    draggedObjectPosition: null,
  };

  draggedObject = null;
  hoveredDroppable = null;
  droppables = {};
  scrollables = {};

  registerScrollable = scrollable => {
    this.scrollables[scrollable.id] = scrollable;
    return () => {
      delete this.scrollables[scrollable.id];
    };
  };

  registerDroppable = droppable => {
    this.droppables[droppable.id] = droppable;
    return () => {
      delete this.droppables[droppable.id];
    };
  };

  registerDraggable = ({ dragHandleRef, ...draggable }) => {
    const handle = dragHandleRef.current;

    const onPointerDown = event => {
      const { which: mouseButton } = event;
      if (mouseButton !== MOUSE_BUTTON.LEFT) return;

      const { clientX, clientY } = event;
      const grabPosition = {
        x: clientX,
        y: clientY,
      };
      const draggedObjectRect = draggable.ref.current.getBoundingClientRect();
      const grabShift = {
        x: draggedObjectRect.left - grabPosition.x,
        y: draggedObjectRect.top - grabPosition.y,
      };

      this.bindedStartDragIfMove = event =>
        this.startDragIfMove(
          { handle, ...draggable },
          grabPosition,
          grabShift,
          event,
        );

      document.addEventListener('mousemove', this.bindedStartDragIfMove);
      document.addEventListener('mouseup', this.resetPreparationToDrag);

      event.stopPropagation();
    };

    handle.addEventListener('mousedown', onPointerDown);

    return function unregisterDraggable() {
      handle.removeEventListener('mousedown', onPointerDown);
    };
  };

  startDragIfMove = (draggable, grabPosition, grabShift, event) => {
    const { clientX: newX, clientY: newY } = event;

    if (
      Math.abs(newX - grabPosition.x) > 2 ||
      Math.abs(newY - grabPosition.y) > 2
    ) {
      document.removeEventListener('mousemove', this.bindedStartDragIfMove);
      document.removeEventListener('mouseup', this.resetPreparationToDrag);

      this.grabDraggable({
        grabShift,
        ...draggable,
      });
    }
  };

  resetPreparationToDrag = () => {
    document.removeEventListener('mousemove', this.bindedStartDragIfMove);
    document.removeEventListener('mouseup', this.resetPreparationToDrag);
  };

  grabDraggable = ({
    grabShift,
    context,
    type,
    ref,
    handle,
    renderAvatar,
    onRelease,
  }) => {
    const draggedObjectRect = ref.current.getBoundingClientRect();

    this.draggedObject = {
      context,
      type,
      renderAvatar,
      handle,
      onRelease,
      geometry: {
        width: draggedObjectRect.width,
        height: draggedObjectRect.height,
        grabShift,
      },
      position: {
        x: draggedObjectRect.left,
        y: draggedObjectRect.top,
      },
      movement: [],
    };

    this.dndContext.draggedObject = this.draggedObject;

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
    registerDraggable: this.registerDraggable,
    registerDroppable: this.registerDroppable,
    registerScrollable: this.registerScrollable,
  };

  moveDraggable = event => {
    const { clientX, clientY } = event;
    const { movementX, movementY } = event;
    const { geometry } = this.draggedObject;

    const newPosition = {
      x: clientX + geometry.grabShift.x,
      y: clientY + geometry.grabShift.y,
    };
    this.draggedObject.position = newPosition;

    const movement = [];
    if (movementX) {
      movement.push(movementX > 0 ? MOVEMENT.RIGHT : MOVEMENT.LEFT);
    }
    if (movementY) {
      movement.push(movementY > 0 ? MOVEMENT.BOTTOM : MOVEMENT.TOP);
    }
    this.draggedObject.movement = movement;

    this.scrollIfNedeed({ x: clientX, y: clientY });

    this.manageDroppables();

    this.setState({ draggedObjectPosition: newPosition });
  };

  scrollIfNedeed(cursorPosition) {
    Object.values(this.scrollables).forEach(scrollable => {
      const {
        scrollStep,
        scrollPointOffset,
        scrolledByTypes,
        ref: { current: scrollableNode },
      } = scrollable;

      if (!scrollableNode) return;

      if (!scrolledByTypes.includes(this.draggedObject.type)) return;

      if (!inside(cursorPosition, scrollableNode)) return;

      if (hasHorizontalScrollbar(scrollableNode)) {
        if (cursorPosition.x <= scrollableNode.clientLeft + scrollPointOffset) {
          scrollableNode.scrollLeft -= scrollStep;
        } else if (
          cursorPosition.x >=
          scrollableNode.clientWidth - scrollPointOffset
        ) {
          scrollableNode.scrollLeft += scrollStep;
        }
      }
      if (hasVerticalScrollbar(scrollableNode)) {
        if (cursorPosition.y <= scrollableNode.clientTop + scrollPointOffset) {
          scrollableNode.scrollTop -= scrollStep;
        } else if (
          cursorPosition.y >=
          scrollableNode.clientWidth - scrollPointOffset
        ) {
          scrollableNode.scrollTop += scrollStep;
        }
      }
    });
  }

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

    this.hoveredDroppable = this.droppables[currentDroppable.id];

    const droppableChanged =
      !lastDroppable || currentDroppable.id !== lastDroppable.id;

    if (droppableChanged) {
      if (lastDroppable) {
        lastDroppable.onDraggableLeave();
      }

      this.hoveredDroppable.onDraggableEnter(this.draggedObject);
    }
    this.hoveredDroppable.onDraggableHover(this.draggedObject);
  }

  findDroppable = position => {
    const draggedNode = this.draggedObject.node;

    hideElement(draggedNode);
    let element = document.elementFromPoint(position.x, position.y);
    showElement(draggedNode);

    while (element) {
      const droppable = element.closest('.droppable');

      if (!droppable) return null;

      if (!this.droppables[droppable.id]) {
        console.warn('Unregistered droppable with id:', droppable.id);

        element = droppable.parentNode;
        continue;
      }

      if (
        this.droppables[droppable.id].acceptedTypes.includes(
          this.draggedObject.type,
        )
      ) {
        return this.droppables[droppable.id];
      }

      element = droppable.parentNode;
    }

    return null;
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
          draggedObject.renderAvatar({
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

DragDropManager.propTypes = {
  children: PropTypes.any.isRequired,
};

export default DragDropManager;
