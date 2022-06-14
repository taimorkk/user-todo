<template>

        <form @submit.prevent="submit">
          <div class="relative z-0 text-left mb-6 group">
            <input
              type="text"
              name="floating_title"
              v-model="formState.title"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_title"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Summary</label
            >
          </div>
          <div class="relative z-0 text-left w-full mb-6 group">
            <input
              type="text"
              v-model="formState.description"
              name="floating_description"
              id="floating_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Description</label
            >
          </div>

          <div class="relative z-0 text-left w-full mb-6 group">
            <input
              type="datetime-local"
              v-model="formState.date"
              name="floating_description"
              id="floating_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Due Date</label
            >
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          {{formState.errormessage}}
        </form>
     
</template>

<script>
import { reactive, onMounted } from "vue";
import moment from "moment";
import http from "../http-request";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "ModalForm",
  emits: ['loadData'],
  setup(props,context) {
    const route = useRoute();
    const router = useRouter();
    const formState = reactive({
      title: "",
      description: "",
      date: "",
      errormessage:""
    });

    const submit = async () => {
    
      var data = {
        title: formState.title,
        description: formState.description,
        due_at: formState.date,
      };
      if (route.params.reqType == "Update") {
        try {
           const resUp = await http.put("/tasks/" + route.params.id, data);
          context.emit('loadData');
            router.push("/tasks");
          console.log(resUp);
        }
        catch(err){
          formState.errormessage=err;
        }
      } else {
      try {  
          const res = await http.post("/tasks", data);
          context.emit('loadData')
          router.push("/tasks");
          console.log(res);
      }
      catch(err){
         formState.errormessage=err;
      }
      }
    };

   

    onMounted(() => {
      if (route.params.reqType == "Update") {
        var now = new Date(route.params.due_at);
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        
        console.log(
          "onupdate",
          moment(route.params.due_at).format("ddd MMM D YYYY h:mm:ss ")
        );
        formState.title = route.params.title;
        formState.description = route.params.description;
        formState.date = now.toISOString().slice(0, 16);
      }

      console.log("mounted in the composition api!");
    });

    return {
      formState,
      submit,
      route,
      router,
      onMounted
    };
  },
};
</script>

<style scoped>

</style>
