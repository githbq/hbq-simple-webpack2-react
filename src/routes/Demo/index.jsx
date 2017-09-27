/**
 * 路由页面
 */
import './index.less'
import PropTypes from 'prop-types'
import React from 'react'
import DemoComponent from '@/components/Demo'
export default class extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  render() {
    debugger
    console.log(this.context.router)
    return <div className="demo-route">
      <span>this is demo-route params:</span>
      <b>{JSON.stringify(this.props.match.params)}</b>
      <DemoComponent />
    </div>
  }
}

async function b() {
  return '432432423'
}
async function a() {
  const x = await b()
  console.log('xzxxxxx', x)
}

a()
