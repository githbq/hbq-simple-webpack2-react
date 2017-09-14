import React from 'react';
import List from './../../Common/List';

import './MsgList.less'
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        ////wen.58.com/mycenter/mysubscribe/more
        return <List url="//wen.58.com/mycenter/newmsg/more" source="notify" />;
    }
}