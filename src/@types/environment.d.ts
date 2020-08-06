declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEVELOPMENT: boolean;
    }
  }
}

export {};
