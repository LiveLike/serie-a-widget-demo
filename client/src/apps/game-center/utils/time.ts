export function getTimeDiff(
  time1?: string,
  time2: string = new Date().toISOString()
) {
  if (!time1) {
    return 0;
  }
  return new Date(time1).getTime() - new Date(time2).getTime();
}
