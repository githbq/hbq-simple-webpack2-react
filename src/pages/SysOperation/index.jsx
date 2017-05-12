/**
 * 系统运行管理
 */
import './index.less';
import React, { PropTypes } from 'react';
import {
    message,
    notification,
    Table,
    Button,
    Popconfirm
} from 'antd';
import ajax from '@/utils/ajax';
import momentHelper from '@/utils/momentHelper';
import Tip from '@/components/Tip';

import { dataSource, getColumns } from './data';
import PageTable from '@/components/PageTable';
export default class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.columns = getColumns.bind(this)();
    }
    state = {
        pageOptions: { onChange() { }, total: 0, current: 1, pageSize: 10 },
        terminalInfos: []
    }
    static contextTypes = {
        socket: PropTypes.object.isRequired
    }
    clickMe = () => {
        this.state.pageOptions.total = 30;
        this.setState({ pageOptions: this.state.pageOptions });
        this.tableCallbacks.load();
    }
    getNowTime() {
        return momentHelper.get();
    }
    addInfo = (data) => {
        this.state.terminalInfos.unshift({ ...data, time: this.getNowTime(), key: Math.random() });
        if (this.state.terminalInfos.length > 1000) {//最多存储1000
            this.state.terminalInfos = this.state.terminalInfos.slice(0, 1000);
        }
        this.setState({ terminalInfos: this.state.terminalInfos.concat([]) });
    }
    getInfo = () => {
        let infos = [];
        for (let i = 0; i < this.state.terminalInfos.length && i < 1000; i++) {
            let item = this.state.terminalInfos[i];
            infos.push(<p key={item.key}><span className="green">{item.time}</span> {item.message}</p>)
        }
        return infos;
    }
    //由表格组件向此注入方法体
    tableCallbacks = {};
    render() {
        return <div className="sys-operation">
            <div className="search-panel">
                <Button type='primary' onClick={() => { this.tableCallbacks.load() }}>刷新</Button>
            </div>
            <PageTable url="log/page/" callbacks={this.tableCallbacks} columns={this.columns} pageOptions={this.state.pageOptions} />
            <div className="operation-monitor">
                {this.getInfo()}
            </div>
        </div>
    }

} 
