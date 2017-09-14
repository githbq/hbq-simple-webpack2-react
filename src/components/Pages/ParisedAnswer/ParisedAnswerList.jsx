import React from 'react';
import List from '@/components/common/List';

import './ParisedAnswerList.less'
export default class AnswerList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        //"/src/components/json/zan.json"
        return <List url="//wen.58.com/mycenter/mypraise/more"  source="parised" />;
    }
}
