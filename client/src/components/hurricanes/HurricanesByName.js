import React, { Component } from 'react';
import Hurricane from './Hurricane';

class HurricanesByName extends Component {
  render() {
    const nameList = (
      ( !Array.isArray(this.props.hurricanes) || !this.props.hurricanes.length )
      ? null
      : this.props.hurricanes.map( obj => {
        let yearStr = Object.keys(obj)[0];
        let hurrArr = obj[yearStr];
        return (
          <div key={yearStr} className="App-content-small">
            <span
              className="toggleAllHurricanes"
              onClick={event => this.props.toggleAllHurricanes(yearStr)}
            >{ yearStr }:</span>
            { hurrArr.map( hurr => {
              let nameStr = Object.keys(hurr)[0];
              let checked = hurr[nameStr].status;
              return (
                <Hurricane
                  key={yearStr+nameStr}
                  year={yearStr}
                  name={nameStr}
                  checked={checked}
                  toggleHurricanes={this.props.toggleHurricanes}
                />
              );
            })}
          </div>
        );
      })
    );

    return (
      <div>
        { nameList }
      </div>
    );
  }
}

export default HurricanesByName;
