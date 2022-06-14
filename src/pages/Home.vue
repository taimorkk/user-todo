<template>
    <div id="wrapper" class="flex">
        <sideBar></sideBar>
        <div class="container ml-64 ">

        <router-view></router-view>
        </div>
    </div>
</template>

<script>
import sideBar from '../components/SideBar.vue'
export default {
  name: 'HomePage',
  components: {
    sideBar
  }
}
</script>

<style scoped>


</style>
