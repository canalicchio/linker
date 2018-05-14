import React, { Component } from 'react';
import FA from '@fortawesome/react-fontawesome';

class Toggle extends Component {
  render() {
    return (
      <span className={`toggle ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <FA icon={this.props.name} size="lg" />
      </span>
    );
  }
}

export default Toggle;
