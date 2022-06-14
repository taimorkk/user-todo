<template>
   <router-view></router-view>
</template>

<script>
import {onBeforeMount} from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  setup(){
 const store = useStore();


onBeforeMount(() => {
      store.dispatch("autoLogin");
console.log("before app mount");
  
    });
    return{
      onBeforeMount,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
