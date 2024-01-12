import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import PomodoroTimer from '../../src/components/PomodoroTimer.vue';
import { TimerModeEnum } from '../../src/types/index';
import { convertStringToMilliseconds } from '../../src/util/time_util';

describe('Timer', () => {
  test('renders the Timer component', () => {
    const wrapper = mount(PomodoroTimer);
    expect(wrapper.html()).toContain('class="pomodoro-timer"');
  });
  test('Test mode switch', () => {
    const wrapper = mount(PomodoroTimer);
    wrapper.vm.setMode(TimerModeEnum.ShortBreak);
    expect(wrapper.vm.timerMode).toBe('ShortBreak');
    expect(wrapper.vm.getTimer().duration).toBe(convertStringToMilliseconds('05:00'));
    wrapper.vm.setMode(TimerModeEnum.LongBreak);
    expect(wrapper.vm.timerMode).toBe('LongBreak');
    expect(wrapper.vm.getTimer().duration).toBe(convertStringToMilliseconds('15:00'));
    wrapper.vm.setMode(TimerModeEnum.Pomodoro);
    expect(wrapper.vm.timerMode).toBe('Pomodoro');
    expect(wrapper.vm.getTimer().duration).toBe(convertStringToMilliseconds('25:00'));
  })
});