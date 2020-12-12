import Vue from 'vue'
import App from '@/App.vue'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import Vuex from 'vuex'
import BrokerListener from "@/services/brokerListener";
const {Subscriber} = require( "./services/subscriber");
Vue.use(BootstrapVue)

Vue.use(Vuex)

  let subscriber = new Subscriber();
  subscriber.connectToBroker();
  subscriber.subscribeToTopic("availability/1");
  subscriber.subscribeToTopic("response/#");
  let brokerListener = new BrokerListener();
  brokerListener.listenForMessage();

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
