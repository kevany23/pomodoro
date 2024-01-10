<template>
  <div class="pomodoro-settings" v-if="isVisible">
    <img src="../assets/x-square-fill.svg" @click="hideSettings" />
    <h4>Settings</h4>
    <form class="settings-form" @submit.prevent="">
      <label for="pomodoro-time">Pomodoro Time</label>
      <input
        id="pomodoro-time"
        placeholder="Pomodoro Time"
        type="number"
        v-model="settings.pomodoroDuration"
      />
      <label for="break-time">Break Time</label>
      <input
        id="break-time"
        placeholder="Break Time"
        type="number"
        v-model="settings.shortBreakDuration"
      />
      <label for="long-break-time">Long Break Time</label>
      <input
        id="long-break-time"
        placeholder="Long Break Time"
        type="number"
        v-model="settings.longBreakDuration"
      />
      <label for="long-break-time">Long Break Interval</label>
      <input
        id="long-break-time"
        placeholder="Long Break Interval"
        type="number"
        v-model="settings.longBreakInterval"
      />
      <button class="btn btn-secondary" @click="restoreDefault">
        Restore Default
      </button>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="autoStartPomodoro"
          v-model="settings.autoStartPomodoro"
        />
        <label class="form-check-label" for="autoStartPomodoro"
          >Auto Start Pomodoro</label
        >
        <br />
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="autoStartBreak"
          v-model="settings.autoStartShortBreak"
        />
        <label class="form-check-label" for="autoStartBreak"
          >Auto Start Short Break</label
        >
        <br />
        <input
          class="form-check-input"
          type="checkbox"
          id="autoStartLongBreak"
          v-model="settings.autoStartLongBreak"
        />
        <label class="form-check-label" for="autoStartLongBreak"
          >Auto Start Long Break</label
        >
      </div>
      <div class="button-bar">
        <button
          class="save-btn btn btn-secondary"
          style="background-color: blue"
          @click="saveSettings"
          type="button"
        >
          Save
        </button>
        <button
          class="cancel-btn btn btn-secondary"
          style="background-color: red"
          @click="hideSettings"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import type { AppSettings } from '../types/index';
import { DefaultSettings } from '../types/index';

interface PomodoroSettingsData {
  isVisible: boolean;
  settings: AppSettings;
}

export default {
  name: 'PomodoroSettings',
  data(): PomodoroSettingsData {
    return {
      isVisible: false,
      // Actual settings here
      settings: {
        ...DefaultSettings
      }
    };
  },
  created() {
    // load from local storage
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings')!);
    } else {
      this.settings = { ...DefaultSettings };
    }
  },
  methods: {
    hideSettings() {
      this.isVisible = false;
    },
    toggleDisplay() {
      this.isVisible = !this.isVisible;
    },
    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
      window.location.reload();
    },
    restoreDefault() {
      this.settings = { ...DefaultSettings };
    }
  }
};
</script>

<style scoped>
.pomodoro-settings {
  background-color: white;
  position: absolute;
  width: 300px;
  height: 520px;
  padding: 5px 15px 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.settings-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
}

.pomodoro-settings > img {
  margin-left: auto;
}

.input-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button-bar {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.save-btn {
  width: 80px;
  margin-right: 10px;
}

.cancel-btn {
  width: 80px;
  margin-left: 10px;
}

button {
  border: none;
}
</style>
