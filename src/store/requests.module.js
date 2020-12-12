const {LoadTestRunner} = require( "../services/loadTestRunner");
export const requests  = {
    state:  () => ({
        requests: []
    }),
    namespaced: true,
    getters: {
        getAvailability(state) {
            return state.availability
        }
    },
    actions: {
        addAvailability({commit}, payload) {
            commit('availabilityAdded', payload)
        },
        startTest({commit, state}, payload) {
            console.log(payload)
            let stressTestRunner = new LoadTestRunner();
            stressTestRunner.startLoadTest(payload, state.availability);
            commit('responsesAdded', payload)
        }
    },
    mutations: {
        responsesAdded(state, payload){
            state.responses = payload;
        },
        availabilityAdded(state, payload){
            state.availability = payload;
        }
    }
}
