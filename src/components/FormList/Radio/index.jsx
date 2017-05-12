import React from 'react';
import './index.less';
import {
  Input
} from 'antd';

//input相关事件,正则

class InputComp extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
       inputValue:''
    };
  }
  handleInputChange=(e) =>{
    this.setState({ inputValue: e.target.value });
  }

  componentDidMount=(e) =>{
    // 正则
  }
  render() {
     return (
       <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>
     )
    }

}

export default InputComp;
