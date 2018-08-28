import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearMapContainer from './ClearMapContainer';
import { addVolcanoes, removeVolcanoes } from '../actions/volcanoActions';
import VolcanoesByFirstLetter from '../components/volcanoes/VolcanoesByFirstLetter';

class VolcanoesContainer extends Component {
  render() {
    return (
      <div>

        <VolcanoesByFirstLetter
          checked={this.props.volcanoes.map(obj => Object.keys(obj)[0])}
          addVolcanoes={this.props.addVolcanoes}
          removeVolcanoes={this.props.removeVolcanoes}
        />

        <ClearMapContainer />

      </div>
    );
  }
}

export default connect(
  state => ({ volcanoes: state.volcanoes }),
  { addVolcanoes, removeVolcanoes }
)(VolcanoesContainer);
