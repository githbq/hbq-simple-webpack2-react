import React from 'react';
import FooterItem from './FooterItem';

export default class AnswerTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <FooterItem text="提问" clsname="question" url="//wen.58.com/questionnaire/ask" clickLogInfo="from=58QA_homepage_ques0614" isLogin={true} />;
    }
}