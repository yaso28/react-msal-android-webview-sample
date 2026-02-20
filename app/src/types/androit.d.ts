export {};

declare global {
  interface Window {
    Android?: {
      scan: () => string;
    };
  }
}
