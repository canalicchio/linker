import React from 'react';
// import Slider from "react-slick";
import { Text, View, Button, TouchableOpacity } from 'react-native';
// import './slider.scss';
import Carousel from './Carousel';

export const ColorPick = ({onSelect, color, style}) => {
    console.log(style);
    return (
        <TouchableOpacity className="color-pick" color={color}
            style={[
                style,
                {backgroundColor: color},
            ]}
            onPress={() => {onSelect(color)}}>

            <View />
        </TouchableOpacity>
    );
}

export const colorPalette = ({ selectColor, containerStyle={}, colorPickStyle={}}) => {
    return (
        [
            <View key="page1" style={containerStyle}>
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#fff" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#000" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#3897f1" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#70c04f" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#feca5a" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#fc8d31" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ee4957" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#d00669" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#a305ba" />
            </View>,
            <View key="page2" style={containerStyle}>
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ed0012" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ed858e" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ffd3d4" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ffdcb4" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#ffc482" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#d29046" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#99643a" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#422223" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#1b4a28" />
            </View>,
            <View key="page3" style={containerStyle}>
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#262626" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#363636" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#555555" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#737373" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#999999" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#b2b2b2" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#c7c7c7" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#dbdbdb" />
                <ColorPick onSelect={selectColor} style={colorPickStyle} color="#efefef" />
            </View>,
        ]
    );
}
const ColorPicker = (props) => {
    var settings = {
        dots: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let palette = colorPalette({
        selectColor: props.onSelectColor,
        containerStyle: props.containerStyle,
        colorPickStyle: props.colorPickStyle,
    });
    return (
        <View className="color-picker">
            {palette}
        </View>
    );
}
export default ColorPicker;
