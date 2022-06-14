<template>
  <div class="top-3 relative">
    <nav id="sidebar" class="sidebar fixed bg-white w-64 mt-10 min-h-screen">
      <ul class="lisst-unstyled my-5 components">
        <li>
          <router-link to="/tasks">Task</router-link>
        </li>

        <li>
          <router-link to="/location">Location</router-link>
        </li>
      </ul>
      <button
        @click="logout"
        class="text-white w-32 bg-gray-900 p-1 font-md rounded-full text-md mx-14 my-10 absolute inset-x-0 bottom-10"
      >
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "SideBar",

  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch("logout");
      if (!store.getters.isAuthenticated) {
        router.replace("/");
      }
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.router-link-active {
  background-color: #000000;
  color: #ffffff !important;
  border-radius: 0 100em 100em 0;
}
.router-link-active:hover {
  background-position: right;
}

#sidebar > ul > li > a {
  padding: 20px 10px;
  color: #000;
}
.sidebar ul li a {
  text-decoration: none;
  padding: 10px;
  font-size: 0.9rem;
  color: #ffffff;
  display: block;
  border-bottom: 1px solid rgba(145, 147, 150, 0.19);
}

#sidebar ul li a:hover {
  color: #ffffff;
  background-color: #000000;
  border-radius: 0 100em 100em 0;
}
</style>
