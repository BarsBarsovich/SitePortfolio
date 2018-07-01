import "./modules/skills";
import "./modules/hamburger";
import preloader from "./modules/preloader";
import Vue from "vue";

new Vue({
  el: "#about",
  beforeMount() {
    preloader();
  },
  methods: {
    formAnimation: function() {
      cosole.log("animation");
      // $('')
    }
  }
});
