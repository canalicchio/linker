import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    closeSettings,
} from '../reducers/app';

class LinkSettings extends Component {
    render() {
        return (
            <div className={`settings settings--link ${this.props.linkSettingsActive ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button className="done" onClick={this.props.closeSettings}>Done</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeSettings: () => {
        dispatch(closeSettings());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkSettings);

