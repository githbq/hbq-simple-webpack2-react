import React from 'react';
import className from 'classnames';
import LoadPage from '../../../Common/LoadPage'

import './FooterItem.less';
export default class FooterItem extends React.Component {
    static defaultprops = {
        isActive: false,
        isLogin: false
    }
    constructor(props) {
        super(props);

    }

    //点击事件
    clickFn = () => {
        let { url, clickLogInfo, isLogin } = this.props;
        let browser = ____json4fe.browser;

        if (clickLogInfo) {
            try {
                clickLog(clickLogInfo)
            } catch (e) { }
        }
        if (!url) return;
        LoadPage(url, browser, isLogin)
    }

    render() {
        let { text, clsname, isActive } = this.props;

        let tabIconClass = className("tab-info-wrap", clsname, { on: isActive });
        return <div className="footer-item-tab">
            <div className={tabIconClass} onClick={this.clickFn}>
                <div className="tab-icon"></div>
                <p className="tab-text">{text}</p>
            </div>
        </div>;
    }
}