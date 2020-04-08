import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import MongoAuth from './model/mongo/Auth'
import MongoHearts from './model/mongo/Hearts'
import MongoStrength from './model/mongo/Strength'
import MongoWorkouts from './model/mongo/Workouts'
import MongoLog from './model/mongo/Log'
import MongoStats from './model/mongo/Stats'
import MongoFeedback from './model/mongo/Feedback'
import {Stitch} from 'mongodb-stitch-browser-sdk'
import '@/assets/global.css'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  Vue.config.errorHandler = function (err, vm, info) {
    console.log(err)
    console.log(vm)
    console.log(info)
  }
}

const client = Stitch.initializeDefaultAppClient('EMPTY')

Vue.prototype.$mongo = {
  auth: new MongoAuth(client),
  hearts: new MongoHearts(client),
  strength: new MongoStrength(client),
  workouts: new MongoWorkouts(client),
  log: new MongoLog(client),
  stats: new MongoStats(client),
  feedback: new MongoFeedback(client)
}

Vue.use(require('vue-script2'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
