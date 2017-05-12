import React,{PropTypes} from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent { 
  render() {
    return (
      <div>
        <h1 className="welcome-text">
          星空平台
        </h1>
      </div>
    );
  }

}

export default Welcome;
