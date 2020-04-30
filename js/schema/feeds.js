const user = {
  title:'User',
  description:'A user of the app',
  type:'object',
  properties: {
    name: {
      type:'string',
      title:'Имя или никнейм',
    },
    avatar: {
      type:'image',
    },

  },
  required:['name']
}

const nodes = {
    design:{
        name:'design',
        title:"Затея",
        definition: "Затея — план создания объектов или организации событий",
        fields: {

        },
        links: {

        },
    },
    project:{
        name:'project',
        title:'Проект'
    },
    object:{
        name:'object',
        title:'Объект'
    },
    event:{
        name:'event',
        title:"Событие",
        definition: "Событие — ограниченная по времени совместная деятельность или информация о ней, подтвержденная участниками."
    },
    author: {
      name:'author',
      title:"Автор",
      definition: "Автор — первый опубликовавший затею или проект."
    },
    thing:{
        name:'thing',
        title:"Штука",
        definition: "Штука — материальная сушность"
    },
    persona:{
        name:'persona',
        title:'Личность'
    },
    face:{
        name:'face',
        title:'Лицо'
    },
    host:{
        name:'host',
        title:'Ведущий'
    },
    donation:{
        name:'donation',
        title:'Дар'
    },
    skill:{
        name:'skill',
        title:'Навык'
    },
    task:{
        name:'task',
        title:'Задача'
    },
    demand:{
        name:'demand',
        title:'Поставка'
    },
    idea:{
        name:'idea',
        title:'Идея'
    },
    intent:{
        name:'intent',
        title:'Цель'
    },
    gist:{
        name:'gist',
        title:'Суть'
    },
    place:{
        name:'place',
        title:'Место'
    },
    time:{
        name:'time',
        title:'Время'
    },
    feature:{
        name:'feature',
        title:'Возможность'
    },
    tool:{
        name:'tool',
        title:'Инструмент'
    },
    material:{
        name:'material',
        title:'Материал'
    },
    result:{
        name:'result',
        title:'Результат'
    },
    present:{
        name:'present',
        title:'Подарок'
    },
    question:{
        name:'question',
        title:'Вопрос'
    },
    statement:{
        name:'statement',
        title:'Утверждение'
    },
    quality:{
        name:'quality',
        title:'Качество'
    },
    quantity:{
        name:'quantity',
        title:'Количество'
    }
};


export default nodes;
