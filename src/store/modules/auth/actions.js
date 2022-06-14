//let baseServerUrl=sessionStorage.getItem('base_server_url')
//import axios from 'axios'

//var baseServerUrl = sessionStorage.getItem("base_server_url");

export default {
  login(context) {
    return context.dispatch("auth");
  },

  auth(context) {
    sessionStorage.setItem("token", "Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK");

    context.commit("setUser", {
      token: sessionStorage.getItem("token"),
    });
  },

  autoLogin(context) {
    const token = sessionStorage.getItem("token");

    if (token) {
      context.commit("setUser", {
        token: token,
      });
    }
  },

};
