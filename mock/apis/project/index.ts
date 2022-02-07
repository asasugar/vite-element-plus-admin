/*
 * @Description: 项目接口【列表、详情】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 11:18:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 17:45:51
 */
import * as Mock from 'mockjs';
import { IConfig } from '../../types';

const Random = Mock.Random;
Random.extend({
  pname: function () {
    const projectName = [
      'Github',
      'Vue',
      'React',
      'Angular',
      'Html5',
      'Css3',
      'Javascript',
      'Typescript',
      'Rollup',
      'Webpack',
      'Vite',
      'React Native',
      'Node'
    ];
    return this.pick(projectName);
  },
  sname() {
    const sortName = ['开源组', '算法组', '摸鱼组', 'UI', '架构组', '技术牛'];
    return this.pick(sortName);
  }
});
export default [
  // 获取项目列表
  {
    url: 'project/getProjectList',
    type: 'get',
    response: (config: IConfig) => {
      const { list } = Mock.mock({
        'list|22-100': [
          {
            'sortId|+1': 1,
            sortName: '@sname',
            name: '@pname',
            desc: '@sentence(4,10)',
            icon: '@dataImage("40x20")',
            editTime: '@date(yyyy-MM-dd)'
          }
        ]
      });
      const { pageNum, pageSize } = config.body;
      const total = list.length;
      console.log(222, pageNum, (pageNum - 1) * pageSize, pageNum * pageSize);
      const newDataList = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
      if (pageNum && pageSize) {
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            content: newDataList,
            total
          },
          code: 200
        };
      } else {
        return {
          success: false,
          code: 201,
          message: '参数异常'
        };
      }
    }
  }
];
