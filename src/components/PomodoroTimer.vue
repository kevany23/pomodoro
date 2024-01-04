<template>
  <div class="pomodoro-timer">
    <ul class="pomodoro-tabbar nav nav-tabs" role="tablist">
      <li class="pomodoro-tab nav-item" role="tab" data-bs-toggle="pill">
        <button
          class="btn"
          :class="{ active: timerMode == 'Pomodoro' }"
          @click="setMode('Pomodoro')"
        >
          Pomodoro
        </button>
      </li>
      <li class="pomodoro-tab nav-item" role="tab" data-bs-toggle="pill">
        <button
          class="btn"
          :class="{ active: timerMode == 'ShortBreak' }"
          @click="setMode('ShortBreak')"
        >
          Short Break
        </button>
      </li>
      <li class="pomodoro-tab nav-item" role="tab" data-bs-toggle="pill">
        <button
          class="btn"
          :class="{ active: timerMode == 'LongBreak' }"
          @click="setMode('LongBreak')"
        >
          Long Break
        </button>
      </li>
    </ul>
    <Timer ref="timer" />
    <!-- Render Pomodoro component when activeTab is 'pomodoro' -->
    <div v-if="activeTab === 'shortBreak'">
      <!-- Render Short Break component when activeTab is 'shortBreak' -->
      <!-- Add your Short Break component code here -->
    </div>
    <div v-if="activeTab === 'longBreak'">
      <!-- Render Long Break component when activeTab is 'longBreak' -->
      <!-- Add your Long Break component code here -->
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { TimerModeEnum } from '../types/index';
import Timer from './Timer.vue';
interface PomodoroTimerData {
  pomodoroDuration: string;
  shortBreakDuration: string;
  longBreakDuration: string;
  activeTab: string;
  timerMode: TimerModeEnum;
}
export default {
  name: 'PomodoroTimer',
  components: {
    Timer
  },
  data(): PomodoroTimerData {
    return {
      pomodoroDuration: '25:00',
      shortBreakDuration: '05:00',
      longBreakDuration: '15:00',
      activeTab: 'pomodoro',
      timerMode: TimerModeEnum.Pomodoro
    };
  },
  created() {
    onMounted(() => {
      const timer = this.getTimer();
      timer.setDuration(this.pomodoroDuration);
      timer.initializeTimer();
    });
  },
  methods: {
    setMode(mode: TimerModeEnum | string) {
      this.timerMode = mode as TimerModeEnum;
      const timer = this.getTimer();
      console.log(timer);
      switch (mode) {
        case TimerModeEnum.Pomodoro:
          this.pomodoroDuration = '25:00';
          timer.setDuration(this.pomodoroDuration);
          break;
        case TimerModeEnum.ShortBreak:
          this.shortBreakDuration = '05:00';
          timer.setDuration(this.shortBreakDuration);
          break;
        case TimerModeEnum.LongBreak:
          this.longBreakDuration = '15:00';
          timer.setDuration(this.longBreakDuration);
          break;
      }
      timer.resetTimer();
    },
    getTimer(): typeof Timer {
      return this.$refs.timer as typeof Timer;
    }
  },
  mounted() {
    // Code to run when the component is mounted
  }
};
</script>

<style scoped>
.pomodoro-timer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  background-color: skyblue;
  border: none;
}

.pomodoro-tabbar {
  border: none;
}

.pomodoro-tab {
  padding-top: 10px;
}
.pomodoro-tab > button {
  font-weight: bold;
  font-size: 20px;
  width: 140px;
  height: 45px;
}

button.active {
  color: black;
  background-color: rgba(0, 128, 255, 0.8);
  border: none;
}
</style>
