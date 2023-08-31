let id = 0;

export const mockBoard = {
  id: (id++).toString(),
  name: {
    text: 'Project "Kanban board"',
    color: 'white',
  },
  lists: [
    {
      id: (id++).toString(),
      name: 'TO DO',
      cards: [
        {
          id: (id++).toString(),
          content: 'Add an opportunity to edit cards / columns',
        },
        {
          id: (id++).toString(),
          content: 'Add an opportunity to delete cards / columns',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'IN PROGRESS',
      cards: [],
    },
    {
      id: (id++).toString(),
      name: 'DONE',
      cards: [
        {
          id: (id++).toString(),
          content: 'Add an opportunity to move cards',
        },
        {
          id: (id++).toString(),
          content: 'Add an opportunity to move columns',
        },
        {
          id: (id++).toString(),
          content: 'Add an opportunity to create new cards',
        },
        {
          id: (id++).toString(),
          content: 'Add an opportunity to create new columns',
        },
        {
          id: (id++).toString(),
          content: 'A flexible drag drop system',
        },
        {
          id: (id++).toString(),
          content:
            'Add an ability to have several accepted draggable types for a droppable object',
        },
        {
          id: (id++).toString(),
          content:
            'Get rid of placeholder movement back and forth',
        },
        {
          id: (id++).toString(),
          content: 'Add an ability to move scrollbar for a draggable object',
        },
        {
          id: (id++).toString(),
          content: 'Add an ability to scroll a board by clicking it and by an attempt to shift it',
        },
        {
          id: (id++).toString(),
          content: 'Solve a text overflow problem',
        },
        {
          id: (id++).toString(),
          content:
            'Make a form of creating new card visible at the opening',
        },
        {
          id: (id++).toString(),
          content: 'Make cards and columns accessible from a keyboard',
        },
        {
          id: (id++).toString(),
          content:
            'Forbid of creation of empty cards',
        },
        {
          id: (id++).toString(),
          content: 'Don\'t start dragging after a short click',
        },
        {
          id: (id++).toString(),
          content:
            'Don\'t start dragging by a right / middle mouse click',
        },
        {
          id: (id++).toString(),
          content: 'Highlight a placeholder for a dragging column with a color',
        },
        {
          id: (id++).toString(),
          content:
            'Add support of a drag n drop feature for mobile devices',
        },
        {
          id: (id++).toString(),
          content:
            'Add a realistic animation for a dragging card',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'RETROSPECTIVE',
      cards: [],
    },
  ],
};
