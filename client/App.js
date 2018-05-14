import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-images-uploader/styles.css';

import PhonePreview from './components/PhonePreview';
import Toggle from './components/Toggle';
import TextSettings from './components/TextSettings';
import LinkSettings from './components/LinkSettings';
import BackgroundSettings from './components/BackgroundSettings';
import DraggableText from './components/DraggableText';
import FA from '@fortawesome/react-fontawesome';

import throttle from 'lodash.throttle';
import fontawesome from '@fortawesome/fontawesome';


import faLink from '@fortawesome/fontawesome-free-solid/faLink';
import faImage from '@fortawesome/fontawesome-free-solid/faImage';
import faFont from '@fortawesome/fontawesome-free-solid/faFont';
import faArrow from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faALeft from '@fortawesome/fontawesome-free-solid/faAlignLeft';
import faACenter from '@fortawesome/fontawesome-free-solid/faAlignCenter';
import faARight from '@fortawesome/fontawesome-free-solid/faAlignRight';
import faATrash from '@fortawesome/fontawesome-free-solid/faTrashAlt';


import {
    openTextSettings,
    openBackgroundSettings,
    openLinkSettings,
    closeSettings,
    selectElement,
} from './reducers/app';

import {
    tilt,
} from './reducers/device';

import {
    addElement,
    removeElement,
    sortUp,
} from './reducers/story';

import {
    updateElement,
} from './reducers/element';


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
            story: {
                backgroundColor: '#ffffff',
                backgroundImage: null,
                elements: [],
            },
            app: {
                linkSettingsActive: false,
                backgroundSettingsActive: false,
                textSettingsActive: false,
                showMenu: true,
                selectedElement: null,
            },
            device: {
                tiltX: 0,
                tiltY: 0,
            }
        };
        this.toggleText = this.toggleText.bind(this);
        this.editText = this.editText.bind(this);

        this.doneTextSettings = this.doneTextSettings.bind(this);

        this.textInput = React.createRef();


        this.tilt = throttle((event) => {
            if(this.state.textSettingsActive == false && event.accelerationIncludingGravity) {
                let x = parseFloat(event.accelerationIncludingGravity.x);
                let y = parseFloat(event.accelerationIncludingGravity.y);
                this.props.tilt(( this.state.tiltX + x ) / 2, (this.state.tiltY + y ) / 2);
            }
        }, 20);
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

        window.addEventListener('devicemotion', this.tilt, true);
    }

    toggleText() {
        let newElement = {
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
        };
        this.props.selectElement(newElement);
        this.props.openTextSettings();
        this.textInput.current.focus();
    }

    editText(text) {
        this.props.selectElement(text);
        this.props.openTextSettings();
        this.textInput.current.focus();
    }


    activeMenu() {
        return !this.props.app.showMenu || (this.props.app.linkSettingsActive || this.props.app.backgroundSettingsActive || this.props.app.textSettingsActive);
    }

    doneTextSettings(newElement) {
        this.props.closeSettings();
        this.props.selectElement(null);
        let i=0;
        let found = false;
        for (i; i< this.props.story.elements.length; i++) {
            let element = this.props.story.elements[i];
            if(element.id == newElement.id) {
                found = true;
                break;
            }

        }
        if(found) {
            if (trim(newElement.text).length > 0) {
                this.props.udateElementAt(i, newElement);
            } else {
                this.props.removeElement(i);
            }
        } else {
            if (trim(newElement.text).length > 0) {
                this.props.addNewElement(newElement);
            }
        }
    }

    render() {
        let elements = this.props.story.elements.map((txt, i) => {
            return (
                <DraggableText key={`txt_${txt.id}`} {...txt}
                    selected={this.props.app.selectedElement ? (this.props.app.selectedElement.id === txt.id) : false }
                    onDragStart={() => {
                        this.props.selectElement(this.props.story.elements[i]);
                        this.props.onDragStart(i);
                    }}
                    onDragStop={(text) => {this.props.udateElementAt(i, text)}}
                    onDelete={() => {this.props.removeElement(i)}}
                    onSelect={() => {this.editText(txt)}} />
            );
        });
        return (
            <div className="App">
                <div className={`menu-top ${this.activeMenu() ? 'active-submenu' : ''}`}>
                    <div className={`menu-top__icons`}>
                        <Toggle name="link" active={this.props.app.linkSettingsActive}
                            onClick={this.props.openLinkSettings} />
                        <Toggle name="image" active={this.props.app.backgroundSettingsActive}
                            onClick={this.props.openBackgroundSettings} />
                        <Toggle name="font" active={this.props.app.textSettingsActive}
                            onClick={this.toggleText} />
                    </div>
                </div>
                <div className="texts">
                    {elements}
                </div>
                <PhonePreview onClick={() => {this.props.selectElement(null)} } />
                <TextSettings
                    internalRef={this.textInput}
                    onDone={(text) => {this.doneTextSettings(text)}}
                    active={this.props.app.textSettingsActive}
                    currentText={this.props.app.selectedElement} />
                <BackgroundSettings />
                <LinkSettings />
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

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    openTextSettings: () => {
        dispatch(openTextSettings());
    },
    openLinkSettings: () => {
        dispatch(openLinkSettings());
    },
    openBackgroundSettings: () => {
        dispatch(openBackgroundSettings());
    },
    closeSettings: () => {
        dispatch(closeSettings());
    },
    tilt: (x,y) => {
        dispatch(tilt(x,y));
    },
    onDragStart: (index) => {
        dispatch(sortUp(index));
    },
    selectElement: (element) => {
        dispatch(selectElement(element));
    },
    addNewElement: (element) => {
        dispatch(addElement(element));
    },
    removeElement: (index) => {
        dispatch(removeElement(index));
    },
    udateElementAt: (index, element) => {
        let action = updateElement(element);
        action.payload.index = index;
        console.log(action);
        dispatch(action);
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
