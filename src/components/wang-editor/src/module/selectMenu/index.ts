import InsertSelectMenu from './InsertSelectMenu';

export const insertSelectMenuConf = {
  key: 'insertSelectMenu', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new InsertSelectMenu();
  }
};
