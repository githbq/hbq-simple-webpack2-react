import React from 'react';
import classNames from 'classnames';
import './Alert.less';

export default class Alert extends React.Component {
    constructor(props){
        super(props);
    }

    click = () => {
        this.props.confirmFunc();
        this.props.alertHideFunc();
    }

    render() {
        let {btnNum, content, alertHideFunc, leftcontent, rightcontent, alertShow} = this.props;
        let alertClass = classNames('alert-wrap', {
            show : alertShow,
            hide : !alertShow
        });

        return(
            <div className={alertClass}>
                <div className="alert">
                    <p className="alert-content">{content}</p>
                    <div className="alert-btn">
                        <a className="bottom-btn" onClick={this.click}>{leftcontent}</a>
                        {btnNum == 2 && <a className="bottom-btn cancle" onClick={alertHideFunc}>{rightcontent}</a>}
                    </div>
                </div>
            </div>
        );
    }
}