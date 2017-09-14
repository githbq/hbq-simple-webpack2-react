import React from 'react';
import List from '@/components/common/List';

import './AnswerList.less'
export default class AnswerList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <List url={"//wen.58.com/answer/moremyanswer"} source="answer" />;
    }
}
