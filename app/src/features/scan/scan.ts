export const scan = () => {
  if (window.Android) {
    return window.Android.scan()
  }

  return "Scan with React"
}
