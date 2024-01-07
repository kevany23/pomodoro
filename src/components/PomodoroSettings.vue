<template>
  <div class="pomodoro-settings" v-if="isVisible">
    <img src="../assets/x-square-fill.svg" @click="hideSettings" />
    <h4>Settings</h4>
    <form class="settings-form">
      <label for="pomodoro-time">Pomodoro Time</label>
      <input id="pomodoro-time" placeholder="Pomodoro Time" type="number" />

      <label for="break-time">Break Time</label>
      <input id="break-time" placeholder="Break Time" type="number" />
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PomodoroSettings',
  data() {
    return {
      // Your data properties here
      isVisible: false,
    };
  },
  methods: {
    hideSettings() {
      this.isVisible = false;
    },
    toggleDisplay() {
      this.isVisible = !this.isVisible;
    }
  },
  mounted() {
    // Code to run when the component is mounted

  }
};
</script>

<style scoped>
.pomodoro-settings {
  background-color: white;
  position: absolute;
  width: 300px;
  height: 500px;
  padding: 20px;
  padding-top: 5px;
  padding-right: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.settings-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 80%;
}

.pomodoro-settings > img {
  margin-left: auto;
}
</style>
