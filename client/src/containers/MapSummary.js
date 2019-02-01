import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHurricanesByYear, toggleHurricanesByRegion, toggleHurricanesByName } from '../actions/hurricaneActions';
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
          toggleHurricanesByYear={this.props.toggleHurricanesByYear}
          toggleHurricanesByRegion={this.props.toggleHurricanesByRegion}
          toggleHurricanesByName={this.props.toggleHurricanesByName}
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
  { toggleHurricanesByYear, toggleHurricanesByRegion, toggleHurricanesByName, toggleSpaghettiModels }
)(MapSummary);
