declare module '*.json' {
  const value: any;
  export default value;
}

export type Nullable<T> = T | null;
