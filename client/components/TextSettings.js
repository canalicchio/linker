import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet} from 'react-native';

import FA from '@fortawesome/react-fontawesome';
import ColorPicker from './ColorPicker';
//import Slider from 'rc-slider';
import colorParse from 'color-parse';
import Icon from 'react-native-vector-icons/FontAwesome';


//import './textsettings.scss';
// import 'rc-slider/assets/index.css';
//
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
    textInput: {
        backgroundColor: 'rgba(0,0,0, 0)',
    },
    colorPickContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
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

        this.textInput = this.props.internalRef;

        this.state = {
            active: this.props.active,
            ...this.props.currentText,
            text: '',
            fontSize: 30,
            align: 'center',
            fill: 'none',
            style: 'classic',
            color: '#fff',
            fullWidth: Math.min(window.innerWidth, 375),
            fullHeight:  Math.min(window.innerHeight, 667),
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.changeTextAlign = this.changeTextAlign.bind(this);
        this.changeTextStyle = this.changeTextStyle.bind(this);
        this.changeTextFill = this.changeTextFill.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.changeFontSize = this.changeFontSize.bind(this);

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
            color: color,
        });
    }

    styleForTextArea() {
        let style = {
            textAlign: this.state.align,
            fontSize: this.state.fontSize,
            color: this.state.color,
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

        let lineHeight = 1.2;
        //        style.fontSize = `${this.state.fontSize*2}em`;

        let rows = this.state.text.split('\n').length;

        //        style.lineHeight = `${lineHeight}em`;
        let colorObj = colorParse(this.state.color);

        switch (this.state.fill) {
            case 'none':
                style.color = this.state.color;
            //  style.backgroundColor = 'rgba(0, 0, 0, 0)';
                break;
            case 'fill':
                style.color = this.state.color === '#fff' ? '#000' : '#fff';
            //  style.backgroundColor = this.state.color;
                break;
            case 'alpha':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
            //                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
            break;
            case 'button':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
            //                style.boxShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.color = this.state.color;
            //                style.backgroundColor = 'rgba(0, 0, 0, 0)';
            //                style.textShadow = `1px 1px 2px rgb(54, 54, 54)`;
                break;


            default:
                style.color = this.state.color;
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
        this.setState({
        });

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
            <View style={styles.textSettings}>
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
                <TextInput numberOfLines={5} multiline style={[ this.styleForTextArea() ]}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    onContentSizeChange={(event) => {
                        console.log(event.nativeEvent.contentSize.height);
                    }} />
                <View >
                    <ColorPicker onSelectColor={this.selectColor} containerStyle={styles.colorPickContainer} colorPickStyle={styles.colorPick} />
                </View>
            </View>
        );
  }
}

export default TextSettings;


