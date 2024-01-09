import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import Timer from '../../src/components/Timer.vue';

describe('Timer', () => {
  test('renders the Timer component', () => {
    const wrapper = mount(Timer);
    expect(wrapper.html()).toContain('<div class="timer" style="background-color: skyblue;">');
  })
})