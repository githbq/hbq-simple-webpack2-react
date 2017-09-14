import React from 'react';
import FooterItem from './FooterItem';

export default class IndexTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <FooterItem text="首页" clsname="index" url="//wen.58.com/questionnaire/topic/703312445956419584" clickLogInfo="from=58QA_homepage" />;
    }
}