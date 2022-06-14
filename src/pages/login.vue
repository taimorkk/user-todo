<template>
  <div class="container grid justify-items-center content-center">
    <div class="login-content justify-self-center w-1/4">
      <p class="text mb-10">Log In</p>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <input
            v-model="formState.email"
            required
            type="email"
            id="email"
            class="peer ... bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@flowbite.com"
          />
          <!-- <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p> -->
        </div>
        <div class="mb-6">
          <input
            v-model="formState.password"
            type="password"
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
            placeholder="Password"
            required
          />
        </div>
        <div class="mb-4">
          <button
            type="submit"
            class="text-white w-full bg-gray-900 hover:bg-gray-900 focus:outline-none w focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { Button } from 'ant-design-vue';
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "LoginPage",

  setup() {
    const store = useStore();
    const router = useRouter();

    const formState = reactive({
      email: "",
      password: "",
    });

    const submit = () => {
      store.dispatch("login");
      if (store.getters.isAuthenticated) {
        router.replace("/tasks");
      }
    };

    return {
      formState,

      submit,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-content {
  /* width: 30%; */
  margin: 15%;
}

.btn {
  background-color: black;
  color: white;
}

.btn:hover {
  background-color: rgb(26, 24, 24);
  color: white;
  border: none;
}

.text {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;

  /* Black */

  color: #000000;
}
</style>
