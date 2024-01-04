<template>
  <div class="timer" :style="{ backgroundColor: timerColor }">
    <div class="timer-text">
      <h2 style="font-size: 3rem">
        {{ displayTime() }}
      </h2>
    </div>

    <div class="timer-controls">
      <button
        class="btn btn-primary start-pause-button"
        @click="startOrPauseTimer"
      >
        {{ isPaused ? 'Start' : 'Pause' }}
      </button>
      <button class="btn btn-secondary reset-button" @click="resetTimer">
        Reset
      </button>
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
  props: {
    defaultDuration: {
      type: String,
      default: '25:00'
    },
    timerColor: {
      type: String,
      default: 'skyblue'
    }
  },
  data() {
    return {
      startTime: 0,
      endTime: 0,
      duration: convertStringToMilliseconds('25:00'),
      timeRemaining: 0,
      isPaused: true,
      isStarted: false,
      intervalId: 0,
      alarmSound: new Audio(clock_alarm)
    };
  },
  created() {
    this.initializeTimer();
  },
  methods: {
    initializeTimer() {
      this.timeRemaining = this.duration;
      this.isPaused = true;
      this.isStarted = false;
    },
    startOrPauseTimer() {
      if (this.isStarted) {
        this.togglePause();
        return;
      }
      this.isStarted = true;
      this.isPaused = false;
      this.resumeTimer();
    },
    stopTimer() {
      this.isPaused = true;
      clearInterval(this.intervalId!);
    },
    resetTimer() {
      this.stopTimer();
      this.initializeTimer();
    },
    displayTime() {
      const time = this.timeRemaining || this.duration;
      const { minutes, seconds } = convertToMinutesAndSeconds(time);
      return createDisplayTime(minutes, seconds);
    },
    pauseTimer() {
      this.isPaused = true;
      clearInterval(this.intervalId!);
    },
    resumeTimer() {
      this.isPaused = false;
      this.startTime = Date.now();
      this.intervalId = setInterval(() => {
        this.timeRemaining -= Date.now() - this.startTime;
        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.stopTimer();
          this.$emit('timer-alarm', {message: 'hello'});
          this.alarmSound.play();
        }
        this.startTime = Date.now();
      }, 5);
    },
    togglePause() {
      if (this.isPaused) {
        this.resumeTimer();
      } else {
        this.pauseTimer();
      }
    },
    setDuration(duration: string) {
      this.duration = convertStringToMilliseconds(duration);
      this.timeRemaining = this.duration;
      this.initializeTimer();
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
}
.timer-text {
  font-family: monospace;
  text-align: left;
  font-size: 40px;
}
.timer-controls {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 20px;
  justify-content: center;
}
.start-pause-button {
  background-color: lightgray;
  border: none;
  color: black;
  font-size: 20px;
  padding: 10px;
  margin-right: 30px;
  width: 100px;
}
.reset-button {
  background-color: lightgray;
  border: none;
  color: black;
  font-size: 20px;
  padding: 10px;
  width: 100px;
  margin-left: 30px;
}
</style>
