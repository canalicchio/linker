import React, { Component } from 'react';

import { SliderPicker } from 'react-color';
import ImagesUploader from 'react-images-uploader';

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
            this.props.removeImage();
        } else {
            this.props.onSetImage(response);
        }
    }

    handleDeleteImage(key) {
        this.props.onDeleteImage();
    }

    render() {
        return (
            <div className={`settings settings--background ${this.props.active ? 'active' : ''}`}>
                <div className={`menu-top`}>
                    <div className="menu-top__inner">
                        <button className="done" onClick={this.done}>Done</button>
                    </div>
                </div>
                <div>
                    <ImagesUploader
                        url="http://localhost:3000/api/image"
                        optimisticPreviews
                        multiple={false}
                        onLoadEnd={this.handleImageLoad}
                        deleteImage={this.handleDeleteImage}
                        label="Upload a picture" />
                </div>
                <div>
                    <label>Background color</label>
                    <SliderPicker color={this.props.backgroundColor} onChangeComplete={ this.props.onSetBackgroundColor } />
                </div>
            </div>
            );
  }
}

export default BackgroundSettings;

