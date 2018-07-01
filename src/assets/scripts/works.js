import "./modules/hamburger";
import preloader from "./modules/preloader";
import Vue from "vue";

new Vue({
  el: "#works",
  beforeMount() {
    preloader();
  },
  methods: {
    checkForm: function() {
      cosole.log("checkForm");
      // $('')
    }
  }
});
