import { convertToMinutesAndSeconds, convertStringToMilliseconds, createDisplayTime } from '../../src/util/time_util';
import { describe, test, expect } from 'vitest';

describe('convertToMinutesAndSeconds', () => {
  test('should convert milliseconds to minutes and seconds', () => {
    const milliseconds = 150000;
    const expected = { minutes: 2, seconds: 30 };
    const result = convertToMinutesAndSeconds(milliseconds);
    expect(result).toEqual(expected);
  });

  test('should handle milliseconds less than a minute', () => {
    const milliseconds = 30000;
    const expected = { minutes: 0, seconds: 30 };
    const result = convertToMinutesAndSeconds(milliseconds);
    expect(result).toEqual(expected);
  });

  test('should handle milliseconds equal to a minute', () => {
    const milliseconds = 60000;
    const expected = { minutes: 1, seconds: 0 };
    const result = convertToMinutesAndSeconds(milliseconds);
    expect(result).toEqual(expected);
  });
});

describe('convertStringToMilliseconds', () => {
  test('should convert time string to milliseconds', () => {
    const time = '2:30';
    const expected = 150000;
    const result = convertStringToMilliseconds(time);
    expect(result).toEqual(expected);
  });

  test('should handle time string with seconds only', () => {
    const time = '0:30';
    const expected = 30000;
    const result = convertStringToMilliseconds(time);
    expect(result).toEqual(expected);
  });

  test('should handle time string with minutes only', () => {
    const time = '2:00';
    const expected = 120000;
    const result = convertStringToMilliseconds(time);
    expect(result).toEqual(expected);
  });
});

describe('createDisplayTime', () => {
  test('should create display time string', () => {
    const minutes = 2;
    const seconds = 30;
    const expected = '02:30';
    const result = createDisplayTime(minutes, seconds);
    expect(result).toEqual(expected);
  });

  test('should handle single-digit minutes and seconds', () => {
    const minutes = 9;
    const seconds = 5;
    const expected = '09:05';
    const result = createDisplayTime(minutes, seconds);
    expect(result).toEqual(expected);
  });

  test('should handle minutes and seconds less than 10', () => {
    const minutes = 0;
    const seconds = 5;
    const expected = '00:05';
    const result = createDisplayTime(minutes, seconds);
    expect(result).toEqual(expected);
  });
});