import React, { Component } from 'react';


class PhonePreview extends Component {

    constructor(props) {
        super(props);

        this.onCliCkText = this.onClickText.bind(this);
    }
    onClickText(i) {
        this.props.onSelectText(i);
    }

    render() {
        return (
        <div className="phonebox" style={{
            backgroundColor: this.props.backgroundColor,
            backgroundImage: `url(${this.props.backgroundImage})`,
            }}
            onClick={this.props.onClick}>
        </div>
    );
  }
}

export default PhonePreview;
