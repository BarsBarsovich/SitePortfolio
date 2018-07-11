<template lang="pug">
  tr.skills-item(v-if="!editmode")
    td {{skill.title}} 
    td 
      span {{skill.percents}} %
    td 
      button(type="button" @click="removeItem") Удалить

  tr.skills-item(v-else)
    td 
      input(
        type="text" 
        placeholder="new skill"
        v-model="newSkill.title"
      )
    td
      input(
        type="text" 
        placeholder="pecents"
        v-model="newSkill.percents"
      )
      span %
    td 
      button(type="button" v-on:click="addSkill") Добавить
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  props: {
    editmode: {
      type: Boolean,
      default: false
    },
    skill: {
      type: Object,
      default: () => {}
    },
    typeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      newSkill: {
        title: "",
        percents: "",
        category: this.typeId
      }
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    ...mapActions(["addNewSkill", "removeExistedSkill"]),
    addSkill() {
      // const addedSkill = this.addNewSkill(this.newSkill);
      let temp =
        "http://webdev-api.loftschool.com/skills?token=" +
        localStorage.getItem("token");
      console.log(this.newSkill);
      axios.post(temp, this.newSkill);

      this.newSkill.title = "";
      this.newSkill.percents = "";
    },
    removeItem() {
      let temp = "http://webdev-api.loftschool.com/skills" + this.skill.id;
      axios.delete(temp, addedSkill);
    }
  }
};
</script>
