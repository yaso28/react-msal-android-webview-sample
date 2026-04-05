export const scan = () => {
  if (window.AndroidScanBridge) {
    return window.AndroidScanBridge.scan()
  }

  return "Scan with React"
}
