export enum TimerModeEnum {
  Pomodoro = 'Pomodoro',
  ShortBreak = 'ShortBreak',
  LongBreak = 'LongBreak'
}

export interface AppSettings {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartPomodoro: boolean;
  autoStartShortBreak: boolean;
  autoStartLongBreak: boolean;
}

export const DefaultSettings: AppSettings = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartPomodoro: false,
  autoStartShortBreak: false,
  autoStartLongBreak: false
};
