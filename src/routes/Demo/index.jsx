/**
 * 路由页面
 */
import './index.less'
import PropTypes from 'prop-types'
import React from 'react'
import DemoComponent from '@/components/Demo'

export default class Demo1 extends React.Component {

  // static propTypes = {
  //   match: PropTypes.object.isRequired
  // }
  render() {
    return (<div className="demo-route">
      <span>this is demo-route params:</span>
      <DemoComponent />
    </div>)
  }
}

