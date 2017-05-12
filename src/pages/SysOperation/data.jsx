import React, { PropTypes } from 'react';
import {
    Table,
    Button,
    Popconfirm
} from 'antd';
import ajax from '@/utils/ajax';
import Tip from '@/components/Tip';
/**
 * 展示欢迎界面
 */
export const dataSource = [{
    key: '1',
    name: '项目1',
    code: 'p1'
}, {
    key: '2',
    name: '项目2',
    code: 'p2'
}];
export function getColumns() {
    this.context.socket
        .on('operation-install-response', (data) => {
            this.addInfo(data);
        });
    this.context.socket
        .on('operation-run-response', (data) => {
            this.addInfo(data);
            this.tableCallbacks.load();
        });
    this.context.socket
        .on('operation-restart-response', (data) => {
            this.addInfo(data);
            this.tableCallbacks.load();
        });
    this.context.socket
        .on('operation-update-response', (data) => {
            this.addInfo(data);
            this.tableCallbacks.load();
        });
    function getProjectInfoText(type, record) {
        return `[项目:${record.name}] @环境:${type == 'test' ? '测试环境' : '生产环境'}`;
    }
    /**
     * 装库 
     */
    const installNodeModules = (id, type, status, record) => {
        this.tableCallbacks.getContext().then((ctx) => {
            const row = this.tableCallbacks.getRecordById(id);
            if (row) {
                row.installing = true;
            }
        })
        this.addInfo({ message: `安装库->${getProjectInfoText(type, record)}` });
        this.tableCallbacks.get
        this.context.socket
            .emit('operation-install', { id, type });
    }
    const runOrStop = (id, type, status, record) => {
        this.addInfo({ message: `${status ? '停止' : '运行'}->${getProjectInfoText(type, record)}` });
        this.context.socket
            .emit('operation-run', { id, type, status });
    }
    const restart = (id, type, record) => {
        this.addInfo({ message: `重启->${getProjectInfoText(type, record)}` });
        this.context.socket
            .emit('operation-restart', { id, type });
    }
    const update = (id, type, record) => {
        this.addInfo({ message: `更新->${getProjectInfoText(type, record)}` });
        this.context.socket
            .emit('operation-update', { id, type });
    }
    let getButtonJsx = (text, record, type) => {
        let envObject = record.envTypes[type];
        if (!envObject.port) {
            return null;
        }
        return <div>
            {
                !envObject.status ?
                    <Popconfirm title="确定重新装库?" onConfirm={() => installNodeModules(record._id, type, envObject.status, record)}>
                        <Button className="table-button" type="primary">装库{envObject.installing ? '中...' : ''}</Button>
                    </Popconfirm>
                    : ''
            }
            <Popconfirm title="确定执行操作?" onConfirm={() => runOrStop(record._id, type, envObject.status, record)}>
                <Button className="table-button" type="primary">{envObject.status ? '停止' : '启动'}</Button>
            </Popconfirm>
            <Popconfirm title="确定重启?" onConfirm={() => restart(record._id, type, record)}>
                <Button className="table-button" type="primary">重启</Button>
            </Popconfirm>
            {
                !envObject.status ?
                    <Popconfirm title="确定更新代码?" onConfirm={() => update(record._id, type, record)}>
                        <Button className="table-button" type="primary">更新</Button>
                    </Popconfirm>
                    : ''
            }
        </div>;
    }
    function getStatesText(record) {
        let arrs = [];
        if (record.envTypes.test) {
            if (record.envTypes.test.status) {
                arrs.push('测试环境状态:运行中');
            } else {
                arrs.push('测试环境状态:停止');
            }
        }
        if (record.envTypes.prod) {
            if (record.envTypes.prod.status) {
                arrs.push('生产环境状态:运行中');
            } else {
                arrs.push('生产环境状态:停止');
            }
        }
        return arrs.join(';');
    }
    return [
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '简称',
            dataIndex: 'code',
            key: 'code',
        }, {
            width: 300,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(text, record) {
                return (
                    <div>
                        {getStatesText(record)}
                    </div>
                )
            }
        }, , {
            width: 300,
            title: '测试环境',
            dataIndex: 'dev',
            key: 'dev',
            render(text, record) {
                return (
                    <div>
                        {getButtonJsx(text, record, 'test')}
                    </div>
                )
            }
        }, {
            width: 300,
            title: '生产环境',
            dataIndex: 'prod',
            key: 'prod',
            render(text, record) {
                return (
                    <div>
                        {getButtonJsx(text, record, 'prod')}
                    </div>
                )
            }
        }

    ];
}