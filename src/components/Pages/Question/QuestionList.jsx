import React from 'react';
import List from './../../Common/List';

import './QuestionList.less'
export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <List url={"/mycenter/myquestion/more"} source="question" />;
    }
}