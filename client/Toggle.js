import React, { Component } from 'react';
import FA from 'react-fontawesome';

class Toggle extends Component {
  render() {
    return (
      <span className={`toggle ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <FA name={this.props.name} />
      </span>
    );
  }
}

export default Toggle;
