import { ISelectMenu } from '@wangeditor/core';
import { getType, setInsertNode } from './helper';
export default class InsertSelectMenu implements ISelectMenu {
  readonly title = 'Select Menu';
  readonly tag = 'select';
  // 下拉框的选项
  getOptions() {
    const options = [
      {
        value: 'Add Component',
        text: 'Add Component',
        styleForRenderMenuList: { 'font-size': '13px', 'font-weight': 'bold' }
      },
      {
        value: 'Add Page',
        text: 'Add Page',
        styleForRenderMenuList: { 'font-size': '13px', 'font-weight': 'bold' }
      }
    ];
    return options;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(): boolean {
    return false;
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(): string | boolean {
    return getType();
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(): boolean {
    return false;
  }

  // 禁用输入事件
  handleInput() {
    return false; // 这里可以返回false以禁止输入
  }
  // 点击菜单时触发的函数
  exec(editor, value) {
    setInsertNode(editor, value.toString());
  }
}
