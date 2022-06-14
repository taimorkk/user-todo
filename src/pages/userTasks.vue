<template>
  <div class="container">
    <router-view @loadData="loadData"></router-view>
    <div class="fixed h-10 p-2 top-0 left-0 right-0"></div>

    <div class="container mt-10 mx-8">
      <p class="font-sans ... text-xl font-bold text-left">
        <router-link :to="{ name: 'addTask', params: { reqType: 'New' } }"
          >+ Add new task
        </router-link>
      </p>

      <div class="container mb-3 w-3/4 mt-4">
        <p class="font-sans mb-3 ... text-md font-bold text-left">
          + Incomplete
        </p>
        <ul>
          <li
            :v-bind="state.tasks"
            v-for="(task, index) in state.tasks"
            :key="task.id"
            class="flex mb-4"
          >
            <input type="checkbox" class="w-6 mt-1.5" />
            <div>
              <p class="font-Inter ... text-md font-medium text-left w-64 mx-2">
                {{ task.description }}
              </p>
              <p class="text-left text-neutral-500 mx-2 text-sm font-bold">
                {{ time[index] }}
              </p>
            </div>
            <router-link :to="{ name: 'updateTask', params: { reqType: 'Update', id: task.id,
                      title: task.title,
                      description: task.description,
                      due_at: task.due_at } }">
            <button class="text-black w-16 bg-gray-200  font-sm rounded-full text-sm ml-4 mr-2 mb-2 h-8 ">Update</button>
            </router-link>
            <button @click="deletetask(task.id)" class="text-white w-16 bg-gray-900  font-sm rounded-full text-sm mr-2 mb-2 h-8 ">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, onBeforeMount } from "vue";
import moment from "moment";
import http from "../http-request";
export default {
  name: "userTask",
  setup() {
    const state = reactive({
    tasks:'',
    });

    onBeforeMount(() => {
      
      loadData();
    });

    const time = computed(() => {
      return state.tasks.map(function (item) {
        return moment(item.due_at).calendar();
      });
    });

    const  loadData = async ()=>{
 const res = await http.get("/tasks");
       state.tasks = res.data.tasks;
    };

    const deletetask = (id) =>{
const res =  http.delete("/tasks/"+id);
loadData();
console.log(res.data);
    };

    
    return {
      state,
      time,
      onBeforeMount,
      loadData,
      deletetask
    };
  },
};
</script>
