import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight, StyleSheet, Animated} from 'react-native';
import Gestures from './Gestures';


import colorParse from 'color-parse';
import {
    updateElement,
} from '../reducers/element';

const gestureStyle = StyleSheet.create({
  gestures: {
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
        flexGrow: 0,
  },
});

class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
        };
    }

    styleForText(txt) {
        const style = {
            textAlign: txt.align,
            fontSize: txt.fontSize,
            color: txt.color,
        };

        switch (this.props.style) {
            case 'classic':
                style.fontWeight = 'normal';
            break;
            case 'typewriter':
                style.fontFamily = 'Courier New';
                style.fontWeight = 'normal';
                break;
            case 'strong':
                style.fontWeight = 'bold';
            break;

            default:
                style.fontWeight = 'normal';

        }

        const lineHeight = 1.2;
        style.fontSize = txt.fontSize;

        style.lineHeight = lineHeight * style.fontSize;
        style.width = Math.min(window.innerWidth, 375) / 2;
        style.transform = [{ translateX: - style.width /2 }];

        return style;
    }
    styleForRow(txt) {
        const style = {
            color: txt.color,
        };
        const colorObj = colorParse(txt.color);
        switch (txt.fill) {
            case 'none':
                style.color = txt.color;
                style.backgroundColor = 'transparent';
                break;
            case 'fill':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.props.color;
                break;
            case 'alpha':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
                break;
            case 'button':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.props.color;
                style.padding = `4px 16px`;
                style.boxShadow = `${this.props.device.tiltX}px ${-this.props.device.tiltY}px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.color = txt.color;
                style.backgroundColor = 'transparent';
                style.textShadow = `${1+this.props.device.tiltX/2}px ${-3 - this.props.device.tiltY}px 2px rgb(54, 54, 54)`;
                break;
        }

        return style;
    }

    render() {
        const txt = this.props.element;
        return (
            <View style={{
                position: 'absolute',
                left: this.props.element.x,
                top: this.props.element.y,
                }}>
                <Gestures style={gestureStyle.gestures} onGestureStop={(x,y) => {
                    this.props.updateElementAt(this.props.index, {
                    x: txt.x+x,
                    y: txt.y+y
                    });
                    }}>
                    <Text style={this.styleForText(txt)}>
                        {txt.text}
                    </Text>
                </Gestures>
            </View>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateElementAt: (index, element) => {
        const action = updateElement(element);
        action.payload.index = index;
        dispatch(action);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TextElement);
