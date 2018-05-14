import React, { Component } from 'react';
import FA from '@fortawesome/react-fontawesome';

const Toggle = (props) => {
    return (
      <span className={`toggle ${props.active ? 'active' : ''}`} onClick={props.onClick}>
        <FA icon={props.name} size="lg" />
      </span>
    );
}

export default Toggle;

