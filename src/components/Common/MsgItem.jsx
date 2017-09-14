import React from 'react';
import classname from 'classnames';
import LoadPage from './LoadPage';
import './MsgItem.less';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }
    loadPageToOther = () =>{
        const json4fe = ____json4fe,
            browser = json4fe.browser,
            { url } = this.props.info;
        LoadPage(url, browser, false)
    }
    render() {
        const { info } = this.props;
        let setClass = info.type =='adt_fail' || info.type =='agree' ? 'set-red' :'set-green';
        return (<div className="notify-list-item" onClick={this.loadPageToOther}>
            <p className={classname("notify-item-result",setClass)}>{info.title}</p>
            <p className="notify-info">{info.content}</p>
            <p className="notify-info-tip">
                <span> {info.bizAlert}</span>
                <span className="notify-time">{info.time}</span>
            </p>
        </div>);
    }
}