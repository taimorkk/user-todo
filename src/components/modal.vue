<template>
  <div
    @click="modal"
    class="min-h-screen top-0 left-0 backdrop-opacity-10 backdrop-invert bg-black/50 grid justify-items-center content-center fixed w-full z-5"
  ></div>
  <div
    class="grid m-auto justify-items-center content-center z-50 ml-20 fixed w-2/4"
  >
    <div
      class="justify-self-center align-middle overflow-hidden shadow-lg rounded-sm bg-white card w-full"
    >
      <div class="card_header h-12">
        <p class="m-7 text-left font-semibold">
          {{ route.params.reqType }} Task
        </p>
      </div>
      <div class="card_body m-7">
        <task-form></task-form>
      </div>
    </div>
  </div>
</template>

<script>
import taskForm from "@/components/taskForm.vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "ModalForm",
  components: {
    taskForm,
  },
  emits: ["loadData"],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const modal = () => {
      context.emit("loadData");
      router.push("/tasks");
    };

    return {
      route,
      router,
      modal,
    };
  },
};
</script>

<style scoped></style>
