import Vue from "vue";
import axios from "axios";

const skill = {
  template: "#skill",
  props: {
    skillName: String,
    skillPercents: Number
  },
  methods: {
    drawCircle() {
      const circle = this.$refs["color-circle"];
      const dashOffset = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dashoffset")
      );
      const persents = (dashOffset / 100) * (100 - this.skillPercents);

      circle.style.strokeDashoffset = persents;
    }
  },
  mounted() {
    this.drawCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: {
    skill: Object
  }
};

new Vue({
  el: "#skills-container",
  components: {
    skillsRow
  },
  data: {
    skills: {}
  },
  created() {
    axios.get("http://webdev-api.loftschool.com/skills/12").then(response => {
      const data = response.data;
      this.skills = data;
    });
  },
  template: "#skills-list"
});
