/*
 * @Description: 项目接口【列表、详情】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 11:18:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 16:41:13
 */
import * as Mock from 'mockjs';
import type { MockConfig } from '../../typing';

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
    response: (config: MockConfig) => {
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
      const newDataList = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
      if (pageNum && pageSize) {
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            list: newDataList,
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
  },
  {
    url: 'project/getRepositoryList',
    type: 'get',
    response: (config: MockConfig) => {
      const { list } = Mock.mock({
        'list|22-100': [
          {
            name: '@pname',
            count: Random.natural(20, 1000),
            isFork: Random.boolean()
          }
        ]
      });
      const { pageNum, pageSize } = config.body;
      const total = list.length;
      const newDataList = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
      if (pageNum && pageSize) {
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            list: newDataList,
            total
          },
          code: 200
        };
      } else {
        return {
          success: true,
          result: {
            pageNum: 1,
            pageSize: total,
            list,
            total
          },
          code: 200
        };
      }
    }
  }
];
