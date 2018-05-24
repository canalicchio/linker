import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    Toggle: {
        marginHorizontal: 5,
        zIndex: 5
    }
});

const Toggle = ({active, onClick, name, color, iconStyle, size=30}) => (
    (
      <TouchableOpacity className={`toggle ${active ? 'active' : ''}`} onPress={onClick} style={styles.Toggle}>
          <Icon name={name} size={size} color={color} style={iconStyle} />
      </TouchableOpacity>
    )
)

export default Toggle;

