import React, { Component } from 'react';

import { SliderPicker } from 'react-color';
import ImagesUploader from 'react-images-uploader';

class LinkSettings extends Component {
    constructor(props) {
        super(props);

        this.done = this.done.bind(this);
    }
    done() {
        this.props.onDone();
    }
    render() {
    return (
        <div className={`settings settings--link ${this.props.active ? 'active' : ''}`}>
            <div className={`menu-top`}>
                <div className="menu-top__inner">
                    <button className="done" onClick={this.done}>Done</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
  }
}

export default LinkSettings;


