import React from 'react';
import './index.less';
import ajax from '@/utils/ajax';
import _ from 'lodash';
import {
  Table,
  Button,
  message,
  Popconfirm
} from 'antd';
import PageTable from '@/components/PageTable';
import Tip from '@/components/Tip';
import { getColumns } from './data';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectIds = [];
    this.columns = getColumns.bind(this)();
    this.state = {
      pageOptions: { onChange() { }, total: 0, current: 1, pageSize: 10 },
    }
  }
  rowSelection = {
    onChange: (keys, records) => {
      this.selectIds = keys;
    }
  };
  //有_id 修改 无新增　
  edit = (id = '') => {
    const $this = this;
    return (e) => {
      $this.props.router.push({ pathname: `/index/sysmanage/edit`, query: { id } });
    }
  }
  delete = () => {
    if (this.selectIds.length == 0) {
      Tip.createMessage('请勾选数据').show();
      return;
    }
    ajax.delete(`project/${this.selectIds.join(',')}`).then((result) => {
      if (result.status) {
        Tip.createMessage(result.message).show();
        this.tableCallbacks.load();
      }
    });
  }
  tableCallbacks = {}
  render = () => {
    return (
      <div className="sys-manage">
        <div className='operate_btn'>
          <Button type='primary' onClick={this.edit()}>新增</Button>
          <Popconfirm title="确定删除?" onConfirm={() => this.delete()}>
            <Button type='primary'>删除</Button>
          </Popconfirm>

          <Button type='primary' onClick={() => { this.tableCallbacks.load() }}>刷新</Button>
        </div>
        <PageTable rowSelection={this.rowSelection} url="project/page/" callbacks={this.tableCallbacks} columns={this.columns} pageOptions={this.state.pageOptions} />
      </div>
    )
  }
} 
