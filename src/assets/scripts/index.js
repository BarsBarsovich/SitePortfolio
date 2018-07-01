// import $ from "jquery";
import Vue from "vue";
import preloader from "./modules/preloader";

new Vue({
  el: "#loginButton",
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
