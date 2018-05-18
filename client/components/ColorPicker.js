import React from 'react';
import Slider from "react-slick";
import './slider.scss';


export const ColorPick = (props) => {
    return (
        <span className="color-pick" style={{backgroundColor: props.color}} onClick={() => {props.onSelect(props.color)}} />
    );
}

export const colorPalette = (selectColor) => {
    return (
        [
        <div key="page1">
            <ColorPick onSelect={selectColor} color="#fff" />
            <ColorPick onSelect={selectColor} color="#000" />
            <ColorPick onSelect={selectColor} color="#3897f1" />
            <ColorPick onSelect={selectColor} color="#70c04f" />
            <ColorPick onSelect={selectColor} color="#feca5a" />
            <ColorPick onSelect={selectColor} color="#fc8d31" />
            <ColorPick onSelect={selectColor} color="#ee4957" />
            <ColorPick onSelect={selectColor} color="#d00669" />
            <ColorPick onSelect={selectColor} color="#a305ba" />
        </div>,
        <div key="page2">
            <ColorPick onSelect={selectColor} color="#ed0012" />
            <ColorPick onSelect={selectColor} color="#ed858e" />
            <ColorPick onSelect={selectColor} color="#ffd3d4" />
            <ColorPick onSelect={selectColor} color="#ffdcb4" />
            <ColorPick onSelect={selectColor} color="#ffc482" />
            <ColorPick onSelect={selectColor} color="#d29046" />
            <ColorPick onSelect={selectColor} color="#99643a" />
            <ColorPick onSelect={selectColor} color="#422223" />
            <ColorPick onSelect={selectColor} color="#1b4a28" />
        </div>,
        <div key="page3">
            <ColorPick onSelect={selectColor} color="#262626" />
            <ColorPick onSelect={selectColor} color="#363636" />
            <ColorPick onSelect={selectColor} color="#555555" />
            <ColorPick onSelect={selectColor} color="#737373" />
            <ColorPick onSelect={selectColor} color="#999999" />
            <ColorPick onSelect={selectColor} color="#b2b2b2" />
            <ColorPick onSelect={selectColor} color="#c7c7c7" />
            <ColorPick onSelect={selectColor} color="#dbdbdb" />
            <ColorPick onSelect={selectColor} color="#efefef" />
        </div>,
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
    let palette = colorPalette(props.onSelectColor);
    return (
        <div className="color-picker">
            <Slider {...settings}>
                {palette}
            </Slider>
        </div>
    );
}
export default ColorPicker;
