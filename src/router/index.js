import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index'
import UserPage from "../pages/Home";
import LoginPage from "../pages/login";
import userTask from "../pages/userTasks";
import userLocation from "../pages/location";
import taskForm from "../components/modal"

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  };
  
  const ifAuthenticatedUser = (to, from, next) => {
    console.log(store.getters.isAuthenticate);
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  };


const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/home",
    name: "HomePage",
    component: UserPage,
    beforeEnter: ifAuthenticatedUser,
    children:[
        {path:"/tasks",
         name: "userTask",
         component:userTask,
         props:true,
         children: [
          {
            name: "addTask",
            path: "add",
            component: taskForm,
            props: true,
          },
          {
            name: "updateTask",
            path: "update/:id",
            component: taskForm,
            props: true,
          },
        ]
        },
        {path:"/location",
         name: "userLocation",
         component:userLocation,
         props:true
        }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;