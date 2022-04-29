// 该文件中的声明不需要在文件中import
declare type RefType<T> = T | null;
declare type TargetContext = '_self' | '_blank';
declare type Nullable<T> = T | null;

declare type FormInstance = InstanceType<typeof ElForm>;

declare type TableInstance = InstanceType<typeof ElTable>;
