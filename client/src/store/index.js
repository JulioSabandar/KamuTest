import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const url = 'https://testauthkamu.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    email: null,
    color: null,
    access_token: null
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload){
      state.isLoggedIn = payload;
    },
    SET_USERNAME(state, payload){
      state.username = payload;
    },
    SET_EMAIL(state, payload){
      state.email = payload;
    },
    SET_COLOR(state, payload){
      state.color = payload;
    },

    SET_ACCESS_TOKEN(state, payload){
      state.access_token = payload;
    }
  },
  actions: {
    login({ commit }, payload){
      console.log(payload.username)
      console.log(payload.password)

      return axios({
        url: url + '/login',
        method: 'post',
        data: {
          username: payload.username,
          password: payload.password
        }
      })
      .then(response=>{
        commit('SET_ISLOGGEDIN', true);
        commit('SET_USERNAME', response.data.username);
        commit('SET_EMAIL', response.data.email);
        commit('SET_COLOR', response.data.color);
        commit('SET_ACCESS_TOKEN', response.data.access_token);
        localStorage.setItem('kamu_access_token', response.data.access_token);
        localStorage.setItem('kamu_username', response.data.username);
        localStorage.setItem('kamu_email', response.data.email);
        localStorage.setItem('kamu_color', response.data.color);
        return response;
      })
      .catch(err =>{
        console.log(err)
        Vue.toasted.show(err.response.data.message, { 
          theme: "toasted-primary", 
          position: "top-center", 
          duration : 5000
        });
      })
    },
    register({ commit }, payload){
      return axios({
        url: url + '/register',
        method: 'post',
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          password: payload.password,
          email: payload.email,
          phone: payload.phone,
          color: payload.color
        }
      })
      .then(response=>{
        return response;
      })
      .catch(err =>{
        console.log({err})
        Vue.toasted.show(err.response.data.message, { 
          theme: "toasted-primary", 
          position: "top-center", 
          duration : 5000
        });
        console.log(err.message)
      })
    },
  },
  modules: {
  },
});
