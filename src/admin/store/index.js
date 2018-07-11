import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import skills from "../components/skills";
// import user from "../components/user";
import works from "../components/works";
import blog from "../components/blog"

export default new Vuex.Store({
  modules: {
    skills,
    blog,
    works
  }
});