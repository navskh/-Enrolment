import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store1 = new Vuex.Store({
  state: {
    message: "Hello",
    userid: "navskh",
  },
  mutations: {
    changeMessage(state, newMsg) {
      state.message = newMsg;
    },
    LoginId(state, newId) {
      state.userid = newId;
    },
  },
  actions: {
    callMutation({ state, commit }, { newMsg }) {
      console.log(state);
      commit("changeMessage", newMsg);
    },
    callId({ state, commit }, { newId }) {
      console.log(state);
      commit("LoginId", newId);
    },
  },
  getters: {
    getMsg(state) {
      return `${state.message} => Length : ${state.message.length}`;
    },
    getId(state) {
      return state.userid;
    },
  },
});

export { store1 };
