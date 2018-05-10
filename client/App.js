import React, { Component } from 'react';
import UrlInput from './UrlInput';
import PhonePreview from './PhonePreview';

import 'react-images-uploader/styles.css';
import faStyles from 'font-awesome/css/font-awesome.css'
import Toggle from './Toggle';


import TextSettings from './TextSettings';
import LinkSettings from './LinkSettings';
import BackgroundSettings from './BackgroundSettings';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#ffffff',
            buttons: [],
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            currentText: 0,
        };
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.removeBackgroundImage = this.removeBackgroundImage.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);

        this.handleButtonFontSize = this.handleButtonFontSize.bind(this);
        this.handleButtonColorChange = this.handleButtonColorChange.bind(this);

        this.toggleLink = this.toggleLink.bind(this);
        this.toggleBackground = this.toggleBackground.bind(this);
        this.toggleText = this.toggleText.bind(this);

        this.doneTextSettings = this.doneTextSettings.bind(this);
        this.doneLinkSettings = this.doneLinkSettings.bind(this);
        this.doneBackgroundSettings = this.doneBackgroundSettings.bind(this);

        this.onSelectText = this.onSelectText.bind(this);
    }
    toggleLink() {
        console.log('toggleLink', !this.state.linkSettingsActive);
        this.setState({
            linkSettingsActive: !this.state.linkSettingsActive,
            backgroundSettingsActive: false,
            textSettingsActive: false,
        });
    }
    toggleBackground() {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: !this.state.backgroundSettingsActive,
            textSettingsActive: false,
        });
    }
    toggleText() {
        let i = this.state.buttons.length;
        let buttons = this.state.buttons.concat([{text: 'new text'}]);

        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: !this.state.textSettingsActive,
            buttons: buttons,
            currentText: i,
        });
    }

    activeMenu() {
        return this.state.linkSettingsActive || this.state.backgroundSettingsActive || this.state.textSettingsActive;
    }

    doneTextSettings(newText) {
        let buttons = this.state.buttons;
        if(newText.text !== '') {
            buttons[this.state.currentText].text = newText.text;
        } else {
            buttons.splice(this.state.currentText, 1);
        }
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            buttons: buttons.concat(),
        });
    }
    doneBackgroundSettings() {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
        });
    }

    setBackgroundColor({hex}) {
        this.setState({
            backgroundColor: hex,
        });
    }

    setBackgroundImage(imageUrl) {
        this.setState({
            backgroundImage: imageUrl
        });
    }

    removeBackgroundImage(imageUrl) {
        this.setState({
            backgroundImage: null
        });
    }

    doneLinkSettings() {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
        });
    }

    onSelectText(i) {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: !this.state.textSettingsActive,
            currentText: i,
        });


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


    render() {
        return (
            <div className="App">
                <div className={`menu-top ${this.activeMenu() ? 'active-submenu' : ''}`}>
                    <div className={`menu-top__icons`}>
                        <Toggle name="link" active={this.state.linkSettingsActive} onClick={this.toggleLink} />
                        <Toggle name="image" active={this.state.backgroundSettingsActive} onClick={this.toggleBackground} />
                        <Toggle name="font" active={this.state.textSettingsActive} onClick={this.toggleText} />
                    </div>
                </div>
                <PhonePreview {...this.state} onSelectText={this.onSelectText} />

                <TextSettings
                    active={this.state.textSettingsActive}
                    onDone={this.doneTextSettings}
                    currentText={this.state.buttons[this.state.currentText]} />
                <BackgroundSettings
                    active={this.state.backgroundSettingsActive}
                    onDone={this.doneBackgroundSettings}
                    onSetBackgroundColor={this.setBackgroundColor}
                    onSetImage={this.setBackgroundImage}
                    onDeleteImage={this.removeBackgroundImage} />

                <LinkSettings active={this.state.linkSettingsActive} onDone={this.doneLinkSettings} />
                <div className={`menu-bottom ${this.activeMenu() ? 'active-submenu' : ''}`}>
                    <div className="menu-bottom__inner">
                        <button className="button finish">Done</button>
                    </div>
                </div>
            </div>
            );
    }
}

export default App;
