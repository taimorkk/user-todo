<template>
  <div class="container">
    <router-view></router-view>
    <div class="fixed h-10 p-2 top-0 left-0 right-0"></div>

    <div class="container mt-10 mx-8">
      <p
        @click="addLocation"
        class="font-sans ... cursor-pointer text-xl font-bold text-left"
      >
        + Add new Location
      </p>

      <div class="container mb-3 w-3/4 mt-4">
        <p class="font-sans mb-3 ... text-md font-bold text-left">
          Current Location
        </p>
        <div>
          <a
            :href="
              state.basehref +
              state.currentLocation.latitude +
              ',' +
              state.currentLocation.longitude
            "
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="font-Inter ... text-md font-medium text-left mx-2"></p>
            <p class="text-left text-neutral-500 mx-2 text-sm font-bold">
              {{ state.currentLocation.latitude }}
              {{ state.currentLocation.longitude }}
            </p>
          </a>
        </div>
      </div>

      <div class="container mb-3 w-3/4 mt-4">
        <p class="font-sans mb-3 ... text-md font-bold text-left">
          Previous Location
        </p>
        <ul>
          <li
            :v-bind="state.locations"
            v-for="location in state.locations"
            :key="location.id"
            class="flex mb-4"
          >
            <input type="checkbox" class="w-6 mt-1.5" />
            <div>
              <a
                :href="
                  state.basehref + location.latitude + ',' + location.longitude
                "
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  class="font-Inter ... text-md font-medium text-left w-64 mx-2"
                >
                  {{ location.address }}
                </p>
                <p class="text-left text-neutral-500 mx-2 text-sm font-bold">
                  {{ location.latitude }} {{ location.longitude }}
                </p>
              </a>
            </div>

            <button
              @click="updatelocation(location.id)"
              class="text-black w-16 bg-gray-200 b font-sm rounded-full text-sm ml-4 mr-2 mb-2"
            >
              Update
            </button>

            <button
              @click="deletelocation(location.id)"
              class="text-white w-16 bg-gray-900 font-sm rounded-full text-sm mr-2 mb-2"
            >
              Delete
            </button>
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
  name: "userLocation",
 
  setup() {
    const state = reactive({
      locations: "",
      basehref: "https://maps.google.com/?q=",
      currentLocation: {
        address: "Karachi, Pakistan",
        latitude: "",
        longitude: "",
      },
    });

    onBeforeMount(() => {
      loadData();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            state.currentLocation.latitude = latitude;
            state.currentLocation.longitude = longitude;
          },
          (error) => {
            console.log("Need access to get location.", error);
          }
        );
      }
    });

    const href = computed(() => {
      return state.locations.map(function (location) {
        return (
          "https://maps.google.com/?q=" +
          location.latitude +
          "," +
          location.longitude
        );
      });
    });

    const time = computed(() => {
      return state.tasks.map(function (item) {
        return moment(item.due_at).calendar();
      });
    });

    const loadData = async () => {
      const res = await http.get("/checkins");
      console.log(res.data.checkins);
      state.locations = res.data.checkins;
    };
    const deletelocation = async (id) => {
      const res = await http.delete("/checkins/" + id);
      loadData();
      console.log(res.data.message);
    };

    const updatelocation = async (id) => {
      const resUp = await http.put("/checkins/" + id, state.currentLocation);
      loadData();
      console.log(resUp.data.message);
    };

    const addLocation = async () => {
      const resadd = await http.post("/checkins", state.currentLocation);
      console.log(resadd.data.message);
    };
    return {
      addLocation,
      state,
      time,
      onBeforeMount,
      loadData,
      deletelocation,
      updatelocation,
      href,
    };
  },
};
</script>
