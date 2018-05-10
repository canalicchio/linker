import React, { Component } from 'react';

import { SliderPicker } from 'react-color';
import InputRange from 'react-input-range';


class TextSettings extends Component {
    constructor(props) {
        super(props);

        this.done = this.done.bind(this);

        this.textInput = React.createRef();

        this.state = {
            text: '',
        };

        this.onChangeText = this.onChangeText.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.active === false && this.props.active === true) {
            if(this.props.currentText) {
                this.setState({
                    text: this.props.currentText.text,
                });
            }
            this.textInput.current.focus();
        }
    }

    onChangeText(ev) {
        this.setState({
            text: ev.target.value,
        });
    }

    styleForInput() {
        if(this.props.active) {
            return {
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }
        }
    }

    done() {
        this.props.onDone(this.state);
    }

    render() {
        return (
            <div className={`settings settings--text ${this.props.active ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button className="done" onClick={this.done}>Done</button>
                    </div>
                </div>
                <div>
                    <input ref={this.textInput} type="text" value={this.state.text} onChange={this.onChangeText} style={this.styleForInput() }/>
                </div>
            </div>
        );
  }
}

export default TextSettings;


