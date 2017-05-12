/**
 * 系统运行管理
 */
import React, { PropTypes } from 'react';
import ajax from '@/utils/ajax';
import Tip from '@/components/Tip';
import './index.less';
import {
    Icon,
    Table,
    Button,
    Tree
} from 'antd';
const TreeNode = Tree.TreeNode;
import { dataSource, columns } from './data';
import PageTable from '@/components/PageTable';
export default class extends React.Component {
    state = {
        currentProjectId: null,
        contentLines: [],//多行内容
        treeData: [],
        pageOptions: { onChange() { console.log(1) }, total: 0, current: 1, pageSize: 10 }
    }
    static contextTypes = {
        socket: PropTypes.object.isRequired
    }
    componentDidMount() {
        // this.context.socket.emit('log', 111);
        // this.context.socket.on('log-response', (data) => {
        //     Tip.createMessage('log-response').show();
        // });
    }
    clickMe = () => {
        this.state.pageOptions.total = 30;
        this.setState({ pageOptions: this.state.pageOptions });
        this.tableCallbacks.load();
    }
    onRowClick = (record, index) => {
        this.setState({ currentProjectId: null, currentFile: null, currentFileTitle: '', treeData: [], contentLines: [], currentProjectInfo: `${record.name}-${record.code}` });
        const tip = Tip.createMessage('正在加载...');
        tip.show();
        ajax.get(`log/catalog/${record._id}`).then((result) => {
            tip.close();
            if (result.status) {
                let treeData = [];
                if (result.data.prod || result.data.test) {
                    treeData = [
                        {
                            relative: '生产环境日志', isFolder: true, filePath: 'prod', children: result.data.prod || []
                        },
                        {
                            relative: '测试环境日志', isFolder: true, filePath: 'test', children: result.data.test || []
                        }
                    ];
                }
                this.setState({ treeData, currentProjectId: record._id });
            }
        });
    }
    //由表格组件向此注入方法体
    tableCallbacks = {};
    onSelect = (key, e) => {
        if (e.node.props.isFolder || !e.selected) return;
        this.setState({ currentFileTitle: e.node.props.title, currentFile: e.node.props.eventKey });
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.currentFile != nextState.currentFile) {
            this.state.currentFile = nextState.currentFile;
            this.loadFileContent();
        }
    }
    loadFileContent = () => {
        if (this.state.currentFile) {
            const tip = Tip.createMessage('正在加载...');
            tip.show();
            this.setState({ contentLines: [] });
            ajax.post(`log/file`, { filePath: this.state.currentFile }).then((result) => {
                tip.close();
                if (result.status) {
                    this.setState({ contentLines: result.data.lines });
                }
            })
        }
    }
    getTreeNode(children) {
        return children && children.map((n, i) => {
            const title = n.isFolder ? n.relative : n.fileName;
            const key = n.filePath;
            return <TreeNode title={title} key={key} isFolder={n.isFolder}>
                {n.children && this.getTreeNode(n.children)}
            </TreeNode>
        });
    }
    refresh = () => {
        this.loadFileContent();
    }
    render() {
        return <div className="sys-log">
            <div className="column table-wrapper">
                <div className="search-panel">
                    <Button type='primary' onClick={() => { this.tableCallbacks.load() }}>刷新</Button>
                </div>
                <PageTable url="log/page/"
                    onRowClick={this.onRowClick}
                    callbacks={this.tableCallbacks}
                    columns={columns} pageOptions={this.state.pageOptions}
                />
            </div>
            <div className="column tree-wrapper">
                <span>{this.state.currentProjectInfo}</span>
                <Tree
                    showIcon={true}
                    defaultExpandedKeys={['prod', 'test']}
                    onSelect={this.onSelect}
                >
                    {this.getTreeNode(this.state.treeData)}

                </Tree>
                {this.state.currentProjectId && !this.state.treeData.length ? <b>无日志文件</b> : ''}
            </div>
            {
                this.state.contentLines.length > 0 &&
                <div className="column log-wrapper">
                    <label className="refresh-wrapper" onClick={this.refresh}>
                        <Icon className="refresh-icon" type="retweet" />
                        <span>当前文件:{this.state.currentFileTitle}</span>
                    </label>
                    <div className="log-content">
                        {this.state.contentLines.map((n, i) => {
                            return <p className="log-line" key={i}>{n}</p>
                        })}
                    </div>
                </div>
            }
        </div>
    }

} 
