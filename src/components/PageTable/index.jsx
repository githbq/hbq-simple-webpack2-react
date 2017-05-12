/**
 * 通用表格
 */
import React, { PropTypes } from 'react';
import ajax from '@/utils/ajax';
import './index.less';
import {
    Table
} from 'antd';
export default class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.state.pageOptions = {
            loading: true,
            idName: this.props.rowKey || '_id',
            defaultCurrent: 1,
            ...this.props.pageOptions,
            onChange: this.onChange
        };
        this.state.dataSource = [];
        this.url = this.props.url.replace(/\/*$/, '');//去掉尾部的/ 
        if (this.props.callbacks) {
            Object.assign(this.props.callbacks, {
                //重新加载数据 pageIndex 最小值是1
                load: (pageIndex, pageSize) => {
                    this.onChange(pageIndex || this.state.pageOptions.current, pageSize || this.state.pageOptions.pageSize);
                },
                //重绘table
                rerender: () => {
                    this.setState({ dataSource: this.state.dataSource.concat([]) });
                },
                //获取状态
                getState() {
                    return this.state;
                },
                //获取上下文环境
                getContext() {
                    return new Promise((resolve) => {
                        resolve(this);
                    });
                },
                //通过主键获取数据
                getRecordById: (id) => {
                    return this.state.dataSource.find((item) => {
                        return item[this.state.pageOptions.idName] == id;
                    })
                }
            }
            )
        }
    }
    static contextTypes = {
        callbacks: PropTypes.object
    }
    componentDidMount() {
        this.onChange(this.state.pageOptions.current, this.state.pageOptions.pageSize);
    }
    //分页器变化事件
    onChange = (pageIndex, pageSize) => {
        this.setState({ loading: true });
        this.props.pageOptions.onChange && this.props.pageOptions.onChange(pageIndex, pageSize);
        ajax.get(`${this.url}/${this.state.pageOptions.pageSize}/${this.state.pageOptions.current}`, this.props.query).then((res) => {
            this.setState({ loading: false });
            this.props.pageOptions.onLoad && this.props.pageOptions.onLoad(res, pageIndex, pageSize);
            this.state.dataSource = res.data;
            this.state.pageOptions.current = res.pageIndex;
            this.state.pageOptions.total = res.total;
            this.setState({
                dataSource: this.state.dataSource,
                pageOptions: this.state.pageOptions
            })
        });
    }
    render() {
        return <div className="page-table">
            <Table bordered={true} loading={this.state.loading} rowKey={this.state.pageOptions.idName} dataSource={this.state.dataSource} {...this.props} pagination={this.state.pageOptions} />
        </div>
    }
} 
