import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import MainView from '@/views/MainView'
import TimerView from '@/views/TimerView'
import BenchmarksView from '@/views/BenchmarksView'
import LoginView from '@/views/LoginView'
import ProfileView from '@/views/ProfileView'
import WorkoutView from '@/views/WorkoutView'
import WorkoutsDatabaseView from '@/views/WorkoutsDatabaseView'
import WorkoutLogView from '@/views/WorkoutLogView'
import ConfirmEmailView from '@/views/ConfirmEmailView'
import ResetPasswordView from '@/views/ResetPasswordView'
import StrengthLevelView from '@/views/StrengthLevelView'
import PremiumView from '@/views/PremiumView'
import FeedbackView from '@/views/FeedbackView'
import FaqView from '@/views/FaqView'
import PremiumSuccessView from '@/views/PremiumSuccessView'
import ZakaioV from '@/views/ZakaioV'

Vue.use(Router);

const userCheck = (to, from, next) => store.getters['user/user'] ?  next() : next({path: '/login'})
const rephaosCheck = (to, from, next) => store.getters['user/rephaos'] ?  next() : next({path: '/premium'})
const zakaioCheck = (to, from, next) => store.getters['user/user'] === '5e1737db42e9f4d0695352da' ? next() : next({path: ''})

// TODO: make mode: 'history' after migrating to new hosting
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
const clientRoutes = [
  {
    path: '/',
    name: 'WOD Time Calculator',
    component: MainView,
  },
  {
    path: '/timer',
    name: 'Timer',
    component: TimerView,
    beforeEnter: userCheck
  },
  {
    path: '/benchmarks',
    name: 'Benchmarks',
    component: BenchmarksView
  },
  {
    path: '/workouts',
    name: 'Workouts Database',
    component: WorkoutsDatabaseView,
    beforeEnter: rephaosCheck
  },
  {
    path: '/workout/:id',
    name: 'Workout',
    component: WorkoutView
  },
  {
    path: '/log',
    name: 'Workout Log',
    component: WorkoutLogView,
    beforeEnter: rephaosCheck
  },
  {
    path: '/log/:id',
    name: 'Workout Log of User',
    component: WorkoutLogView,
    beforeEnter: rephaosCheck
  },
  {
    path: '/strength',
    name: 'Strength Level Calculator',
    component: StrengthLevelView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: ProfileView,
    beforeEnter: userCheck
  },
  {
    path: '/profile/:id',
    name: 'Profile of User',
    component: ProfileView,
    beforeEnter: userCheck
  },
  {
    path: '/confirm',
    name: 'Confirm Email',
    component: ConfirmEmailView
  },
  {
    path: '/reset',
    name: 'Reset Password',
    component: ResetPasswordView
  },
  {
    path: '/premium',
    name: 'WTC Premium',
    component: PremiumView
  },
  {
    path: '/feedback',
    name: 'WTC Feedback',
    component: FeedbackView
  },
  {
    path: '/faq',
    name: 'WTC FAQ',
    component: FaqView
  },
  {
    path: '/premium-success',
    name: 'Premium Success',
    component: PremiumSuccessView
  }
]

const managerRoutes = []
if (process.env.NODE_ENV !== 'production') {
  managerRoutes.push(
    // routes only for localhost
  )
}

const wildcardRoute = [
  {
    path: '*',
    beforeEnter: (to, from, next) => next({path: ''})
  }
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    ...clientRoutes,
    ...managerRoutes,
    ...wildcardRoute
  ]
})