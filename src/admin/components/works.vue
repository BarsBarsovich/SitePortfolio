<template lang="pug">
  div
    input(type="text" placeholder="Название проекта" v-model="work.title")
    br
    input(type="text" placeholder="Технологии" v-model="work.techs")
    br
    input(type="text" placeholder="Ссылка" v-model="work.link")
    br
    input(type="file" @change="addPhoto")
    br
    hr
    button(@click="addNewWork") Добавить работу
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      work: {
        title: "",
        techs: "",
        link: "",
        photo: ""
      }
    };
  },
  methods: {
    ...mapActions(["addWork"]),
    addPhoto(e) {
      const files = e.target.files;
      if (files.length === 0) return;

      this.work.photo = files[0];
    },
    addNewWork() {
      alert("worked");
      const formData = new FormData();

      Object.keys(this.work).forEach(prop => {
        formData.append(prop, this.work[prop]);
      });

      let temp =
        "http://webdev-api.loftschool.com/works?token=" +
        localStorage.getItem("token");
      console.log(this.work.photo);
      axios.post(temp, this.work).then(response => {
        alert("bench");
      });
    }
  }
};
</script>
