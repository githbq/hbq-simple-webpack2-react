import React from 'react';
import ContentItem from './ContentItem';
import ContentData from './ContentData'

import "./MyContent.less"

export default class MyContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ul className="answer-contain">
            {
                ContentData.map((item, index) => {
                    return <ContentItem key={index} {...item} />;
                })
            }
        </ul>);
    }
}