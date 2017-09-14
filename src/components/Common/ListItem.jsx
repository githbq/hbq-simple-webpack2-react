import React from 'react';
import './ListItem.less';
import ClassName from 'classnames';
import LoadPage from './LoadPage';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    click = () => {
        let { info, source } = this.props;
        let questionId = info.id ? info.id : info.questionid ? info.questionid : "";
        let url = "//wen.58.com/answer/list/" + info.id;

        if (source == "answer") {
            url = "//wen.58.com/answer/oneshow/" + questionId + "/" + info.ugcInfoId + "/" + info.answerid;
            if (info.checkStatus != 6001) {
                url = "//wen.58.com/answer/recheck?answerid=" + info.answerid;
            }
        }else if(source == "parised"){
            url = "//wen.58.com/answer/oneshow/" + questionId + "/" + info.ugcInfoId + "/" + info.answerid;
        } else if (info.checkStatus && info.checkStatus != 6001) {
            url = "http://wen.58.com/questionnaire/recheck?questionid=" + info.id;
        }
        const json4fe =window. ____json4fe ? ____json4fe : {},
        browser = json4fe.browser ? json4fe.browser : window.WBAPP ? "zhuzhan" : "";
        LoadPage(url,browser,false)
    }


    render() {
        let { info, source } = this.props;
        let checkStatusClass = ClassName('audit-state', {
            'nopass': info.checkStatus == 6002,
            'pass': info.checkStatus == 6001
        })

        return (<div className="answer-list-item" onClick={this.click}>
            {
                info.checkStatus && source !== "parised" ? <p className={checkStatusClass}>{info.checkStatus == 6001 ? '审核通过,显示中' : info.checkStatus == 6002 ? '审核不通过：' + info.checkReason : '审核中'}</p> : null
            }
            <p className="title">{info.question}</p>
            {(source == "answer" || source == "parised") && <p className="content">{info.answer}</p>}

            <p className="desc">{source == "answer" || source == "parised" ? "收到" + info.agree + "个赞" : info.answerNum == 0 ? "暂无回答" : info.answerNum + "个回答"}
                {info.time ? <span className="anwser-time">{info.time}</span> : null}
            </p>
        </div>);
    }
}