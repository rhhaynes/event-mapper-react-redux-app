import React, { Component } from 'react';

class Hurricane extends Component {
  render() {
    return (
      <label>
        &nbsp;&nbsp;
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={() => this.props.toggleHurricanes(this.props.year, this.props.name)}
        />
        { this.props.name }
      </label>
    );
  }
}

export default Hurricane;
