import React from 'react';
import './Header.less';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { nickName, userLogo, answerCount, praiseCount } = this.props;
        return (
            <div className="head-contain">
                <div className="head-img">
                    <img src={userLogo} />
                </div>
                <div className="name-zancount">
                    <p className="name">{nickName}</p>
                    <p className="zancount">贡献回答{answerCount}个，获得赞{praiseCount}个</p>
                </div>
            </div>
        );
    }
}