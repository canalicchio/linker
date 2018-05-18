import React, { Component } from 'react';

import FA from '@fortawesome/react-fontawesome';
import ColorPicker from './ColorPicker';
import Slider from 'rc-slider';
import colorParse from 'color-parse';


import './textsettings.scss';
import 'rc-slider/assets/index.css';
import Textarea from "react-textarea-autosize";


class TextSettings extends Component {
    constructor(props) {
        super(props);

        this.done = this.done.bind(this);

        this.textInput = this.props.internalRef;

        this.state = {
            active: this.props.active,
            ...this.props.currentText,
            text: '',
            fontSize: 1.8,
            align: 'center',
            fill: 'none',
            style: 'classic',
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
            fontSize: `${this.state.fontSize}em`,
            color: this.state.color,
        };

        switch (this.state.style) {
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
            break;
        }

        let lineHeight = 1.2;
        style.fontSize = `${this.state.fontSize*2}em`;

        let rows = this.state.text.split('\n').length;

        style.lineHeight = `${lineHeight}em`;
        let colorObj = colorParse(this.state.color);

        switch (this.state.fill) {
            case 'none':
                style.color = this.state.color;
                style.backgroundColor = 'transparent';
                break;
            case 'fill':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
                break;
            case 'alpha':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
            break;
            case 'button':
                style.color = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
                style.boxShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.color = this.state.color;
                style.backgroundColor = 'transparent';
                style.textShadow = `1px 1px 2px rgb(54, 54, 54)`;
                break;


            default:
                style.fontWeight = 'normal';
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
                style.backgroundColor = 'transparent';
                break;
            case 'fill':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
                break;
            case 'alpha':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
                break;
            case 'button':
                style.fill = this.state.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.state.color;
                style.boxShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.fill = this.state.color;
                style.backgroundColor = 'transparent';
                style.textShadow = `2px 2px 6px rgb(54, 54, 54)`;
                break;


            default:
                style.fill = this.state.color;
                style.backgroundColor = 'transparent';
            break;
        }
        return style;
    }

    done() {
        this.setState({
        });
        console.log(this.state);
        this.props.onDone(this.state);
    }

    changeFontSize(value) {
        this.setState({
            fontSize: value
        });

    }

    render() {
        return (
            <div className={`settings settings--text ${this.props.active ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button id="text-align" onClick={this.changeTextAlign}>
                            <FA icon={`align-${this.state.align}`} />
                        </button>
                        <button id="text-fill" style={this.styleForFillButton()} className={`text-fill--${this.state.fill}`} onClick={this.changeTextFill}>
                            <FA icon="font" />
                        </button>
                        <button id="text-style" onClick={this.changeTextStyle}>
                            {this.state.style}
                        </button>
                        <button className="done" onClick={this.done}>Done</button>
                    </div>
                </div>
                <div className="textgroup">
                    <Textarea inputRef={(txt) => {this.textInput.current = txt;}}
                        style={this.styleForTextArea()}
                        value={this.state.text}
                        onChange={this.onChangeText} />
                </div>
                <div className={`font-size ${this.state.hoverFontSize ? 'hover' : ''}`}
                style={{visibility: (this.state.focus ? 'hidden' : 'visible')}}>
                    <Slider vertical min={1} max={6} defaultValue={1} value={this.state.fontSize} step={0.1} style={{height: '200px'}}
                        onChange={this.changeFontSize}
                        onBeforeChange={() => {this.setState({hoverFontSize: true});}}
                        onAfterChange={() => {this.setState({hoverFontSize: false});}} />
                </div>
                <div style={{visibility: (this.state.focus ? 'hidden' : 'visible')}}>
                    <ColorPicker onSelectColor={this.selectColor} />
                </div>
            </div>
        );
  }
}

export default TextSettings;


