/**
 * 程序的入口
 */
import '@/common/main.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, Switch } from 'react-router-dom'
import fastClick from 'fastclick'
import createHistory from 'history/createHashHistory'
fastClick.attach(document.body)

const history = createHistory()
//解决移动端300毫秒延迟

//页面
import DemoRoute from '@/routes/Demo'
import DemoRoute2 from '@/routes/Demo2'
// 路由
class App extends React.Component {
  render() {
    return (
        <Router history={history}>
            <Route render={({ location }) => {
          return (
              <Switch>
                  <Route component={DemoRoute}
                      exact
                      location={location}
                      path="/"
                  />
                  <Route component={DemoRoute}
                      location={location}
                      path="/aaa/:aaa"
                  />
                  <Route component={DemoRoute2}
                      location={location}
                      path="/aaa"
                  />
                  <Route component={DemoRoute2}
                      location={location}
                      path="/bbb"
                  />
              </Switch>
          )
        }}
            />
        </Router>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)


