import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Animated} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
//  import 'react-images-uploader/styles.css';
import { Button } from 'react-native-elements';

import PhonePreview from './components/PhonePreview';
import Toggle from './components/Toggle';
import TextSettings from './components/TextSettings';
//  import LinkSettings from './components/LinkSettings';
import BackgroundSettings from './components/BackgroundSettings';
//  import DraggableText from './components/DraggableText';
//  import Fa from '@fortawesome/react-fontawesome';

//import Icon from './components/Icon';
import Gestures from './components/Gestures';

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

const styles = StyleSheet.create({
    menuTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 70,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 60,
        zIndex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    phonePreview: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    publishButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        minWidth: 140,
        minHeight: 40,
        shadowColor: '#888888',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.7,
    },
    publishButtonText: {
        flex: 0,
        minHeight: 20,
        flexGrow: 0,
        flexShrink: 0,
        color: '#888888',
        fontWeight: '800',
        marginHorizontal: 5,
    },
    publishButtonIcon: {
        flex: 0,
        minWidth: 20,
        minHeight: 20,
        flexGrow: 0,
        color: '#888888'
    }
});

const fontSizes = {
  articleHeadline: 45,
  articleMeta: 15,
  body: 18,
  bodyMobile: 17,
  caption: 13,
  cardHeadline: 27,
  cardMeta: 13,
  cardMetaMobile: 12,
  credits: 9,
  headline: 30,
  leadHeadline: 35,
  link: 13,
  meta: 14,
  pageComponentHeadline: 25,
  pageHeadline: 40,
  pagingMeta: 15,
  puffLink: 11,
  secondary: 16,
  sliceHeadline: 32,
  smallestHeadline: 20,
  smallHeadline: 22,
  teaser: 14,
  tertiary: 15
};

const gestureStyle = StyleSheet.create({
  gestures: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "red"
  },
  row: {
    flex: 1
  },
  north: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  south: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  text: {
    color: "yellow",
    fontSize: fontSizes.smallestHeadline,
    padding: 5
  }
});
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        this.toggleText = this.toggleText.bind(this);
        this.editText = this.editText.bind(this);

        this.doneTextSettings = this.doneTextSettings.bind(this);

        this.textInput = React.createRef();


        this.tilt = throttle((event) => {
            if(this.props.app.textSettingsActive === false && event.accelerationIncludingGravity) {
                const x = parseFloat(event.accelerationIncludingGravity.x);
                const y = parseFloat(event.accelerationIncludingGravity.y);
                this.props.tilt(( this.state.tiltX + x ) / 2, (this.state.tiltY + y ) / 2);
            }
        }, 20);
    }
    componentDidMount() {
        //  document.querySelector('.rc-slider-handle').addEventListener('touchmove', (ev) => {
        //      ev.preventDefault();
        //  });
        //  document.querySelector('.rc-slider-track').addEventListener('touchmove', (ev) => {
        //      ev.preventDefault();
        //  });
        //  document.querySelector('.rc-slider-mark').addEventListener('touchmove', (ev) => {
        //      ev.preventDefault();
        //  });
        //  document.querySelector('.rc-slider-rail').addEventListener('touchmove', (ev) => {
        //      ev.preventDefault();
        //  });

        //  window.addEventListener('devicemotion', this.tilt, true);
    }

    toggleText() {
        const newElement = {
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
        if(this.textInput.current) {
            this.textInput.current.focus();
        }
    }

    editText(text) {
        this.props.selectElement(text);
        this.props.openTextSettings();
        if(this.textInput.current) {
            this.textInput.current.focus();
        }
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
            const element = this.props.story.elements[i];
            if(element.id === newElement.id) {
                found = true;
                break;
            }

        }
        if(found && trim(newElement.text).length > 0) {
            this.props.udateElementAt(i, newElement);
        } else if(found && trim(newElement.text).length === 0) {
            this.props.removeElement(i);
        } else if (found === false && trim(newElement.text).length > 0) {
            this.props.addNewElement(newElement);
        }
    }

    render() {
        //    const elements = this.props.story.elements.map((txt, i) => (
        //        (
        //            <DraggableText key={`txt_${txt.id}`} {...txt}
        //                selected={this.props.app.selectedElement ? (this.props.app.selectedElement.id === txt.id) : false }
        //                onDragStart={() => {
        //                    this.props.selectElement(this.props.story.elements[i]);
        //                    this.props.onDragStart(i);
        //                }}
        //                onDragStop={(text) => {this.props.udateElementAt(i, text)}}
        //                onDelete={() => {this.props.removeElement(i)}}
        //                onSelect={() => {this.editText(txt)}} />
        //        )
        //    ));
        return (
            <View className="App" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 375,
                height: 667,
                }}>
                <View className={`menu-top ${this.activeMenu() ? 'active-submenu' : ''}`} style={styles.menuTop}>
                    <Toggle name="link" active={this.props.app.linkSettingsActive}
                        onClick={this.props.openLinkSettings} color="#ffffff" />
                    <Toggle name="image" active={this.props.app.backgroundSettingsActive}
                        onClick={this.props.openBackgroundSettings} color="#ffffff" />
                    <Toggle name="font" active={this.props.app.textSettingsActive}
                        onClick={this.toggleText} color="#ffffff" />
                </View>
                { this.props.app.backgroundSettingsActive ? (<BackgroundSettings />) : null }
                { this.props.app.textSettingsActive ? (<TextSettings />) : null }
                <PhonePreview style={styles.phonePreview} />
                <Gestures style={gestureStyle.gestures}>
                    <Text>Hello World</Text>
                </Gestures>
                <View className={`menu-bottom ${this.activeMenu() ? 'active-submenu' : ''}`} style={styles.menuBottom}>
                    <View style={styles.publishButton}>
                        <Text style={styles.publishButtonText}>Publish</Text>
                            <Icon name="chevron-right" size={20} color="#888888" />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => state;

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
        const action = updateElement(element);
        action.payload.index = index;
        dispatch(action);
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
