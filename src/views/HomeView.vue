<script lang="ts">
import Timer from '../components/Timer.vue'

export default {
  components: {
    Timer
  }
}
</script>

<template>
  <main>
    <div id="main-div">
      <h1>Pomodoro Timer</h1>
      <Timer />
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
