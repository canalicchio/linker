import React, { Component } from 'react';
import { connect } from 'react-redux';

import ImagesUploader from 'react-images-uploader';
import ColorPicker from './ColorPicker';
import {colorPalette} from './ColorPicker';

import {
    setBackgroundColor,
    setBackgroundImage,
} from '../reducers/story';

import {
    closeSettings,
} from '../reducers/app';

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
        let palette = colorPalette(this.props.setBackgroundColor);
        return (
            <div className={`settings settings--background ${this.props.app.backgroundSettingsActive ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button className="done" onClick={this.props.closeSettings}>Done</button>
                    </div>
                </div>
                <div className="background-color">
                    <label>Background color</label>
                    <div>
                        {palette}
                    </div>
                </div>
                <div className="image-upload">
                    <ImagesUploader
                        url="/api/image"
                        optimisticPreviews
                        multiple={false}
                        onLoadEnd={this.handleImageLoad}
                        deleteImage={this.props.deleteBackgroundImage}
                        label="Upload a picture" />
                </div>
            </div>
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
