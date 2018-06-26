import Vue from "vue";

new Vue({
  el: "#hamburger",
  data: {
    active: false
  },
  methods: {
    changeCaption: function() {
      console.log("initial acitive" + this.active);
      this.active = !this.active;
      console.log("change active" + this.active);
    }
  }
});
