import Vue from 'vue'
import App from './App.vue'
// 若需要 router 和 store，请自行添加，可单独配置，也可共用其他多页配置的 router 和 store
// 建议单独配置
// import router from '../../router'
// import store from '../../store'

Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')
