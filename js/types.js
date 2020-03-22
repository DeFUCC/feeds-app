export const types = {
  word: {
    type:'word',
    name:'Слово',
    title:'Слова',
    sort:'AB',
    links:['meaning','icon'],
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Слово',
        placeholder:'Любой читаемый набор букв'
      },
      stress: {
        type:'stress',
        name:'stress',
        label:'Ударение',
      }
    }
  },

  meaning: {
    type:'meaning',
    name:'Значение',
    title:'Значения',
    sort:'AB',
    fields: {
      default: {
        type:'textarea',
        name:'description',
        label:'Определение'
      }
    },
    links:['word','icon'],
  },

  icon: {
    type:'icon',
    name:'Иконка',
    title:'Иконки',
    sort:'AB',
    description:'Любой смайлик или их сочетание',
    fields: {
      default: {
        type:'emoji',
        name:'title',
        label:'Символы'
      }
    },
    links:['word','meaning'],
  },

  player: {
    type:'player',
    name:'Игрок',
    title:'Игроки',
    sort:null,
    links:['word','meaning','icon'],
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


  game: {
    type:'game',
    name:'Игра',
    title:'Игры',
    sort:null,
    links:['word','meaning','icon','player'],
    fields: {
      default: {
        type:'text',
        name:'title',
        label:'Название',
        placeholder:'Назовите вашу игру'
      },
      description: {
        type:'textarea',
        name:'description',
        label:'Описание'
      }
    }
  },
}
