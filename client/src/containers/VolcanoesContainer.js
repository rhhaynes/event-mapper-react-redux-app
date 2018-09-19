import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVolcanoes, removeVolcanoes } from '../actions/volcanoActions';
import VolcanoesByFirstLetter from '../components/volcanoes/VolcanoesByFirstLetter';

class VolcanoesContainer extends Component {
  render() {
    return (
      <div className="App-dropdown-abs-container">

        <div className="form-title">
          Geolocation Options
        </div>

        <VolcanoesByFirstLetter
          checked={this.props.volcanoes.map(obj => Object.keys(obj)[0])}
          addVolcanoes={this.props.addVolcanoes}
          removeVolcanoes={this.props.removeVolcanoes}
        />

      </div>
    );
  }
}

export default connect(
  state => ({ volcanoes: state.volcanoes }),
  { addVolcanoes, removeVolcanoes }
)(VolcanoesContainer);
