import React from 'react';
import FooterItem from './FooterItem';

export default class UcenterTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        ////wen.58.com/mycenter/main
        return <FooterItem text="我的" clsname="center" url="" clickLogInfo="from=58QA_minehomepage" isActive={true} />;
    }
}