import "./modules/hamburger";
import Vue from "vue";
import preloader from "./modules/preloader";
import axios from "axios";

new Vue({
  el: "#blog",
  data: {
    postList: [],
    blogPost: {
      title: "",
      date: "",
      content: "",
      active: ""
    }
  },
  beforeMount() {
    preloader();
    let tempArray = [];
    axios.get("http://webdev-api.loftschool.com/posts/12").then(response => {
      for (let item of response.data) {
        tempArray.push([
          item.title,
          this.toNormalTime(item.date),
          item.content,
          ""
        ]);
      }
      this.postList = tempArray;
      this.postList[0][4] = 1;

      for (let i = 0; i < this.postList.length; i++) {
        console.log(this.postList[i]);
      }
    });
  },
  methods: {
    toNormalTime: function(unix_timestamp) {
      console.log(unix_timestamp);
      var date = new Date();
      date.setTime(unix_timestamp);
      return date.getDate();
    }
  }
});
