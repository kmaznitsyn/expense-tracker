export function getRecentDate(days: number, d: Date) {
  const newDate = new Date();
  newDate.setDate(d.getDate() - days);
  return newDate;
}
