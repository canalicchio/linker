import React, { Component } from 'react';
import PropTypes from "prop-types";

import { Text, View, Image} from 'react-native';

import fontawesome from '@fortawesome/fontawesome';
//
//import Fa from '@fortawesome/react-fontawesome';


const Icon = ({ name, size, color, type, containerStyle, iconStyle, onPress }) => {
    const prefix = 'fas';
    const icon = fontawesome.findIconDefinition( { prefix, iconName: name } );
    const iconData = icon.icon;
    const path = iconData[4];
    const viewBox = [ 0, 0, iconData[0], iconData[1] ].join( " " );
    const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path d="${path}" fill="${color}" /></svg>`;
    const source = {
        uri: `data:image/svg+xml;utf8,${svgImage}`,
        width: size,
        height: size
    };
    containerStyle.resizeMode = 'contain';
    return (
        <Image source={source} style={containerStyle} />
    );
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
  iconStyle: PropTypes.oneOfType( [
    PropTypes.object,
    PropTypes.number
  ] ),
  containerStyle: PropTypes.oneOfType( [
    PropTypes.object,
    PropTypes.number
  ] )
};

Icon.defaultProps = {
  name: "",
  size: 20,
  color: "black",
  type: "regular",
  containerStyle: {},
  iconStyle: {},
  onPress: null
};

export default Icon;
