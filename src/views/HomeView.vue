<script lang="ts">
import PomodoroTimer from '../components/PomodoroTimer.vue';

export default {
  components: {
    PomodoroTimer
  }
};
</script>

<template>
  <main>
    <div id="main-div">
      <h1>Pomodoro Timer</h1>
      <PomodoroTimer />
    </div>
  </main>
</template>

<style>
#main-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
</style>
