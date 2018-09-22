import React, { Component } from 'react';

class EarthquakesMapSummary extends Component {
  render() {
    const nameList = (
      ( !Array.isArray(this.props.earthquakes) || !this.props.earthquakes.length )
      ? null
      : this.props.earthquakes.map( obj => {
        let queryStr = Object.keys(obj)[0];
        let eqArr = obj[queryStr];
        return (
          <div key={queryStr} className="App-content-small">
            <span style={{fontWeight:'bold'}}>{ queryStr }:&nbsp;&nbsp;</span>
            { eqArr.map(eq => Object.keys(eq)[0]).join(', ')}
          </div>
        );
      })
    );

    return (
      <div>
        { !!nameList && <div className="App-summary-subtitle">Earthquakes</div> }
        { nameList }
      </div>
    );
  }
}

export default EarthquakesMapSummary;
