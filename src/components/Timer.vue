<template>
  <div class="timer">
    <div class="timer-text">
      <h2>
        {{ displayTime() }}
      </h2>
    </div>

    <div class="timer-controls">
      <button @click="startTimer">{{ isPaused ? 'Start' : 'Pause' }}</button>
      <button @click="stopTimer">Stop</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  convertToMinutesAndSeconds,
  convertStringToMilliseconds,
  createDisplayTime
} from '../util/time_util';
import clock_alarm from '../assets/sounds/clock-alarm-8761.mp3';
export default {
  data() {
    return {
      startTime: 0,
      endTime: 0,
      duration: convertStringToMilliseconds('25:00'),
      timeRemaining: 0,
      isPaused: true,
      intervalId: 0,
      alarmSound: new Audio(clock_alarm)
    };
  },
  methods: {
    startTimer() {
      if (this.timeRemaining === 0) {
        this.startTime = Date.now();
        this.timeRemaining = this.duration;
        this.isPaused = false;
        this.intervalId = setInterval(() => {
          if (this.isPaused) return;
          this.timeRemaining -= Date.now() - this.startTime;
          if (this.timeRemaining <= 0) {
            this.timeRemaining = 0;
            this.stopTimer();
            this.alarmSound.play();
          }
          this.startTime = Date.now();
        }, 5);
      } else {
        this.togglePause();
      }
    },
    stopTimer() {
      clearInterval(this.intervalId!);
    },
    displayTime() {
      const time = this.timeRemaining || this.duration;
      const { minutes, seconds } = convertToMinutesAndSeconds(time);
      return createDisplayTime(minutes, seconds);
    },
    pauseTimer() {
      this.isPaused = true;
    },
    resumeTimer() {
      this.isPaused = false;
      this.startTime = Date.now();
    },
    togglePause() {
      if (this.isPaused) {
        this.resumeTimer();
      } else {
        this.pauseTimer();
      }
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
  width: 500px;
  height: 200px;
  justify-content: center;
  margin-top: 20px;
}
.timer-text {
  font-family: monospace;
  text-align: left;
  font-size: 40px;
}
.timer-controls {
  display: flex;
  flex-direction: row;
}
</style>
