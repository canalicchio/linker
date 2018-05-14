import React, { Component } from 'react';
import { connect } from 'react-redux';

import Gesture from 'rc-hammerjs';
import colorParse from 'color-parse';
import FA from '@fortawesome/react-fontawesome';


class DraggableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snapH: false,
            snapV: false,
            x: this.props.x,
            y: this.props.y,
            position: {
                x: this.props.x,
                y: this.props.y,
            },
            scale: 1,
            rotate: 0,
            _scale: 1,
            _rotate: 0,
        };
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragStop = this.onDragStop.bind(this);

    }

    styleForText(txt) {
        let style = {
            textAlign: txt.align,
            fontSize: `${txt.fontSize}em`,
            color: txt.color,
        };

        switch (this.props.style) {
            case 'classic':
                style.fontWeight = 'normal';
            break;
            case 'typewriter':
                style.fontFamily = 'Courier New';
                style.fontWeight = 'normal';
                break;
            case 'strong':
                style.fontWeight = 'bold';
            break;

            default:
                style.fontWeight = 'normal';

        }

        let lineHeight = 1.2;
        style.fontSize = `${txt.fontSize}em`;

        let rows = txt.text.split('\n').length;
        style.lineHeight = `${lineHeight}em`;
        style.width = `${Math.min(window.innerWidth, 375) / 2}px`;

        return style;
    }
    styleForRow(txt) {
        let style = {
            color: txt.color,
        };
        let colorObj = colorParse(txt.color);
        switch (txt.fill) {
            case 'none':
                style.color = txt.color;
                style.backgroundColor = 'transparent';
                break;
            case 'fill':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.props.color;
                break;
            case 'alpha':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = `rgba(${colorObj.values.join(',')}, 0.5)`;
                break;
            case 'button':
                style.color = txt.color == '#fff' ? '#000' : '#fff';
                style.backgroundColor = this.props.color;
                style.padding = `4px 16px`;
                style.boxShadow = `${this.props.device.tiltX}px ${-this.props.device.tiltY}px 6px rgb(54, 54, 54)`;
                break;
            case 'text-shadow':
                style.color = txt.color;
                style.backgroundColor = 'transparent';
                style.textShadow = `${1+this.props.device.tiltX/2}px ${-3 - this.props.device.tiltY}px 2px rgb(54, 54, 54)`;
                break;
        }

        return style;
    }

    createDraggableData(draggable, coreData) {
        return {
            node: coreData.node,
            x: coreData.deltaX,
            y: coreData.deltaY,
            deltaX: coreData.deltaX,
            deltaY: coreData.deltaY,
            lastX: draggable.state.position.x,
            lastY: draggable.state.position.y
        };
    }

    onDragStart(data) {
        const uiData = this.createDraggableData(this, data);
        this.setState({
            dragging: true,
            dragged: false,
            position: {
                x: this.state.x,
                y: this.state.y
            }
        });
        this.props.onDragStart();
    }
    dragSnap(data) {
        const halfx = Math.min(window.innerWidth, 375) / 2;
        const halfy = Math.min(window.innerHeight, 667) / 2;
        let newX = this.state.x + data.x;
        let newY = this.state.y + data.y;

        let newState = {
            position: {
                x: newX,
                y: newY,
            }
        };

        if( Math.abs(newX - halfx) < 8) {
            newState.snapH = true;
            newState.position.x = halfx;
        } else {
            newState.snapH = false;
        }
        if( Math.abs(newY - halfy) < 8) {
            newState.snapV = true;
            newState.position.y = halfy;
        } else {
            newState.snapV = false;
        }
        return newState;
    }
    onDrag(data) {
        if (!this.state.dragging) return false;
        const halfx = Math.min(window.innerWidth, 375) / 2;
        const halfy = Math.min(window.innerHeight, 667) / 2;

        const uiData = this.createDraggableData(this, data);

        let newState = this.dragSnap(uiData);

        newState.dragged = true;
        if( Math.abs(newState.position.y - halfy*2 + 35) < 25 && Math.abs(newState.position.x - halfx) < 25) {
            newState.intrash = true;
        } else {
            newState.intrash = false;
        }

        this.setState(newState);
    }
    onDragStop(data) {

        const uiData = this.createDraggableData(this, data);
        const halfx = Math.min(window.innerWidth, 375) / 2;
        const halfy = Math.min(window.innerHeight, 667) / 2;

        let newState = this.dragSnap(uiData);

        newState.dragging = false;
        newState.x = newState.position.x;
        newState.y = newState.position.y;
        newState.snapH = false;
        newState.snapV = false;

        if(this.state.intrash) {
            newState.dragging = true;
            newState.deleted = true;
            setTimeout(()=> {
                this.props.onDelete();
            }, 500);
        }
        this.setState(newState);

        this.props.onDragStop({
            ...this.state,
            ...newState,
        });
    }
    onRotate(data) {
        let rotation = data.rotation;
        if( Math.abs( ( (this.state.rotate + rotation) / 90 ) % 1 ) < 0.3) {
            rotation = parseInt((this.state.rotate + rotation) / 90, 10) * 90 - this.state.rotate;
        }
        this.setState({'_rotate': rotation});
    }
    preventOverscroll(ev) {
        ev.preventDefault();
    }
    componentDidMount() {
        this.element.addEventListener('touchmove', this.preventOverscroll);
    }
    componentWillUnmount() {
        this.element.removeEventListener('touchmove', this.preventOverscroll);
    }
    createCSSTransform({x, y, scale, rotate}) {
        return {['transform']: `translate(${x}px,${y}px) scale(${scale}, ${scale}) rotateZ(${rotate}deg)`};
    }

    render() {
        let txt = this.props;
        let rows = txt.text.split('\n');

        const position = this.state.position || {x:0,y:0};
        const draggable = this.state.dragging;
        const transformOpts = {
            x: draggable ? position.x : this.state.x,
            y: draggable ? position.y : this.state.y,
            scale: this.state.scale*this.state._scale,
            rotate: this.state.rotate + this.state._rotate,
        };
        let style = this.createCSSTransform(transformOpts);
        return (
            <div>
                    <div className="textwrap" style={style}>
                        <Gesture
                            options={{
                                recognizers: {
                                    pan: { threshold: 0, pointers: 0 },
                                    pinch: { enable: true, threshold: 0},
                                    rotate: { enable: true, threshold: 0},
                                }
                            }}
                            recognizeWith={{
                                rotate: 'pan',
                                pinch: ['pan', 'rotate']
                            }}
                            onTap={() => {if(!this.state.dragging){this.props.onSelect()};}}
                            onPanStart={this.onDragStart}
                            onPan={this.onDrag}
                            onPanEnd={this.onDragStop}
                            onRotate={(gestureStatus) => { this.onRotate(gestureStatus) }}
                            onRotateEnd={(gestureStatus) => { this.setState({'rotate': this.state.rotate+this.state._rotate, '_rotate': 0});}}
                            onPinch={(gestureStatus) => {console.log(gestureStatus); this.setState({'_scale': gestureStatus.scale}) }}
                            onPinchEnd={(gestureStatus) => { this.setState({'scale': this.state.scale*this.state._scale, '_scale':1}) }}>
                                <div className={`text ${this.state.deleted ? 'deleted' : ''} ${this.props.selected ? 'selected' : ''}`}
                                    ref={(el) => {this.element = el}}
                                    style={this.styleForText(txt)}>
                                    {rows.map((row,j) => (
                                        [<span key={`txt_row_${j}`} className="row" style={this.styleForRow(txt)}>{row}</span>,
                                        <br key={`br{j}`}/>]
                                        ))}
                                </div>
                        </Gesture>
                    </div>
                <div className="axisY" style={{opacity: this.state.snapH ? 1 : 0}}></div>
                <div className="axisX" style={{opacity: this.state.snapV ? 1 : 0}}></div>
                <div className={`trash ${this.state.dragging ? 'dragging' : ''} ${this.state.intrash ? 'intrash' : ''} ${this.state.deleted ? 'deleted' : ''}`}>
                    <FA icon="trash-alt" />
                </div>
            </div>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableText);

