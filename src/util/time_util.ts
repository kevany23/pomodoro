export function convertToMilliseconds(
  minutes: number,
  seconds: number
): number {
  const totalSeconds = minutes * 60 + seconds;
  const milliseconds = totalSeconds * 1000;
  return milliseconds;
}

export function convertToMinutesAndSeconds(milliseconds: number): {
  minutes: number;
  seconds: number;
} {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
}

export function convertStringToMilliseconds(time: string): number {
  const [minutes, seconds] = time.split(':').map(Number);
  return convertToMilliseconds(minutes, seconds);
}

export function createDisplayTime(minutes: number, seconds: number): string {
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
