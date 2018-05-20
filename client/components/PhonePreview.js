import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'

const PhonePreview = (props) => {
    return (
        <View className="phonebox" style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                backgroundColor: props.story.backgroundColor,
            }}
            onClick={() => {props.onClick ? props.onClick() : null;}}>
        </View>
    );
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

export default connect(mapStateToProps)(PhonePreview);
