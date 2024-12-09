import { IDomEditor } from '@wangeditor/core';

/**
 * 获取 node type（'Add Components' 'Add Page' 等），未匹配则返回 'insertSelectMenu'
 */
export function getType(): string {
  return 'Add Component'; // 默认选中第一项
}

export function setInsertNode(editor: IDomEditor, value: string) {
  if (!value) return;

  // 还原选区
  // editor.restoreSelection();
  const selectMenuElem = {
    type: 'insertSelectMenu',
    value,
    children: [{ text: '这是自定义节点' }]
  };
  console.log(
    '%c [ selectMenuElem ]-21',
    'font-size:13px; background:pink; color:#bf2c9f;',
    selectMenuElem
  );
  editor.insertNode(selectMenuElem);
  // 在当前光标位置插入内容
  editor.focus(); // 自动聚焦当前插入的节点
  // editor.move(1);
}
