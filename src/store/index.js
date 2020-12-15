import Vue from 'vue'
import Vuex from 'vuex'

import { requests } from './requests.module'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        requests
    }
})
