import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spin, message } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Login from '../Login';
import Breadcrumb from '../Breadcrumb';
import './index.less';
import globalConfig from '@/config';
import ajax from '@/utils/ajax';
import Logger from '@/utils/Logger';
import { loginSuccessCreator } from '@/redux/Login';

const logger = Logger.getLogger('App');

import cookie from 'react-cookie';   
/**
 * App组件
 * 定义整个页面的布局
 */
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  };
  static contextTypes = {
    socket: PropTypes.object.isRequired,
  }
  // App组件还是不要做成PureComponent了, 可能会有bug, 因为无法要求所有子组件都是pure的

  // 要清楚登录逻辑:
  // 1. 初始化时, 先尝试获取已登录的用户, 因为可能还留着上次登录的cookie
  // 2. 如果当前没有登录, 就跳转到Login组件, 手动输入用户名密码重新登录
  // 3. Login组件中登录成功后, 会触发一个loginSuccess action, 修改redux中的状态, 进而触发App组件的re-render

  state = {
    tryingLogin: true, // App组件要尝试登录
  };

  /**
   * App组件挂载后要先尝试去服务端获取已登录的用户
   */
  componentDidMount() {
    cookie.save('userId', 'idididid222');
    cookie.save('userName', 'nananana222');

    this.context.socket.emit('io-test', 'io-test');
    this.context.socket.on('connect', () => {
      logger.info('socket')
    });
    this.context.socket.on('io-test-response', (data) => {
      logger.info(`io-test-response:${data}`)
    });
    //断开时
    this.context.socket.on('disconnect', () => {
      logger.info('断开了,重连中');
      this.context.socket.io.reconnect();
    });
    //重连成功时
    this.context.socket.on('reconnect', () => {
      logger.info('重连成功');
    });
    //重连失败时
    this.context.socket.on('reconnect_failed', () => {
      logger.warn('重连失败');
    });
  }

  render() {
    // 显示一个加载中
    // if (this.state.tryingLogin) {
    //   return <div className="center-div"><Spin spinning={true} size="large"/></div>;
    // }

    // 跳转到登录界面
    // if (!this.props.login) {
    //   return <Login />;
    // }

    // 正常显示
    return (
      <div className="ant-layout-base">
        {/*整个页面被一个ant-layout-base的div包围, 分为sidebar/header/footer/content等几部分*/}
        <Sidebar />

        <div id="main-content-div" className={this.props.collapse ? "ant-layout-main-collapse" : "ant-layout-main"}>
          <Header userName={this.props.userName} />
          <Breadcrumb routes={this.props.routes} />

          <div className="ant-layout-container">
            {this.props.children}
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapse: state.Sidebar.collapse,  // 侧边栏是否折叠
    login: state.Login.login,  // 是否登录
    userName: state.Login.userName,  // 登录后的用户名
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch)  // loginSuccess事件比较特殊, 不只Login组件会触发, App组件也会触发
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
