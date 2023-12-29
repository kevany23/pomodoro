<template>
  <div class="timer">
    <div>
      {{ timer }}
    </div>

    <div class="timer-controls">
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      timer: 0,
      intervalId: 0
    };
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        this.timer++;
      }, 1);
    },
    stopTimer() {
      clearInterval(this.intervalId!);
    }
  }
};
</script>

<style>
/* Add your custom styles here */
.timer {
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  padding: 10px;
}
.timer-controls {
  display: flex;
  flex-direction: row;
}
</style>
