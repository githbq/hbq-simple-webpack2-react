import React from 'react';
import List from '@/components/common/List';

import './ConcernList.less'
export default class ConcernList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        ////wen.58.com/mycenter/mysubscribe/more
        return <List url="//wen.58.com/mycenter/mysubscribe/more" source="concern" />;
    }
}
