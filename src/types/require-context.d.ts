declare global {
  interface NodeRequire {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => {
      keys(): string[];
      (id: string): any;
      <T>(id: string): T;
      resolve(id: string): string;
    };
  }

  // También para el require global
  interface Require {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => {
      keys(): string[];
      (id: string): any;
      <T>(id: string): T;
      resolve(id: string): string;
    };
  }
}

export {};
