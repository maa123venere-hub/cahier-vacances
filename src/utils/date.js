export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(dateKeyA, dateKeyB) {
  const a = new Date(dateKeyA);
  const b = new Date(dateKeyB);
  return Math.round((b - a) / 86400000);
}
