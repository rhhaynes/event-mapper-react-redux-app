import React, { Component } from 'react';

class VolcanoesMapSummary extends Component {
  render() {
    const nameList = (
      ( !Array.isArray(this.props.volcanoes) || !this.props.volcanoes.length )
      ? null
      : this.props.volcanoes.map( obj => {
        let charStr = Object.keys(obj)[0];
        let volArr = obj[charStr];
        return (
          <div key={charStr} className="App-content-small">
            <span style={{fontWeight:'bold'}}>{ charStr } ({ volArr.length }):&nbsp;&nbsp;</span>
            { volArr.map(vol => Object.keys(vol)[0]).join('; ')}
          </div>
        );
      })
    );

    return (
      <div>
        { !!nameList && <div className="App-summary-subtitle">Volcanoes</div> }
        { nameList }
      </div>
    );
  }
}

export default VolcanoesMapSummary;
