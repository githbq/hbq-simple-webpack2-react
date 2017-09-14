import React from 'react';
import TabItem from './TabItem';

import './TabList.less'
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                name: '问答首页',
                class: 'link-questions',
                link: '//wen.58.com/questionnaire/topic/703312445956419584',
                clickInfo:'my_58QA_new_index'

            },
            {
                name: '我要提问',
                class: 'link-ask',
                link: '//wen.58.com/questionnaire/ask',
                clickInfo:'my_58QA_new_ask'

            }
        ];
    }

    render() {
        const { browser } = this.props;

        return <ul className="tab-list">
            {
                this.data.map((item, index) => {
                    return <TabItem data={item} key={index} browser={browser} />
                })
            }
        </ul>
    }
}