<template lang="pug">
  div
    input(type="text" placeholder="Название" v-model="blog.title")
    br
    input(type="text" placeholder="Датаа" v-model="blog.date")
    br
    input(type="text" placeholder="Содержание" v-model="blog.content")
    br
    hr
    button(@click="addPost") Добавить работу
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      blog: {
        title: "",
        date: "",
        content: ""
      }
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    addPost() {
      // alert("in methods");
      const formData = new FormData();

      Object.keys(this.blog).forEach(prop => {
        formData.append(prop, this.blog[prop]);
      });

      let temp =
        "http://webdev-api.loftschool.com/posts?token=" +
        localStorage.getItem("token");

      // alert(temp);

      axios.post(temp, this.blog).then(response => {
        alert(response.status);
        // if (response.status === 200) {
        //   alert(posted);
        // }
      });

      //this.addPost(formData);
    }
  }
};
</script>
