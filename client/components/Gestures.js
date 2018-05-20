import React, { Component } from "react";
import {
    View,
    PanResponder,
    TouchableWithoutFeedback,
    Animated
} from "react-native";
import PropTypes from "prop-types";

const distanceBetweenTouches = (
    [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }]
) =>
// Android JS version doesn't support **
// eslint-disable-next-line no-restricted-properties
Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const angleBetweenTouches = (
    [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }]
) => {
    const opposite = y1 - y2;
    const adjacent = x1 - x2;
    const rad = Math.atan2(opposite, adjacent);

    return rad * 180 / Math.PI;
};

class Gestures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomRatio: new Animated.Value(1),
            angle: new Animated.Value(0),
            pan: new Animated.ValueXY(),
        };
    }

    componentWillMount() {
        const animateMapping = Animated.event([{ dx: this.state.pan.x, dy: this.state.pan.y }]);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
                onMoveShouldSetPanResponder: (e, gesture) => true,
                onStartShouldSetPanResponderCapture: (e, gesture) => true,
                onMoveShouldSetPanResponderCapture: (e, gesture) => true,
                onPanResponderStart: evt => {
                this.handlePinchStart(evt);
            },
            onPanResponderMove: ( evt, gesture ) => {
                animateMapping(gesture);
                this.handlePinchChange(evt);
            },
            onPanResponderRelease: () => {
                Animated.parallel([
                    Animated.spring(this.state.zoomRatio, { toValue: 1 }),
                    Animated.spring(this.state.angle, { toValue: 0 }),
                    Animated.spring(this.state.pan, { toValue: 0 }),
                ]).start();
            }
        });
    }

    handlePinchStart({ nativeEvent: { touches } }) {
        if (touches.length < 2) {
            return;
        }
        this.startDistance = distanceBetweenTouches(touches);
        this.startAngle = angleBetweenTouches(touches);
    }

    handlePinchChange(ev) {
        const touches = ev.nativeEvent.touches;

        if (touches.length < 2) {
            return;
        }
        const zoomRatio = distanceBetweenTouches(touches) / this.startDistance;
        const currentAngle = angleBetweenTouches(touches);
        const angle = (currentAngle - this.startAngle) % 360;

        this.state.zoomRatio.setValue(zoomRatio);
        this.state.angle.setValue(angle);
    }

    render() {
        const panTransform = {
            transform: this.state.pan.getTranslateTransform(),
        };
        const transformStyle = {
            transform: [
                { scale: this.state.zoomRatio },
                {
                    rotate: this.state.angle.interpolate({
                        inputRange: [0, 359],
                        outputRange: ["0 deg", "359 deg"]
                    })
                },
                { perspective: 1000 }, // Required to make animations work on Android
            ]
        };

        return (
            <View style={{ flexGrow: 1 }} {...this.panResponder.panHandlers}>
                <TouchableWithoutFeedback>
                    <View {...this.props}>
                        <Animated.View style={panTransform}>
                            <Animated.View style={transformStyle}>
                                {this.props.children}
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            );
  }
}

Gestures.propTypes = {
    children: PropTypes.element.isRequired
};

export default Gestures;