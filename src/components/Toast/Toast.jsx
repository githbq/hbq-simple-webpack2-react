import React from 'react';
import classNames from 'classnames';
import './Toast.less';

export default class Toast extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { content, toastShow } = this.props;

        let toastClass = classNames('toast-wrap', {
            show: toastShow,
            hide: !toastShow
        });

        return (
            <div className={toastClass}>
                <div className="toast">
                    <p className="toast-content">{content}</p>
                </div>
            </div>
        );
    }
}