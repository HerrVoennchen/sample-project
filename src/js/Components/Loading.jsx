import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Loading extends Component {
    render() {
        return (
            <div className="center-page">
                <div className="windows8">
                    <div className="wBall" id="wBall_1">
                        <div className="wInnerBall" />
                    </div>
                    <div className="wBall" id="wBall_2">
                        <div className="wInnerBall" />
                    </div>
                    <div className="wBall" id="wBall_3">
                        <div className="wInnerBall" />
                    </div>
                    <div className="wBall" id="wBall_4">
                        <div className="wInnerBall" />
                    </div>
                    <div className="wBall" id="wBall_5">
                        <div className="wInnerBall" />
                    </div>
                </div>
            </div>
        );
    }
}

Loading.propTypes = {};

export default Loading;
