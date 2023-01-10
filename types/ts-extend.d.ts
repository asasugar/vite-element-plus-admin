// 扩展ts类型

/** 递归 Partial */
declare type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/** 递归 Required */
declare type DeepRequired<T> = T extends object ? { [P in keyof T]?: DeepRequired<T[P]> } : T;

/** 递归 Readonly */
declare type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/** 浅层去除对象类型中 null 和 undefined */
declare type ObjNonNullable<T> = {
  [P in keyof T as T[P] extends null | undefined ? never : P]: T[P];
};

/** 深层去除对象类型中 null 和 undefined */
declare type DeepNonNullable<T> = T extends object
  ? { [P in keyof T as T[P] extends null | undefined ? never : P]: DeepNonNullable<T[P]> }
  : T;
