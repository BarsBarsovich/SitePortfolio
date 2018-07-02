import "./modules/hamburger";
import preloader from "./modules/preloader";
import Vue from "vue";
import $ from "jquery";

new Vue({
  el: "#form__order",
  data: {
    name: null,
    email: null,
    text: null,
    unsucsess: false,
    errorMessage: ""
  },
  beforeMount() {
    preloader();
  },
  methods: {
    checkForm: function(e) {
      console.log("checkForm");
      var errorMessage = "";

      if (this.name == null) {
        this.errorMessage += "Введите имя\n";
        this.unsucsess = true;
      }

      if (this.email == null) {
        this.unsucsess = true;
        this.errorMessage += "Введите email\n";
      }

      if (this.text == null) {
        this.unsucsess = true;
        this.errorMessage += "Введите сообщение\n";
      }

      if (this.unsucsess) {
        alert(this.errorMessage);
        e.preventDefault();
      } else {
        alert("Отправка");
        e.preventDefault();

        // var axios = require('axios');
        // axios.post('send.php', { data: this.data })
        //   .then(function (response) {
        //       console.log(response);
        //   })
        //   .catch(function (error) {
        //       // Wu oh! Something went wrong
        //       console.log(error.message);
        //   });
      }
    },
    submitForm: function() {
      // alert("click");
    },

    resetForm: function() {
      // alert("reset");
    }
  }
});
