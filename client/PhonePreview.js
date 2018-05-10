import React, { Component } from 'react';
import Rnd from 'react-rnd';

class PhonePreview extends Component {

    constructor(props) {
        super(props);

        this.onCliCkText = this.onClickText.bind(this);
    }
    onClickText(i) {
        this.props.onSelectText(i);
    }

    render() {
        let buttons = [];
        if(this.props.buttons) {
            buttons = this.props.buttons.map((button, i) => {
                let clickHandler= () => {
                    this.onClickText(i);
                };
                return (
                    <Rnd key={`button_${i}`}
                        default={{
                            x: 0,
                            y: 200,
                            width: 320,
                            height: 200,
                        }}>
                        <a className="button"
                            onClick={clickHandler}
                            style={{
                                backgroundColor: button.backgroundColor,
                                color: button.color,
                                fontSize: `${button.fontSize}em`
                        }}>{button.text}</a>
                    </Rnd>
                );
            });
        }
    return (
        <div className="phonebox" style={{
            backgroundColor: this.props.backgroundColor,
            backgroundImage: `url(${this.props.backgroundImage})`,
            }}>
            {buttons}
        </div>
    );
  }
}

export default PhonePreview;
