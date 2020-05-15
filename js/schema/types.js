export const types = {
  design: {
    type:'design',
    name:'Программа',
    title:'Программы',
    sort:'AB',
    links:['project'],
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Название',
        placeholder:'Уникальное название программы'
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Идея'
      }
    }
  },

  project: {
    type:'project',
    name:'Проект',
    title:'Проекты',
    sort:'AB',
    host: 'design',
    links:['design','object','event'],
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Название',
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Описание'
      }
    },
  },

  object: {
    type:'object',
    name:'Объект',
    title:'Объекты',
    sort:'AB',
    host: 'project',
    links:['project'],
    description:'Физический предмет',
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Название',
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Описание'
      }
    },
  },

  event: {
    type:'event',
    name:'Событие',
    title:'События',
    sort:null,
    host:'project',
    links:['project'],
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Название',
        placeholder:'Название события'
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Описание'
      }
    }
  },

  person: {
    type:'person',
    name:'Личность',
    title:'Личности',
    sort:null,
    links:['design','project','object','event'],
    fields: {
      default: {
        type:'text',
        name:'alias',
        label:'Алиас',
        placeholder:'Ваш алиас'
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Описание'
      },
    }
  },

}
