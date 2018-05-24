import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Animated, Text, TextInput, View, TouchableWithoutFeedback, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';

import FA from '@fortawesome/react-fontawesome';
import ColorPicker from './ColorPicker';
//import Slider from 'rc-slider';
import colorParse from 'color-parse';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
    removeElement,
} from '../reducers/story';
import {
    updateElement,
} from '../reducers/element';

import {
    closeSettings,
} from '../reducers/app';

const window = Dimensions.get('window');
import Textarea from "react-textarea-autosize";

const styles = StyleSheet.create({
    textSettings: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 6,
        backgroundColor: 'rgba(0,0,0, 0.8)'
    },
    menuTop: {
        top: 0,
        left: 0,
        width: '100%',
        height: 70,
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTopItem: {
        color: '#ffffff',
        marginHorizontal: 20,
    },
    menuBottom: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        width: '100%',
    },
    textGroup: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    textContainer: {
        minWidth: 100,
        width: '100%',
        marginBottom: 200,
        position: 'absolute',
    },
    textInput: {
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        paddingTop: 0,
        color: 'rgba(0,0,0,0)',
    },
    textRendering: {
        position: 'relative',
        paddingBottom: 30,
        minHeight: 30,
        zIndex: 1,
        top: 0,
    },
    colorPickContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',

    },
    colorPick: {
        width: 30,
        height: 30,
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff',
    }
});

class TextSettings extends Component {
    constructor(props) {
        super(props);

        this.done = this.done.bind(this);

        this.textInput = this.props.internalRef || React.createRef();

        this.state = {
            active: this.props.active,
            text: '',
            fontSize: 30,
            scaleText: new Animated.Value(1),
            translateText: new Animated.ValueXY(0),
            align: 'center',
            fill: 'none',
            style: 'classic',
            color: '#fff',
            fullWidth: Math.min(window.innerWidth, 375),
            fullHeight:  Math.min(window.innerHeight, 667),
            ...this.props.app.selectedElement,
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.changeTextAlign = this.changeTextAlign.bind(this);
        this.changeTextStyle = this.changeTextStyle.bind(this);
        this.changeTextFill = this.changeTextFill.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.changeFontSize = this.changeFontSize.bind(this);
        this._viewportHeight = Math.min(667, window.height);
        this._textInputHeight = 60;

    }

    focusTextInput() {
        if(this.textInput.current) {
            this.textInput.current.focus();
        }
    }
    componentDidMount() {
        this.focusTextInput();

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...nextProps.currentText,
        };
    }

    onChangeText(ev) {
        this.setState({
            text: ev.target.value,
        });
    }

    changeTextAlign() {
        const aligns = ['center', 'left', 'right'];
        const current = aligns.indexOf(this.state.align);
        const next = (current+1) % aligns.length;
        this.setState({
            align: aligns[next],
        });
    }

    changeTextStyle() {
        const styles = ['classic', 'typewriter', 'strong'];
        const current = styles.indexOf(this.state.style);
        const next = (current+1) % styles.length;
        this.setState({
            style: styles[next],
        });
    }
    changeTextFill() {
        const fills = ['none', 'fill', 'alpha', 'button', 'text-shadow'];
        const current = fills.indexOf(this.state.fill);
        const next = (current+1) % fills.length;
        this.setState({
            fill: fills[next],
        });
    }
    selectColor(color) {
        this.setState({
            color,
        });
        this.focusTextInput();
    }

    textStyle() {
        const style = {
            textAlign: this.state.align,
            fontSize: this.state.fontSize,
            lineHeight: this.state.fontSize,
        };

        switch (this.state.style) {
            case 'classic':
                style.fontWeight = 'normal';
            break;
            case 'typewriter':
                //                style.fontFamily = 'Courier New';
                style.fontWeight = 'normal';
                break;
            case 'strong':
                style.fontWeight = 'bold';
            break;

            default:
                style.fontWeight = 'normal';
            break;
        }

        //        const lineHeight = 1.2;

        //  let rows = this.state.text.split('\n').length;

        return style;
    }
    onLayout(event) {
        const minFactor = 2.5;
        if(this._viewportHeight / this._textInputHeight < minFactor) {
            const m = (this._viewportHeight / minFactor) / this._textInputHeight;
            Animated.spring(this.state.scaleText, { toValue: m }).start();
        } else {
            Animated.spring(this.state.scaleText, { toValue: 1 }).start();
        }
        const y = this._viewportHeight*0.4 - this._textInputHeight/2;
        if(y) {
            Animated.spring(this.state.translateText, { toValue: {x:0, y:y} }).start();
        }

    }
    fillStyle() {
        let style = {};
        let colorObj = colorParse(this.state.color);

        switch (this.state.fill) {
            case 'none':
                style.color = this.state.color;
                style.backgroundColor = 'rgba(0, 0, 0, 0)';
                break;
            case 'fill':
                style.color = this.state.color === '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
                break;
            case 'alpha':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
            break;
            case 'button':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
            //                style.boxShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.color = this.state.color;
                style.backgroundColor = 'rgba(0, 0, 0, 0)';
            // style.textShadow = `1px 1px 2px rgb(54, 54, 54)`;
                break;
            default:
                style.color = this.state.color;
                style.backgroundColor = 'rgba(0, 0, 0, 0)';
            break;
        }
        return style;

    }
    styleForFillButton() {
        let style = {};
        let colorObj = colorParse(this.state.color);

        switch (this.state.fill) {
            case 'none':
                style.fill = this.state.color;
            //                style.backgroundColor = 'transparent';
                break;
            case 'fill':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
            //                style.backgroundColor = this.state.color;
                break;
            case 'alpha':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
            //                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
                break;
            case 'button':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
            //                style.backgroundColor = this.state.color;
                style.boxShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.fill = this.state.color;
            //                style.backgroundColor = 'transparent';
                style.textShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;


            default:
                style.fill = this.state.color;
            //                style.backgroundColor = 'transparent';
            break;
        }
        return style;
    }

    done() {
        const index = this.props.story.elements.reduce((acc, el, i) => (
            el.id === this.state.id ? i : -1
        ), -1);
        this.props.updateElementAt(index, this.state);
        this.props.closeSettings();
        if(this.props.onDone) {
            this.props.onDone(this.state);
        }
    }

    changeFontSize(value) {
        this.setState({
            fontSize: value
        });

    }

    render() {
        return (
            <View style={styles.textSettings}  onLayout={(event) => {
                            const {height} = event.nativeEvent.layout;
                            this._viewportHeight = height;
                        }}>
                <View style={styles.menuTop}>
                    <TouchableHighlight onClick={this.changeTextAlign}>
                        <Icon name={`align-${this.state.align}`} color="#ffffff" />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.changeTextFill}>
                        <Text style={[styles.menuTopItem, styles.menuTopFont ]}>font</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.changeTextStyle}>
                        <Text style={[styles.menuTopItem, styles.menuTopStyle ]}>{this.state.style}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.done}>
                        <Text style={[styles.menuTopItem, styles.menuTopDone ]}>Done</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.textGroup}>
                    <Animated.View  style={[{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            transform: this.state.translateText.getTranslateTransform(),
                        }]}>
                        <Animated.View style={[ styles.textContainer, {
                            position: 'absolute',
                            left: 0,
                            transform: [
                                {scale: this.state.scaleText},
                            ]
                            } ]}
                            onLayout={(event) => {
                                const {height} = event.nativeEvent.layout;
                                this._textInputHeight = Math.max(60, height);
                                this.onLayout();
                            }}>
                            <TextInput className="transparent" ref={this.textInput} multiline style={[styles.textInput, this.textStyle() ]}
                                value={this.state.text}
                                onChangeText={(text) => this.setState({text})} />
                            <Text style={[styles.textRendering, this.textStyle(), this.fillStyle() ]}>
                                {this.state.text}</Text>
                        </Animated.View>
                    </Animated.View>
                </View>
                <View style={styles.menuBottom}>
                    <ColorPicker onSelectColor={this.selectColor} containerStyle={styles.colorPickContainer} colorPickStyle={styles.colorPick} />
                </View>
            </View>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateElementAt: (index, element) => {
        let action;
        if(element.text !== '') {
            action = updateElement(element);
            action.payload.index = index;
        } else {
            action = removeElement(element);
            action.payload.index = index;
        }
        dispatch(action);
    },
    closeSettings: () => {
        dispatch(closeSettings());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TextSettings);

