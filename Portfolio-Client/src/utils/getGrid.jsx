export function getGrid () {
  if (window.innerWidth < 640) {
    return { COLUMNS: 5, ROWS: 8 }
  }
  if (window.innerWidth < 1024) {
    return { COLUMNS: 12, ROWS: 10 }
  }
  return { COLUMNS: 20, ROWS: 10 }
}
