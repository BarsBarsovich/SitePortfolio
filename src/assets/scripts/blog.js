import "./modules/hamburger";
import "./modules/preloader";
// import $ from "jquery";
import Vue from "vue";
import preloader from "./modules/preloader";

new Vue({
  el: "#blog",
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
