import React, { Component } from 'react';
import Rnd from 'react-rnd';

class Phonebox extends Component {
    render() {
        let button = null;
        if(this.props.button) {
            button = (
                <Rnd
                default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200,
                }}
                >
                    <a className="button" style={{
                    backgroundColor: this.props.button.backgroundColor,
                    color: this.props.button.color,
                    fontSize: `${this.props.button.fontSize}em`
                }}>{this.props.button.text}</a>
                </Rnd>
                 );
        }
    return (
        <div className="phonebox" style={{
            backgroundColor: this.props.backgroundColor,
            backgroundImage: `url(${this.props.backgroundImage})`,
            }}>
            {button}
        </div>
    );
  }
}

export default Phonebox;
