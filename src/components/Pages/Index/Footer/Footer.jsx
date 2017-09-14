import React from 'react';
import UcenterTab from './UcenterTab';
import IndexTab from './IndexTab';
import Question from './Question';
import './Footer.less';


export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="footer">
            <IndexTab />
            <Question />
            <UcenterTab />
        </div>);
    }
}