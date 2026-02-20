export {};

declare global {
  interface Window {
    AndroidProxy?: {
      acquireToken: (scope: string) => Promise<string | undefined>;
      getUsername: () => Promise<string | undefined>;
      signOut: () => Promise<boolean>;
    };
  }
}
