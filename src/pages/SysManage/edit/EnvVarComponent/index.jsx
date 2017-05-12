import React from 'react';
import './index.less';
import ajax from '@/utils/ajax';
import _ from 'lodash';
import {
  Icon
} from 'antd';

//环境变量相关事件

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      envArr: this.props.data || []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ envArr: nextProps.data || [] });
  }
  addValList = (e) => {
    this.setState({ envArr: [...this.state.envArr, { name: '', value: '', key: Math.random() }] });
  }
  //点击“-”，删除某一项环境变量
  removeValList = (keyV) => {
    return (e) => {
      let index = _.findIndex(this.state.envArr, { key: keyV });
      this.state.envArr.splice(index, 1);
      this.setState({ envArr: [...this.state.envArr] });
    }
  }
  //处理下为空的情况
  valueChange = (env, name) => {
    return (e) => {
      env[name] = e.target.value;
      //过滤下环境变量，value为空的，不存入
      const newEnvArr = [];
      this.state.envArr.forEach((n, i) => {
        n.name && newEnvArr.push({ name: n.name, value: n.value || '' })
      });
      this.props.setParentEnv(newEnvArr);
    }
  }
  render() {
    let liarr = this.state.envArr.map((n, i) => {
      return (
        <li key={n.key}>
          <span>键：</span><input name="name" value={n.name} data-key={n.key} onChange={this.valueChange(n, 'name')} />
          &nbsp;
          <span>值：</span><input name="value" value={n.value} data-key={n.key} onChange={this.valueChange(n, 'value')} />
          &nbsp;
          <Icon type="minus-circle-o" onClick={this.removeValList(n.key)} />
        </li>
      )
    });

    return (
      <div className="ant-row ant-form-item env-var-component">
        <lable>
          环境变量：
           <Icon type="plus-circle-o" onClick={this.addValList} />&nbsp;
        </lable>
        <ul className="env-list">
          {liarr}
        </ul>
      </div>
    )
  }
} 
