import React, { Component } from 'react';

class LocationsByName extends Component {
  exposeCheckboxes() {
    const btn = document.getElementById("selection-button");
    const arw = document.getElementById("arrow");
    btn.parentNode.classList.toggle("closed");
    arw.classList.toggle("down");
  }

  render() {
    const nameList = this.props.locations.map( (obj, idx) => (
      <label key={idx} style={{paddingLeft:'50px'}}>
        <input
          type="checkbox"
          name={obj.name}
          checked={obj.status}
          onChange={() => this.props.toggleLocations(obj.name)}
        />
        { obj.name }<br />
      </label>
    ));

    return (
      <div className="drop-down closed">
        <div id="selection-button" onClick={() => this.exposeCheckboxes()}>
          <span>Select locations to view</span>
          <span className="arrow-container"><i id="arrow" className="down"></i></span>
        </div>
        <br /><br />{ nameList }
      </div>
    );
  }
}

export default LocationsByName;
