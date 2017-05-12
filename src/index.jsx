/**
 * 程序的入口 
 */
import 'babel-polyfill'; //es6
import React from 'react';
import update from 'react-addons-update';
//追加功能库 用来操作多层state
React.AddonsUpdate = update;
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from '@/redux/store'; // redux store
import SocketContext from 'react-socket-context';

// 开始引入各种自定义的组件
import App from './components/App';
import Welcome from './components/Welcome';
import Error from './components/Error';
import Hello from './components/Hello';
import lazyload from '@/utils/lazyload';
// 路由表 
const routes = (
    <Provider store={store}>
        <SocketContext>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Welcome} />
                    <Route path="index">
                        <Route path="sysmanage">
                            <IndexRoute component={require('@/pages/SysManage').default} />
                            <Route path="edit" component={require('@/pages/SysManage/edit').default} />
                        </Route>
                        <Route path="sysoperation" component={require('@/pages/SysOperation').default} />
                        {/*<Route path="syslog" component={require('@/pages/SysLog').default} />*/}
                        {/*懒加载模式*/}
                        <Route path="syslog" getComponent={lazyload(System.import('@/pages/SysLog'))} />
                    </Route>
                    <Route path="test">
                        {/*<Route path="dataTable" tableName="test" getComponent={lazyload(System.import('./component/users'))}></Route>*/}
                    </Route>
                    <Route path="*" component={Error} />
                </Route>
            </Router>
        </SocketContext>
    </Provider>
);
ReactDOM.render(routes, document.getElementById('root'));
