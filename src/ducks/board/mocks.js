let id = 0;

export const mockBoard = {
  id: (id++).toString(),
  name: 'Kanban-Board',
  background: {
    type: 'color',
    color: 'grey',
    // url:
    //   'https://images.unsplash.com/photo-1508625935447-e0ebc2cdf6bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
  },
  lists: [
    {
      id: (id++).toString(),
      name: 'TO DO',
      cards: [
        {
          id: (id++).toString(),
          content: 'Пройти курс по React',
        },
        {
          id: (id++).toString(),
          content: 'Отметить день рождения',
        },
        {
          id: (id++).toString(),
          content: 'Сделать бэкенд своего сайта на node.js',
        },
        {
          id: (id++).toString(),
          content: 'Собрать портфолио',
        },
        {
          id: (id++).toString(),
          content: 'Написать первую статью в блог',
        },
        {
          id: (id++).toString(),
          content: 'Выспаться',
        },
        {
          id: (id++).toString(),
          content: 'Посмотреть игру престолов',
        },
        {
          id: (id++).toString(),
          content: 'Научиться рисовать',
        },
        {
          id: (id++).toString(),
          content: 'Сделать уборку',
        },
        {
          id: (id++).toString(),
          content: 'Записаться в тренажерный зал',
        },
        {
          id: (id++).toString(),
          content: 'Купить обогреватель',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'IN PROGRESS',
      cards: [
        {
          id: (id++).toString(),
          content: 'Написать To-Do app',
        },
        {
          id: (id++).toString(),
          content: 'Отложить 2000 рублей',
        },
        {
          id: (id++).toString(),
          content: 'Нарисовать мотивационный плакат «Магии нет»',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'DONE',
      cards: [
        {
          id: (id++).toString(),
          content: 'Записаться на курс по React',
        },
        {
          id: (id++).toString(),
          content: 'Забронировать тир на субботу',
        },
        {
          id: (id++).toString(),
          content: 'Накидать тем для статей в блог',
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
