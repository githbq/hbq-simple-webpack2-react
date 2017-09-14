import React from 'react';
import Ajax from 'ajax-promise-simple';

import ListItem from './ListItem';
import MsgItem from './MsgItem'
import LoadPage from './LoadPage'
import Loading from './Loading';
import Toast from './../Toast/Toast';
export default class List extends React.Component {
    static defaultProps = {
        source: ''
    }
    constructor(props) {
        super(props);
        this.isScroll = false;
        this.hasMore = true;
        this.toastParams = {
            content: ''
        };
        this.pageParam = {
            pagenum: 1
        };
        this.questAgin = true;
        this.state = {
            Loading: 0,//加载状态，0表示正在加载，1表示加载更多，2表示加载完成（没有更多数据），3表示网络问题
            listData: [],
            toastShow: false
        }

    }

    getListData = () => {
        let { listData } = this.state;
        this.setLoadingStatus(0);
        Ajax.getJSON(this.props.url, this.pageParam).then((rst) => {
            /* Ajax.getJSON('/src/components/Common/test1.json').then((rst) => {*/
            let loadingStatus = 1;
            if (rst.code === -1) {
                loadingStatus = 5;
                this.toastShow({
                    content: rst.msg,
                })
                this.setState({
                    loading: loadingStatus
                })
                return
            }
            if (rst.code === 0 && rst.msg == "empty") {

                this.hasMore = false;
                loadingStatus = 2;
                if (this.pageParam.pagenum == 1 && (!rst.data || rst.data && rst.data.length == 0)) {
                    loadingStatus = 4;
                }

                if (!rst.data) {
                    rst.data = [];
                }

            }
            if (!rst.data && rst.msg != "empty" && this.questAgin) {
                this.questAgin = false;
                this.pageParam.pagenum++
                this.getListData();
                return;
            }
            this.setState({
                listData: listData.concat(rst.data),
                loading: loadingStatus
            })
        })
            .catch((error) => {
                this.hasMore = true
                this.setLoadingStatus(3);
            })

    }

    componentDidUpdate() {

    }

    isScrollBottom = () => {
        let body = document.body,
            scrollTop = body.scrollTop,
            scrollHeight = body.scrollHeight,
            windowHeight = window.innerHeight;
        let lock = false;
        if (scrollTop + windowHeight >= scrollHeight) {
            if (!lock) {
                lock = true;
                setTimeout(() => { lock = false }, 2000);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    handleScroll = () => {
        if (this.hasMore && this.isScrollBottom()) {
            this.pageParam.pagenum++;
            this.getListData();
        }
    }


    componentDidMount() {
        this.getListData();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    toastShow = (config) => {
        this.toastParams = config;
        this.setState({
            toastShow: true
        })
        setTimeout(() => {
            this.toastHide();
        }, 1000)
    }

    toastHide = () => {
        this.setState({
            toastShow: false
        })
    }
    //加载提示
    loadText = () => {
        let text = "";
        switch (this.state.loading) {
            case 0: return <div>正在加载中</div>
            case 1: return <div>滑动加载更多</div>
            case 2: return <div>已加载完毕</div>
            case 3: return <div>网络加载问题，请稍后重试</div>;
            case 4: return <div>{this.noDataTip()}</div>
                defalut: <div></div>
        }
        return text;
    }

    noDataTip = () => {
        let { source } = this.props,
            text = '',
            linkText = '';
        switch (source) {
            case 'answer':
                text = "回答问题";
                linkText = "提问"
                break;
            case 'concern':
                text = '关注问题';
                linkText = '关注'
                break;
            case 'question':
                text = '提问问题';
                linkText = '提问'
                break;
            case 'notify':
                text = '收到新消息';
                linkText = '查看精选问答'
                break;
            case "parised": text = '赞过回答';
                linkText = '查看精选问答';
                break;
            default: text = '相关内容';
                linkText = '查看精选问答';
        }
        return <span className="link-to-other-wrap" onClick={this.loadPageToOther} >你还没有{text}
            <span className="link-to-other" >去{linkText}</span>
        </span>;
    }
    //跳转到其他页面
    loadPageToOther = () => {
        let url =this.props.source == "question" ? "//wen.58.com/questionnaire/ask" : "//wen.58.com/questionnaire/topic/703312445956419584",
             broswer = window.WBAPP ? "zhuazhan" : "";    
        LoadPage(url,broswer,false)
    }
    //设置加载状态
    setLoadingStatus = (status) => {
        this.setState({
            loading: status
        })
    }
    render() {
        let { loading, listData } = this.state,
            { source } = this.props;
        return (<div className="list-wrap">
            {listData.map(function (item, i) {
                return source == "notify" ? <MsgItem key={i} info={item} source={source} /> : <ListItem key={i} info={item} source={source} />
            })}
            <Loading loadtext={this.loadText()} />
            <Toast toastShow={this.state.toastShow} {...this.toastParams} />
        </div>)
    }
}