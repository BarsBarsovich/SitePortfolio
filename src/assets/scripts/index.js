import $ from "jquery";
import Vue from "vue";
import preloader from "./modules/preloader";
import axios from "axios";

new Vue({
  el: "#card",
  data: {
    isFront: true
  },
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  beforeMount() {
    preloader();
  },
  methods: {
    formAnimation: function() {
      $(".card__front").toggleClass("card__front--active");
      $(".card__back").toggleClass("card__back--active");
      $("#loginButton").hide();
    },
    returnToHome: function(e) {
      e.preventDefault();
      $(".card__front").toggleClass("card__front--active");
      $(".card__back").toggleClass("card__back--active");
      $("#loginButton").show();
    },
    login: function(e) {
      e.preventDefault();
      console.log(this.user.name);
      console.log(this.user.password);

      // e.preventDefault();
      axios
        .post("http://webdev-api.loftschool.com/login", this.user)
        .then(response => {
          if (response.status === 200) {
            alert(2);
            const ttl = Math.floor(Date.now() / 1000 + response.data.ttl);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("ttl", ttl);
            window.location.href = "./admin";
          }
        });
    }
  }
});
