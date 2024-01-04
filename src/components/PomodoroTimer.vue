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
    <Timer class="timer" ref="timer" @timer-alarm="handleTimerAlarm" />
    <div class="settings-bar">
      <img src="../assets/gear-fill.svg" @click="displaySettings"/>
    </div>
    <PomodoroSettings/>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { TimerModeEnum } from '../types/index';
import Timer from './Timer.vue';
import PomodoroSettings from './PomodoroSettings.vue';
interface PomodoroTimerData {
  pomodoroDuration: string;
  shortBreakDuration: string;
  longBreakDuration: string;
  activeTab: string;
  timerMode: TimerModeEnum;
  longBreakInterval: number;
  pomodoroSessions: number;
}
export default {
  name: 'PomodoroTimer',
  components: {
    Timer,
    PomodoroSettings,
  },
  data(): PomodoroTimerData {
    return {
      pomodoroDuration: '25:00',
      shortBreakDuration: '05:00',
      longBreakDuration: '15:00',
      activeTab: 'pomodoro',
      timerMode: TimerModeEnum.Pomodoro,
      longBreakInterval: 4,
      pomodoroSessions: 0,
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
      switch (mode) {
        case TimerModeEnum.Pomodoro:
          timer.setDuration(this.pomodoroDuration);
          break;
        case TimerModeEnum.ShortBreak:
          timer.setDuration(this.shortBreakDuration);
          break;
        case TimerModeEnum.LongBreak:
          timer.setDuration(this.longBreakDuration);
          break;
      }
      timer.resetTimer();
    },
    getTimer(): typeof Timer {
      return this.$refs.timer as typeof Timer;
    },
    handleTimerAlarm() {
      // go to next stage
      switch (this.timerMode) {
        case TimerModeEnum.Pomodoro:
          this.pomodoroSessions++;
          if (this.pomodoroSessions == this.longBreakInterval) {
            this.setMode(TimerModeEnum.LongBreak);
            this.pomodoroSessions = 0;
            break;
          }
          this.setMode(TimerModeEnum.ShortBreak);
          break;
        case TimerModeEnum.ShortBreak:
          this.setMode(TimerModeEnum.Pomodoro);
          break;
        case TimerModeEnum.LongBreak:
          this.setMode(TimerModeEnum.Pomodoro);
          break;
      }
    },
    displaySettings() {
      alert('display settings');
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

.timer {
  padding-bottom: 0px;
}

button.active {
  color: black;
  background-color: rgba(0, 128, 255, 0.8);
  border: none;
}

.settings-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: skyblue;
  border: none;
  padding: 0px 15px 5px 5px;
}

.menu {
  position: absolute;
}
</style>
