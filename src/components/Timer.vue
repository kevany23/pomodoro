<template>
  <div class="timer" :style="{ backgroundColor: timerColor }">
    <div class="timer-text">
      <h2 style="font-size: 3rem">
        {{ displayTime() }}
      </h2>
    </div>

    <div class="timer-controls">
      <button class="btn btn-primary start-pause-button" @click="startTimer">
        {{ isPaused ? 'Start' : 'Pause' }}
      </button>
      <button class="btn btn-secondary reset-button" @click="stopTimer">
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
    initialDuration: {
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
      intervalId: 0,
      alarmSound: new Audio(clock_alarm)
    };
  },
  created() {
    this.duration = convertStringToMilliseconds(this.initialDuration);
    this.timeRemaining = 0;
  },
  methods: {
    initializeTimer() {
      
    },
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
      this.timeRemaining = 0;
      this.isPaused = true;
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
    },
    setDuration(duration: string) {
      this.duration = convertStringToMilliseconds(duration);
      this.timeRemaining = 0;
    },
    reInitializeTimer(duration?: string) {
      this.duration = convertStringToMilliseconds(duration);
      this.timeRemaining = 0;

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
