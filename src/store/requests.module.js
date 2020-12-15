import LoadTestRunner from "@/services/loadTestRunner";
import Vue from 'vue'
export const requests  = {
    state:  () => ({
            availability: [],
            requests: [],
            totalRequests: Number
    }),
    namespaced: true,
    getters: {
        getAvailability(state) {
            return state.availability;
        },
        getRequests(state) {
            return state.requests;
        }
    },
    actions: {
        addAvailability({commit}, payload) {
            commit('availabilityAdded', payload);
        },
        startTest({commit, state}, payload) {
            let stressTestRunner = new LoadTestRunner();
            stressTestRunner.startLoadTest(payload, state.availability);
            commit('totalRequests', payload);
        },
        addRequests({commit}, payload) {
            commit('requestsAdded', payload)
        },
        addResponse({state, commit}, payload) {
            if (state.requests.find(item => item.userid === payload.userid)) {
                commit('responseAdded', payload);
            }
        },
        resetState({commit}) {
            commit('stateCleared');
        }
    },
    mutations: {
        requestsAdded(state, payload){
            state.requests.push(payload);
        },
        responseAdded(state, payload){
            let updatedRequest = state.requests.find(item => item.userid === payload.userid);
            updatedRequest.response = payload;
            let index = state.requests.findIndex(item => item.userid === payload.userid);
            Vue.set(state.requests, index, updatedRequest);
        },
        availabilityAdded(state, payload){
            state.availability = payload;
        },
        totalRequests(state, payload){
            state.totalRequests = payload;
        },
        stateCleared(state){
            let newState = {
                availability: state.availability,
                requests: [],
                totalRequests: Number
            };
            Object.assign(state, newState);
        }
    }
}
