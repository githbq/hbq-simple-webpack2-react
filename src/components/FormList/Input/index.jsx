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
     <Input size="small" placeholder="" className="width_300"  value={inputVAlue} onChage={this.handleInputChange} />
     )
    }

}

export default InputComp;
