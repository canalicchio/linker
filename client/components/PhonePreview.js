import React, { Component } from 'react';
import { connect } from 'react-redux'

const PhonePreview = (props) => {
    return (
        <div className="phonebox" style={{
            backgroundColor: props.story.backgroundColor,
            backgroundImage: `url(${props.story.backgroundImage})`,
            }}
            onClick={() => {props.onClick ? props.onClick() : null;}}>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

export default connect(mapStateToProps)(PhonePreview);
