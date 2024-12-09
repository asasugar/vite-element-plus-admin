type EmptyText = {
  text: '';
};

export type SelectMenuElement = {
  type: 'insertSelectMenu';
  value: string;
  children: EmptyText[];
};
