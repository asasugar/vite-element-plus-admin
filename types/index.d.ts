// 该文件中的声明不需要在文件中import

declare type FormInstance = InstanceType<typeof ElForm>;

declare type TableInstance = InstanceType<typeof ElTable>;

declare type Nullable<T> = T | null;

declare type Objectable<T> = Nullable<T> | object;

declare type AnyObject<T = string> = Record<T, any>;
