import React from 'react';
import classnames from 'classnames'
import ajax from 'ajax-promise-simple';
import LoadPage from '@/components/common/LoadPage'
import './ContentItem.less'

export default class ContentItem extends React.Component {
    static defaultProps = {
        title: "问答",
        num: "0",
        url: "",
        clickLogInfo: "from=my_58QA_Item",
        isLogin: false,
        classStyle: "",
        isAjax:false,
        isHaveNewMsg:false
    }
    constructor(props) {
        super(props);
        this.state={
            isHaveNewMsg:props.isHaveNewMsg
        }
    }
    clickFn = () => {
        let { url, clickLogInfo, title, isLogin,isAjax} = this.props;
        let browser = ____json4fe.browser;
        if (clickLogInfo) {
            try {
                clickLog(clickLogInfo)
            } catch (e) { }
        }
        this.setState({
            isHaveNewMsg:false
        })
        if(isAjax){
            ajax.getJSON("/mycenter/withoutnewmsg")
        }
        LoadPage(url, browser, isLogin)
    }
    render() {
        let { classStyle,num,title} = this.props,
            {isHaveNewMsg} =this.state;
        return <li className={classnames("content-item", classStyle,{newMsg:isHaveNewMsg})} onClick={this.clickFn}>
            <span className="content-name">{title} </span>
            <span className="content-num">{num && num != 0 ? num : ""}</span>
        </li>;
    }
}
