import type { EpPropMergeType } from 'element-plus/es/utils';

export type EpTypeStatus = EpPropMergeType<
  StringConstructor,
  '' | 'success' | 'warning' | 'info' | 'danger',
  unknown
>;

export type EpSizeType = EpPropMergeType<StringConstructor, 'default' | 'small' | 'large', never>;

export type EpPositionType = EpPropMergeType<StringConstructor, 'right' | 'left' | 'top', unknown>;
