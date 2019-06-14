let id = 0;

export const mockBoard = {
  id: (id++).toString(),
  name: {
    text: 'Проект «Канбан Доска»',
    color: 'white',
  },
  background: {
    type: 'img',
    color: 'rgba(252,223,161,0.91)',
    url:
      'https://cdn.dribbble.com/users/58661/screenshots/1818073/csc_pattern.png',
  },
  lists: [
    {
      id: (id++).toString(),
      name: 'TO DO',
      cards: [
        {
          id: (id++).toString(),
          content:
            'Сделать реалистичную анимацию захвата карточки\n' +
            '( в зависимости от места захвата поворачивать карточку на разный угол, ' +
            'при падении карточки плавно анимировать её разворот в исходное положение и изменение размера плейсхолдера :))\n',
        },
        {
          id: (id++).toString(),
          content: 'Сделать бэкенд на node.js',
        },
        {
          id: (id++).toString(),
          content: 'Добавить возможность редактировать карточки / колонки',
        },
        {
          id: (id++).toString(),
          content: 'Добавить возможность удалять карточки / колонки',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'IN PROGRESS',
      cards: [
        {
          id: (id++).toString(),
          content:
            'Сделать функцию перемещения доступной и на мобильных устройствах',
        },
        {
          id: (id++).toString(),
          content: 'По правому клику не инициировать перемещение',
        },
        {
          id: (id++).toString(),
          content: 'После проста клика не инцииировать перемещение',
        },
        {
          id: (id++).toString(),
          content: 'Выделять плейсхолдер для перетаскиваемой колонки цветом',
        },
      ],
    },
    {
      id: (id++).toString(),
      name: 'DONE',
      cards: [
        {
          id: (id++).toString(),
          content: 'Добавить возможность перетаскивать карточки',
        },
        {
          id: (id++).toString(),
          content: 'Добавить возможность перетаскивать колонки',
        },
        {
          id: (id++).toString(),
          content: 'Добавить возможность создавать новые карточки',
        },
        {
          id: (id++).toString(),
          content: 'Добавить возможность создавать новые колонки',
        },
        {
          id: (id++).toString(),
          content: 'Гибкая drag drop system',
        },
        {
          id: (id++).toString(),
          content:
            'Позволить droppable объекту иметь несколько accepted draggable types',
        },
        {
          id: (id++).toString(),
          content:
            'Устранить мельтешение карточки с мешьшим по размеру плейсхолдером',
        },
        {
          id: (id++).toString(),
          content: 'Позволить перетаскиваемому объекту сдвигать скроллбар',
        },
        {
          id: (id++).toString(),
          content: 'Устранить text overflow проблему',
        },
        {
          id: (id++).toString(),
          content:
            'При открытии формы создания новой карточки передвигать её в зону видимости',
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
