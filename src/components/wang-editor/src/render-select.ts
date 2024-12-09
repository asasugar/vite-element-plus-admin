import { h, VNode } from 'snabbdom';
import type { SlateElement } from '@wangeditor/editor';
import type { SelectMenuElement } from './custom-types';

function renderSelect(elem: SlateElement): VNode {
  // TS 语法
  const { value = '' } = elem as SelectMenuElement;

  return h(
    'div',
    {
      style: {
        borderRadius: '12px',
        backgroundColor: 'rgba(102, 128, 158, 0.1)',
        color: '#66809e',
        padding: '5px',
        margin: '0 5px',
        display: 'inline-block'
      }
    },
    value
  );
}

const conf = {
  type: 'insertSelectMenu', // 节点 type ，重要！！！
  renderElem: renderSelect
};

export default conf;
