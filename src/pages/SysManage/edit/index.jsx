import React from 'react';
import './index.less';
import _ from 'lodash';
import ajax from '@/utils/ajax';
import EnvVar from './EnvVarComponent';

import {
  Table,
  Button,
  Input,
  Dropdown,
  Icon,
  message,
  Menu,
  Radio,
  Form,
  Select,
  Spin,
  Modal
} from 'antd';
import Tip from '@/components/Tip';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class SysEdit extends React.Component {
  constructor(props, context) {
    super(props, context),
      this.state = {
        loading: false,
        catalogs: [],
        testPortRequired: true,
        editForbit: false,
        testPortReadOnly: false, //测试端口是否为只读
        prodPortReadOnly: false,
        choosePortReadOnly: false,

        isShowTest: 'show',
        radioType: 1,
        code: '',
        createUser: 'admin',
        name: '',
        catalog: '',
        sysType: 'nodejs',
        gitUrl: '',
        gitBranch: 'master',
        describe: '',
        test_port: '',
        prod_port: '',
        nodeEnv: [],
        envTypes: {
          test: {
            address: '',
            status: '',
            port: '',
            nodeEnv: ''
          },
          prod: {
            address: '',
            status: '',
            port: '',
            nodeEnv: ''
          }
        }
      }
    this.origin = {
      'test_port': '',
      'prod_port': ''
    }
    this.isAdd = true;
  }
  //页面加载完后，看下是否有id参数
  componentDidMount = () => {
    let { id } = this.props.router.location.query;
    if (id) {
      this.state._id = id;
      this.isAdd = false;
      this.setState({ 'loading': true });
      ajax.get(`project/${id}`).then((result) => {
        this.setState({ 'loading': false, 'editForbit': true });
        if (result.status) {
          let data = result.data;
          //将库中的端口号信息备份
          this.origin = {
            'prod_port': data.envTypes.prod.port,
            'test_port': data.envTypes.test.port
          };
          //将信息初始化给state内的变量
          this.setState(data);
          //如果测试端口为空，隐藏测试端口
          if (!data.envTypes.test.port) {
            this.toggleTestPort(0);
          } else {
            this.toggleTestPort(1);
          }
          this.portInit();
        } else {
          Tip.createMessage('获取信息失败').show('error');
        }
      });
    }
    //获取目录
    ajax.get('project/catalog').then((result) => {
      if (result.status) {
        let catalogs = result.data.catalogs;
        this.setState({ catalogs });
      }
    });
    this.portInit();
  }
  //端口是否可修改
  portInit() {
    //判断当前项目是否启动，启动的话，不能修改端口
    this.setState({
      prodPortReadOnly: !!this.state.envTypes.prod.status,
      testPortReadOnly: !!this.state.envTypes.test.status,
      choosePortReadOnly: !this.isAdd,
    });
  }
  //单选按钮选择
  radioChange = (value) => {
    return (e) => {
      this.toggleTestPort(e.target.value);
    }
  }
  toggleTestPort = (value) => {
    this.setState({
      isShowTest: !!value,
      testPortRequired: false,
      test_port: value ? this.state.test_port : '',
      radioType: value
    });
  }
  //设置目录
  onFieldChange = (name) => {
    return (value) => {
      this.props.form.setFieldsValue({
        [name]: value,
      });
    }
  } 
  //设置环境变量
  setEnvVal = (data) => {
    this.setState({
      nodeEnv: data,
    });
  } 
  //返回
  cancel = (e) => {
    this.props.router.goBack();
  }
  //提交
  submit = (e) => {
    e.preventDefault();
    const newState = { ...this.state, ...this.props.form.getFieldsValue() };
    this.setState(newState);
    let envTypes = {
      test: {
        port: newState.test_port,
        status: newState.envTypes.test.status,
      },
      prod: {
        port: newState.prod_port,
        status: newState.envTypes.prod.status,
      }
    }
    newState.envTypes = envTypes;
    if (envTypes.test.port === envTypes.prod.prot) {
      Tip.createMessage('端口号不能相同').show();
      return;
    }
    //表单验证
    new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (err) {
          reject();
        } else {
          resolve()
        }
      });
    }).then(() => {
      //发送请求
      if (this.isAdd) {
        this.setState({ 'loading': true });
        ajax.post('project', newState).then((result) => {
          this.setState({ 'loading': false });
          if (result.status) {
            
            this.props.router.push('/index/sysmanage');
          } else {
            Tip.create('提示', `保存失败:${result.message}`).show('error');
          }
        });
      } else {
        // 修改 
        // this.setState({ 'loading': true });
        ajax.put(`project/${this.state._id}`, newState).then((result) => {
          this.setState({ 'loading': false });
          if (result.status) {
            this.props.router.push('/index/sysmanage');
          } else {
            Tip.create('提示', `保存失败:${result.message}`).show('error');
          }
        });
      }
    })
  }
  //Input内容改变触发
  valueChange = (e) => {
    let field = e.target;
    let eleState = field.name;
    let eleValue = field.value;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let FormAll = (
      <Form onSubmit={this.submit} >
        <FormItem
          label='系统类型：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('sysType', {
            rules: [{ required: true, message: '请选择系统类型!' }],
            onChange: this.onFieldChange('sysType'),
            initialValue: this.state.sysType,
          })(
            <Select placeholder='请选择系统类型'>
              <Select.Option key={0} value={this.state.sysType}>{this.state.sysType}</Select.Option>
            </Select>
            )}
        </FormItem>

        {/*部署目录：*/}
        <FormItem
          label='目录'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('catalog', {
            rules: [{ required: true, message: '请选择目录!' }],
            onChange: this.onFieldChange('catalog'),
            initialValue: this.state.catalog || 'nodeKoa',
          })(
            <Select placeholder='请选择部署目录'>
              {
                this.state.catalogs.map((n, i) =>
                  <Select.Option key={i} value={n}>{n}</Select.Option>
                )
              }
            </Select>
            )}
        </FormItem>
        <FormItem
          label='系统名称：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {
            getFieldDecorator('name', {
              rules: [{ require: true, message: '不能为空' }],
              initialValue: this.state.name
            })(
              <Input size='small' onChange={this.valueChange} className='width_300' name='name' />
              )
          }
        </FormItem>
        <FormItem
          label='系统简称：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {/*readOnly='true'*/}
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '不能为空' }],
            initialValue: this.state.code
          })(
            <Input size='small' disabled={this.state.editForbit} placeholder='' onChange={this.valueChange} className='width_300' name='code' />
            )}
        </FormItem>
        <FormItem
          label='git地址：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('gitUrl', {
            rules: [{ required: true, message: '不能为空' }],
            initialValue: this.state.gitUrl
          })(
            <Input name='gitUrl' size='small' disabled={this.state.editForbit} onChange={this.valueChange} placeholder='gitlab address' className='width_450' />
            )}
        </FormItem>
        <FormItem
          label='git分支：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('gitBranch', {
            rules: [{ required: true, message: '不能为空' }],
            initialValue: this.state.gitBranch
          })(
            <Input name='gitBranch' size='small' disabled={this.state.editForbit} onChange={this.valueChange} className='width_450' />
            )}
        </FormItem>

        <FormItem
          label=' 启用测试环境：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <RadioGroup disabled={this.state.choosePortReadOnly} onChange={this.radioChange()} value={this.state.radioType}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>
        </FormItem>
        {this.state.isShowTest &&
          <FormItem
            label=' 测试端口：'
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('test_port', {
              rules: [{ required: this.state.testPortRequired, message: '不能为空' }],
              initialValue: this.state.envTypes.test.port
            })(
              <Input disabled={this.state.testPortReadOnly} name='test_port' onChange={this.valueChange} placeholder='test port' className='width_150' />
              )}
          </FormItem>
        }
        <FormItem
          label=' 生产端口：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('prod_port', {
            rules: [{ required: true, message: '不能为空' }],
            initialValue: this.state.envTypes.prod.port
          })(
            <Input disabled={this.state.prodPortReadOnly} name='prod_port' onChange={this.valueChange} placeholder='prod port' className='width_150' />
            )}
        </FormItem>
        <EnvVar setParentEnv={(data) => { this.setEnvVal(data) }} data={this.state.nodeEnv} />
        <FormItem
          label=' 项目描述：'
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('describe', {
            rules: [{ required: true, message: '不能为空' }],
            initialValue: this.state.describe
          })(
            <Input name='describe' type='textarea' rows={4} onChange={this.valueChange} className='width_450' />
            )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 2, offset: 10 }}
        >

        </FormItem>
        <Button type='primary' htmlType='submit' onClick={this.submit}>确定</Button>
        &nbsp;&nbsp;
          <Button type='primary' onClick={this.cancel}>返回</Button>
      </Form>
    )
    return (
      <div className='sys-edit-page'>
        <Spin size='large' spinning={this.state.loading}>{FormAll}</Spin>
      </div>
    );
  }
}

export default Form.create()(SysEdit); 
