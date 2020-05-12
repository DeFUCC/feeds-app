import {ru} from './ru.js'
import {en} from './en.js'

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ru',
  messages:  {
    en,
    ru,
  },
})
