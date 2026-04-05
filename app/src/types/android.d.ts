export {};

declare global {
  interface Window {
    AndroidAuth?: {
      signIn: (scope: string) => Promise<undefined>;
      acquireToken: (scope: string) => Promise<string | undefined>;
      getUsername: () => Promise<string | undefined>;
      signOut: () => Promise<undefined>;
    };
    AndroidScanBridge?: {
      scan: () => string;
    };
  }
}
