import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import Timer from '../../src/components/Timer.vue';

describe('Timer', () => {
  test('renders the Timer component', () => {
    const wrapper = mount(Timer);
    expect(wrapper.html()).toContain('class="timer"');
  });

  test('starts and pauses the timer when the start/pause button is clicked', async () => {
    const wrapper = mount(Timer);
    const startButton = wrapper.find('.start-pause-button');

    await startButton.trigger('click');

    expect(wrapper.vm.isStarted).toBe(true);
    expect(wrapper.vm.isPaused).toBe(false);

    await startButton.trigger('click');

    expect(wrapper.vm.isStarted).toBe(true);
    expect(wrapper.vm.isPaused).toBe(true);
  });

  test('resets the timer when the reset button is clicked', async () => {
    const wrapper = mount(Timer);
    const startButton = wrapper.find('.start-pause-button');
    const resetButton = wrapper.find('.reset-button');

    await startButton.trigger('click');
    await resetButton.trigger('click');

    expect(wrapper.vm.isStarted).toBe(false);
    expect(wrapper.vm.isPaused).toBe(true);
  });

  test('change the duration', () => {
    const wrapper = mount(Timer);
    wrapper.vm.setDuration('10:00');

    expect(wrapper.vm.duration).toBe(600000);
    expect(wrapper.vm.timeRemaining).toBe(600000);
  });
});
