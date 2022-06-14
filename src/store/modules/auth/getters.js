export default {
  
    userId(state) {
      return state.userId;
    },


      token(state) {
        return state.token;
      },

      data(state){
        return state.data;
      },
      
      isAuthenticated(state) {
        
        return !!state.token;
      },

      isUser(state){
      
          if(state.roleId==2){
              return true;
          }
      },
      
     

      isAdmin(state){
      
        if(state.roleId==1){
            return true;
        }
    },

      didAutoLogout(state){
        return state.didAutoLogout;
      },

      baseUrl(state){
        return state.baseUrl;
      }
  };