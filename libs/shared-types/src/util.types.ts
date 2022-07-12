export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type ForcefullyOmit<T, K extends keyof T> = Omit<T, K> & Partial<Record<K, never>>;
export type DeepPartial<T> = T extends Record<keyof T, unknown>
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;
