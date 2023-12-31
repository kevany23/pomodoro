<template>
  <div class="timer">
    <div class="timer-text">
      <h2>
        {{ displayTime() }}
      </h2>
    </div>

    <div class="timer-controls">
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  convertToMinutesAndSeconds,
  convertStringToMilliseconds,
  createDisplayTime
} from '../util/time_util'
import clock_alarm from '../assets/sounds/clock-alarm-8761.mp3'
export default {
  data() {
    return {
      startTime: 0,
      endTime: 0,
      duration: convertStringToMilliseconds('25:00'),
      timer: 0,
      intervalId: 0,
      alarmSound: new Audio(clock_alarm)
    }
  },
  methods: {
    startTimer() {
      this.startTime = Date.now()
      this.endTime = this.startTime + this.duration
      console.log(this.startTime)
      console.log(this.endTime)
      this.intervalId = setInterval(() => {
        this.timer = this.endTime - Date.now()
        if (this.timer <= 0) {
          this.timer = 0
          this.stopTimer()
          this.alarmSound.play()
        }
      }, 5)
    },
    stopTimer() {
      clearInterval(this.intervalId!)
    },
    displayTime() {
      const time = this.endTime ? this.timer : this.duration;
      const { minutes, seconds } = convertToMinutesAndSeconds(time);
      return createDisplayTime(minutes, seconds);
    }
  }
}
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