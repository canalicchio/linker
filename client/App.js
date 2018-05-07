import React, { Component } from 'react';
import UrlInput from './UrlInput';
import Phonebox from './Phonebox';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';

import { SliderPicker } from 'react-color';
import InputRange from 'react-input-range';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#ffffff',
            button: {
                text: 'Click me',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontSize: 1,
                left: 0,
                top: 0,
            }
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleButtonColorChange = this.handleButtonColorChange.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleButtonFontSize = this.handleButtonFontSize.bind(this);
    }
    handleColorChange({hex}) {
        this.setState({
            backgroundColor: hex,
        });
        console.log(hex);
    }
    handleButtonColorChange({hex}) {
        this.setState({
            button: {
                ...this.state.button,
                backgroundColor: hex,
            }
        });
    }
    handleButtonFontSize(value) {
        this.setState({
            button: {
                ...this.state.button,
                fontSize: value,
            }
        });
    }
    handleImageLoad(err, response) {

        if(!err) {
            this.setState({
                backgroundImage: response
            });
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Linkout generator</h1>
                </header>
                <content>
                    <div className="step1">
                        <UrlInput />
                    </div>
                    <div className="step2">
                        <div className="interface">
                            <Phonebox {...this.state} />
                            <div className="toolbox">
                                <div>
                                    <ImagesUploader
                                        url="http://localhost:3000/api/image"
                                        optimisticPreviews
                                        multiple={false}
                                        onLoadEnd={this.handleImageLoad}
                                        label="Upload a picture" />
                                </div>
                                <div>
                                    <label>Background color</label>
                                    <SliderPicker color={this.state.backgroundColor} onChangeComplete={ this.handleColorChange } />
                                </div>
                                <div>
                                    <button>add Text</button>
                                </div>
                                <div>
                                    <label>Button color</label>
                                    <SliderPicker color={this.state.button.backgroundColor} onChangeComplete={ this.handleButtonColorChange } />
                                </div>
                                <div>
                                    <label>Button font size</label>
                                    <InputRange
                                            maxValue={3}
                                            minValue={0.5}
                                            step={0.1}
                                            value={this.state.button.fontSize}
                                            onChange={this.handleButtonFontSize} />
                                </div>
                            </div>
                        </div>
                    </div>
                </content>
            </div>
            );
    }
}

export default App;
