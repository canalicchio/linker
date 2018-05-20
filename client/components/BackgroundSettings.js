import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight, StyleSheet} from 'react-native';


// import ImagesUploader from 'react-images-uploader';
import {colorPalette} from './ColorPicker';

import {
    setBackgroundColor,
    setBackgroundImage,
} from '../reducers/story';

import {
    closeSettings,
} from '../reducers/app';

const styles = StyleSheet.create({
    menuTop: {
        top: 0,
        left: 0,
        width: '100%',
        height: 70,
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
    },
    menuTopText: {
        color: '#ffffff',
        marginHorizontal: 15,
    },
    backgroundSettings: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    colorsPalette: {
        marginHorizontal: 40,
        marginVertical: 30,
    },
    colorPaletteContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    colorPickStyle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#ffffff',
        marginVertical: 6,
        marginHorizontal: 4,
    },
});


class BackgroundSettings extends Component {
    constructor(props) {
        super(props);

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }
    handleImageLoad(err, response) {
        if(err) {
            console.log(err);
            this.props.deleteBackgroundImage();
        } else {
            this.props.setBackgroundImage(response);
        }
    }
    render() {
        let palette = colorPalette({
            selectColor: this.props.setBackgroundColor,
            containerStyle: styles.colorPaletteContainer,
            colorPickStyle: styles.colorPickStyle,
        });
        return (
            <View className={`settings settings--background ${this.props.app.backgroundSettingsActive ? 'active' : ''}`} style={styles.backgroundSettings}>
                <View className={`menu-top`} style={styles.menuTop}>
                    <View className="menu-top__inner">
                        <TouchableHighlight className="done" onPress={this.props.closeSettings}>
                            <Text style={styles.menuTopText}>Done</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <Text style={styles.pageTitle}>Background colors</Text>
                    <View style={styles.colorsPalette}>
                        {palette}
                    </View>
                </View>
                <View className="image-upload">
                </View>
            </View>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    setBackgroundColor: (color) => {
        dispatch(setBackgroundColor(color));
    },
    setBackgroundImage: (image) => {
        dispatch(setBackgroundImage(image));
    },
    deleteBackgroundImage: () => {
        dispatch(setBackgroundImage(null));
    },
    closeSettings: () => {
        dispatch(closeSettings());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSettings);
