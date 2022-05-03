import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueI18n from 'vue-i18n'
import store from '@/store'
import router from '@/router'
import moment from 'moment'
import VueParticles from 'vue-particles'

import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/monokai-sublime.css'
import '@/assets/styles/element-variables.scss'
import '@/assets/custom-theme/index.css'
import '@/assets/icons' // icon
import '@/assets/styles/index.scss' // global css

import '@/assets/js/index.js' // global js

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { message as Message } from '@/utils/Message'
import { MessageBox } from 'element-ui'
import blur from '@/utils/buttonBlur' // button blur
import getError from '@/utils/getError' // button blur

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.getters.lang, // 语言标识 中文zh-CN 英文en-US
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': {
      ...require('./common/lang/zh'),
      ...zhLocale,
    }, // 中文语言包
    'en-US': {
      ...require('./common/lang/en'),
      ...enLocale,
    }, // 英文语言包
  },
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
})
Vue.use(VueQuillEditor)
Vue.use(VueParticles)

// global function
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$blur = blur
Vue.prototype.$moment = moment
Vue.prototype.$getError = getError

Vue.config.productionTip = false

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  if (from.path === '/categories') {
    store.commit('scroll/SET_POSITION', document.documentElement.scrollTop, document.documentElement.scrollLeft)
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
