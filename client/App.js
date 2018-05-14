import React, { Component } from 'react';

import 'react-images-uploader/styles.css';

import PhonePreview from './components/PhonePreview';
import Toggle from './components/Toggle';
import TextSettings from './components/TextSettings';
import LinkSettings from './components/LinkSettings';
import BackgroundSettings from './components/BackgroundSettings';

import DraggableText from './components/DraggableText';

import FA from '@fortawesome/react-fontawesome';

import fontawesome from '@fortawesome/fontawesome';

import faLink from '@fortawesome/fontawesome-free-solid/faLink';
import faImage from '@fortawesome/fontawesome-free-solid/faImage';
import faFont from '@fortawesome/fontawesome-free-solid/faFont';
import faArrow from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faALeft from '@fortawesome/fontawesome-free-solid/faAlignLeft';
import faACenter from '@fortawesome/fontawesome-free-solid/faAlignCenter';
import faARight from '@fortawesome/fontawesome-free-solid/faAlignRight';
import faATrash from '@fortawesome/fontawesome-free-solid/faTrashAlt';

fontawesome.library.add(
    faLink,
    faImage,
    faFont,
    faArrow,
    faALeft,
    faACenter,
    faARight,
    faATrash
);

function trim(string) {
    return String(string).replace(/^\s+|\s+$/g, '');
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#ffffff',
            texts: [],
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            selectedText: 0,
            active: true,
        };
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.removeBackgroundImage = this.removeBackgroundImage.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);

        this.toggleLink = this.toggleLink.bind(this);
        this.toggleBackground = this.toggleBackground.bind(this);
        this.toggleText = this.toggleText.bind(this);

        this.doneTextSettings = this.doneTextSettings.bind(this);
        this.doneLinkSettings = this.doneLinkSettings.bind(this);
        this.doneBackgroundSettings = this.doneBackgroundSettings.bind(this);

        this.textInput = React.createRef();

    }
    componentDidMount() {
        document.querySelector('.rc-slider-handle').addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });
        document.querySelector('.rc-slider-track').addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });
        document.querySelector('.rc-slider-mark').addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });
        document.querySelector('.rc-slider-rail').addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });
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
        let texts = this.state.texts.concat([{
            id: guid(),
            editable: true,
            style: 'classic',
            fill: 'none',
            align: 'center',
            fontSize: 2.0,
            color: '#000',
            text: '',
            x: Math.min(window.innerWidth, 375)/2,
            y: Math.min(window.innerHeight, 667)/2,
            scale: 1,
            rotate: 0,
        }]);

        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: true,
            texts,
            selectedText: texts.length - 1,
        });
        this.textInput.current.focus();
    }


    activeMenu() {
        return !this.state.active || (this.state.linkSettingsActive || this.state.backgroundSettingsActive || this.state.textSettingsActive);
    }

    doneTextSettings(newText) {
        let texts = this.state.texts;
        let i = this.state.selectedText;
        if (trim(newText.text).length > 0) {
            texts[i] = newText;
            texts[i].editable = false;
            texts = texts.concat();
        } else {
            texts.splice(i, 1);
            texts = texts.concat();
        }
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            texts,
            active: false,
        });
    }
    deleteText(i) {
        let texts = this.state.texts;
        texts.splice(i, 1);
        texts = texts.concat();
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            texts,
        });
    }
    doneBackgroundSettings() {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: false,
            active: false,
        });
    }

    setBackgroundColor(hex) {
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
            active: false,
        });
    }

    dragStop(data) {

        let texts = this.state.texts;
        let i = this.state.selectedText;
        let txt = texts[i];

        txt = {
            ...txt,
            x: data.x,
            y: data.y,
            scale: data.scale,
            rotate: data.rotate,
        };
        texts[i] = txt;
        texts = texts.concat();
        this.setState({
            texts,
        });
    }
    selectText(i) {
        this.setState({
            linkSettingsActive: false,
            backgroundSettingsActive: false,
            textSettingsActive: true,
            selectedText: i,
        });
        this.textInput.current.focus();
    }

    onDragStart(i) {

        let texts = this.state.texts;
        let txt = texts[i];
        texts.splice(i, 1);
        texts.push(txt);
        this.setState({
            texts: texts.concat(),
            selectedText: texts.length-1,
        });
    }


    render() {
        let texts = this.state.texts.map((txt, i) => {
            return (
                <DraggableText key={`txt_${txt.id}`} {...txt}
                    onDragStart={() => {this.onDragStart(i);}}
                    onDragStop={(text) => {this.dragStop(text)}}
                    onDelete={() => {this.deleteText(i)}}
                    onSelect={() => {this.selectText(i)}} />
            );
        });
        return (
            <div className="App">
                <div className={`menu-top ${this.activeMenu() ? 'active-submenu' : ''}`}>
                    <div className={`menu-top__icons`}>
                        <Toggle name="link" active={this.state.linkSettingsActive}
                            onClick={this.toggleLink} />
                        <Toggle name="image" active={this.state.backgroundSettingsActive}
                            onClick={this.toggleBackground} />
                        <Toggle name="font" active={this.state.textSettingsActive}
                            onClick={this.toggleText} />
                    </div>
                </div>
                <div className="texts">
                    {texts}
                </div>
                <PhonePreview {...this.state} onClick={() => {this.setState({active: !this.state.active})}} />
                <TextSettings
                    internalRef={this.textInput}
                    onDone={(text) => {this.doneTextSettings(text)}}
                    active={this.state.textSettingsActive}
                    currentText={this.state.texts[this.state.selectedText]} />
                <BackgroundSettings
                    active={this.state.backgroundSettingsActive}
                    onDone={this.doneBackgroundSettings}
                    onSetBackgroundColor={this.setBackgroundColor}
                    onSetImage={this.setBackgroundImage}
                    onDeleteImage={this.removeBackgroundImage} />

                <LinkSettings active={this.state.linkSettingsActive} onDone={this.doneLinkSettings} />
                <div className={`menu-bottom ${this.activeMenu() ? 'active-submenu' : ''}`}>
                    <div className="menu-bottom__inner">
                        <button className="button finish">Publish
                            <FA icon="angle-right" size="lg" />
                        </button>
                    </div>
                </div>
            </div>
            );
    }
}

export default App;
