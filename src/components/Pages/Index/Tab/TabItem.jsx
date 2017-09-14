import React, { Component } from 'react';
import classnames from 'classnames';
import LoadPage from '@/components/common/LoadPage'

import './TabItem.less'

export default class extends Component {

    loagPgeToOther = () =>{
        const { data, browser} = this.props;
        try {
                clickLog('from='+data.clickInfo)
            } catch (e) { }
        LoadPage(data.link, browser, false)
    }

    render() {
        const { data, browser } = this.props;

        return <li className={classnames("tab-item", data.class)} onClick={ this.loagPgeToOther}>
            <div className="tab-item-icon" ></div>
            <p className="tab-item-name"> {data.name}</p>
        </li>;
    }
}
