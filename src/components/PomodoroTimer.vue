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
      <img src="../assets/gear-fill.svg" @click="displaySettings" />
    </div>
    <PomodoroSettings ref="settings" />
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import type { AppSettings } from '../types/index';
import { TimerModeEnum, DefaultSettings } from '../types/index';
import { createDisplayTime } from '../util/time_util';
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
  isSettingsVisibleProps: boolean;
  settings: AppSettings;
}
export default {
  name: 'PomodoroTimer',
  components: {
    Timer,
    PomodoroSettings
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
      isSettingsVisibleProps: false,
      settings: { ...DefaultSettings }
    };
  },
  created() {
    // load settings from local storage
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings')!);
    } else {
      this.settings = { ...DefaultSettings };
    }
    onMounted(() => {
      this.setTimerDuration(this.settings.pomodoroDuration);
      const timer = this.getTimer();
      timer.initializeTimer();
    });
  },
  methods: {
    setMode(mode: TimerModeEnum | string) {
      this.timerMode = mode as TimerModeEnum;
      const timer = this.getTimer();
      switch (mode) {
        case TimerModeEnum.Pomodoro:
          this.setTimerDuration(this.settings.pomodoroDuration);
          timer.resetTimer();
          if (this.settings.autoStartPomodoro) {
            this.autoResumeTimer();
          }
          break;
        case TimerModeEnum.ShortBreak:
          this.setTimerDuration(this.settings.shortBreakDuration);
          timer.resetTimer();
          if (this.settings.autoStartShortBreak) {
            this.autoResumeTimer();
          }
          break;
        case TimerModeEnum.LongBreak:
          this.setTimerDuration(this.settings.longBreakDuration);
          timer.resetTimer();
          if (this.settings.autoStartLongBreak) {
            this.autoResumeTimer();
          }
          break;
      }
    },
    getTimer(): typeof Timer {
      return this.$refs.timer as typeof Timer;
    },
    /**
     * Set the duration based on minutes
     */
    setTimerDuration(duration: number) {
      const timer = this.getTimer();
      timer.setDuration(createDisplayTime(duration, 0));
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
          if (this.settings.autoStartShortBreak) {
            this.autoResumeTimer();
          }
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
      const settings = this.$refs.settings as typeof PomodoroSettings;
      settings.toggleDisplay();
    },
    autoResumeTimer() {
      const timer = this.getTimer();
      setTimeout(() => {
        timer.resumeTimer();
      }, 5000);
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
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
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
  height: 180px;
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
  padding: 0px 15px 5px 0px;
}

.menu {
  position: absolute;
}
</style>
