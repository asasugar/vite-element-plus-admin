/*
 * @Description: 系统接口【看板数据】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 17:34:56
 */
interface IConfig {
  body: any;
  method: string;
  url: string;
}

export default [
  // 看板数据
  {
    url: 'sys/getAnalysis',
    type: 'get',
    response: () => {
      return {
        success: true,
        result: {
          visit: {
            title: '访问数',
            value: 2000,
            total: 120000,
            color: 'green',
            action: '月',
            tagType: 'success'
          },
          total: {
            title: '成交额',
            value: 20000,
            total: 500000,
            color: 'blue',
            action: '月',
            tagType: 'info'
          },
          download: {
            title: '下载数',
            value: 8000,
            total: 120000,
            color: 'orange',
            action: '周',
            tagType: 'danger'
          }
        },
        code: 200
      };
    }
  },
  // 获取前端路由
  {
    url: 'sys/getRoute',
    type: 'post',
    response: (config: IConfig) => {
      return {
        success: true,
        result: {
          name: 'Home',
          path: '/',
          component: 'home',
          meta: {
            title: '首页'
          },
          redirect: '/dashboard/analysis',
          children: [
            {
              name: 'DashboardAnalysis',
              path: '/dashboard/analysis',
              component: 'dashboard/analysis',
              meta: {
                title: '分析页'
              }
            }
          ]
        },
        code: 200
      };
    }
  }
];
