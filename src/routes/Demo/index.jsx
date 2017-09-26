/**
 * 路由页面
 */
import './index.less'
import React, { PropTypes } from 'react'
import DemoComponent from '@/components/Demo'
export default class extends React.Component {
  render() {

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
