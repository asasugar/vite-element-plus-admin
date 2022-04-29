export type TScrollType = 'default' | 'main';

export interface ICollapseContainerOptions {
  canExpand?: boolean;
  title?: string;
  helpMessage?: Array<any> | string;
}
export interface IScrollContainerOptions {
  enableScroll?: boolean;
  type?: TScrollType;
}

export type IScrollActionType = Nullable<{
  scrollBottom: () => void;
  getScrollWrap: () => Nullable<HTMLElement>;
  scrollTo: (top: number) => void;
}>;
