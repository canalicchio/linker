import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import Icon from './Icon';
//import Fa from '@fortawesome/react-fontawesome';


const MenuTop = (props) => (
    (
      <View className={`toggle ${props.active ? 'active' : ''}`} onClick={props.onClick}>
          <Icon name={props.name} />
      </View>
    )
)

export default MenuTop;


