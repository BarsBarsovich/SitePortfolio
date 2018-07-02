import $ from "jquery";
import Vue from "vue";
import preloader from "./modules/preloader";

new Vue({
  el: "#loginButton",
  data: {
    isFront: true
  },
  beforeMount() {
    preloader();
  },
  methods: {
    formAnimation: function() {
      $(".card__front").toggleClass("card__front--active");
      $(".card__back").toggleClass("card__back--active");
      // if (this.isFront) {
      //   $(".card__front").toggleClass('.card__front--active');
      //   $(".card__back").show();
      //   this.isFront = false;
      // } else {
      //   $(".card__front").show();
      //   $(".card__back").hide();
      //   this.isFront = true;
      // }
    }
  }
});
