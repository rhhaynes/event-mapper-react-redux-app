import React, { Component } from 'react';
import Hurricane from './Hurricane';

class HurricanesByName extends Component {
  render() {
    const nameList = (
      ( !Array.isArray(Object.keys(this.props.hurricanes)) || !Object.keys(this.props.hurricanes).length )
      ? null
      : Object.keys(this.props.hurricanes).map( yearStr => (
          <div key={yearStr} className="App-content-small">
            <span
              className="toggleHurricanes" style={{textDecoration:'underline'}}
              onClick={event => this.props.toggleHurricanesByYear(yearStr)}
            >{ yearStr }</span>
            { Object.keys(this.props.hurricanes[yearStr]).map( regionStr => (
              <div key={regionStr+yearStr} className="App-content-small">
                <span
                  className="toggleHurricanes"
                  onClick={event => this.props.toggleHurricanesByRegion(yearStr, regionStr)}
                >{ regionStr.toUpperCase() }:</span>
                { Object.keys(this.props.hurricanes[yearStr][regionStr]).map( nameStr => (
                  <Hurricane
                    key={regionStr+yearStr+nameStr}
                    year={yearStr}
                    region={regionStr}
                    name={nameStr}
                    checked={this.props.hurricanes[yearStr][regionStr][nameStr].status}
                    toggleHurricanesByName={this.props.toggleHurricanesByName}
                  />
                ))}
              </div>
            ))}
          </div>
        ))
    );

    return (
      <div>
        { !!nameList && <div className="App-summary-subtitle">Hurricanes</div> }
        { !!nameList &&
          <div className="App-content-small">
            <label>
              <input
                style={{marginLeft:0}}
                type="checkbox"
                checked={this.props.statusSM}
                onChange={() => this.props.toggleSpaghettiModels()}
              />Spaghetti Models
            </label>
          </div>
        }
        { nameList }
      </div>
    );
  }
}

export default HurricanesByName;
