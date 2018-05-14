import React, { Component } from 'react';

import ImagesUploader from 'react-images-uploader';
import ColorPicker from './ColorPicker';
import {colorPalette} from './ColorPicker';

class BackgroundSettings extends Component {
    constructor(props) {
        super(props);

        this.done = this.done.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
    }
    done() {
        this.props.onDone();
    }

    handleImageLoad(err, response) {
        if(err) {
            console.log(err);
            this.props.onDeleteImage();
        } else {
            this.props.onSetImage(response);
        }
    }

    handleDeleteImage(key) {
        this.props.onDeleteImage();
    }

    render() {
        let palette = colorPalette(this.props.onSetBackgroundColor);
        return (
            <div className={`settings settings--background ${this.props.active ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button className="done" onClick={this.done}>Done</button>
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
                        deleteImage={this.handleDeleteImage}
                        label="Upload a picture" />
                </div>
            </div>
            );
  }
}

export default BackgroundSettings;

