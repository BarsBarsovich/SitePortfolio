import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

const guard = axios.create({
  baseURL: "http://localhost:3000"
});

import skills from "./components/skills.vue";
import header from "./components/header.vue";
import tabs from "./components/tabs.vue";
import works from "./components/works.vue";
import blogs from "./components/blog.vue";

const routes = [
  {
    path: "/",
    components: {
      default: skills,
      header: header,
      tabs: tabs
    }
  },
  {
    path: "/works",
    components: {
      default: works,
      header: header,
      tabs: tabs
    }
  },
  {
    path: "/blog",
    components:{
      default: blogs,
      header: header,
      tabs: tabs    
    }
  }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  guard
    .get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      next();
    })
    .catch(error => {
        next();
    //   console.log("error in router");
    //   localStorage.removeItem("token");
    //   window.location.href = "//google.com";
    });

   next();
});

export default router;