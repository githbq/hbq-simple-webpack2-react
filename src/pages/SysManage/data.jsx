import React from 'react';
import {
  Table,
  Button
} from 'antd';
const stateEnum = { 1: '运行中', 0: '未运行' };
export function getColumns() {
  return [
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      // fixed:true,
      render: (text, record) => {
        return <Button type="primary" onClick={this.edit(record._id)}>修改</Button>
      },
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '简称',
      dataIndex: 'code',
      key: 'code'
    }, {
      title: '创建人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: 'git地址',
      dataIndex: 'gitUrl',
      key: 'gitUrl'
    }, {
      title: '环境变量',
      dataIndex: 'nodeEnv',
      key: 'nodeEnv',
      render(text, record) {
        return (
          <div>
            {JSON.stringify(record.nodeEnv)}
          </div>
        )
      }
    }, {
      title: 'git分支',
      dataIndex: 'gitBranch',
      key: 'gitBranch'
    }, {
      title: '测试环境',
      dataIndex: 'test',
      key: 'test',
      children: [{
        title: '地址',
        dataIndex: 'envTypes.test.address',
        key: 'envTypes.test.address',
      }, {
        title: '状态',
        dataIndex: 'envTypes.test.status',
        key: 'envTypes.test.status',
        render(text, record) {
          return (
            <div className={`project-status-${record.envTypes.test.status}`}>
              {stateEnum[text]}
            </div>
          )
        }
      },
        // {
        //   title: '端口',
        //   dataIndex: 'envTypes.test.port',
        //   key: 'envTypes.test.port',
        // }
      ]
    },
    {
      title: '生产环境',
      dataIndex: 'prod',
      key: 'prod',
      children: [{
        title: '地址',
        dataIndex: 'envTypes.prod.address',
        key: 'envTypes.prod.address',
      }, {
        title: '状态',
        dataIndex: '状态',
        key: 'envTypes.prod.status',
        render(text, record) {
          return (
            <div className={`project-status-${record.envTypes.prod.status}`}>
              {stateEnum[text || 0]}
            </div>
          )
        }
      },
        //  {
        //   title: '端口',
        //   dataIndex: 'envTypes.prod.port',
        //   key: 'envTypes.prod.port',
        // }
      ]
    }
  ];
}