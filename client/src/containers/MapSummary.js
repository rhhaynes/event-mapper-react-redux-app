import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAllHurricanes, toggleHurricanes } from '../actions/hurricaneActions';
import { toggleSpaghettiModels } from '../actions/mapActions';
import EarthquakesMapSummary from '../components/earthquakes/EarthquakesMapSummary';
import HurricanesByName from '../components/hurricanes/HurricanesByName';
import VolcanoesMapSummary from '../components/volcanoes/VolcanoesMapSummary';

class MapSummary extends Component {
  render() {
    return (
      <div className="App-summary-container">

        <div className="App-summary-title">
          Map Summary
        </div>

        <EarthquakesMapSummary
          earthquakes={this.props.earthquakes}
        />

        <HurricanesByName
          statusSM={this.props.mapOptions.status.spaghettiModels}
          hurricanes={this.props.hurricanes}
          toggleAllHurricanes={this.props.toggleAllHurricanes}
          toggleHurricanes={this.props.toggleHurricanes}
          toggleSpaghettiModels={this.props.toggleSpaghettiModels}
        />

        <VolcanoesMapSummary
          volcanoes={this.props.volcanoes}
        />

      </div>
    );
  }
}

export default connect(
  state => ({
    mapOptions: state.mapOptions,
    earthquakes: state.earthquakes,
    hurricanes: state.hurricanes,
    volcanoes: state.volcanoes
  }),
  { toggleAllHurricanes, toggleHurricanes, toggleSpaghettiModels }
)(MapSummary);
