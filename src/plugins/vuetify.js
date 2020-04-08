import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'


Vue.use(Vuetify, {
  theme: {
    primary: colors.blue,
    secondary: colors.blue.lighten2,
    accent: colors.cyan,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'fa',
})
