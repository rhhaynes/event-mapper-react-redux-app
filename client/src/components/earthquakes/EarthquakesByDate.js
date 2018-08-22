import React, { Component } from 'react';

class EarthquakesByDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [
        {'all_hour':  false},
        {'4.5_day':   false}, {'significant_day':   false},
        {'4.5_week':  false}, {'significant_week':  false},
        {'4.5_month': false}, {'significant_month': false}
      ],
      query: {
        'all_hour':  'Past Hour — All',
        '4.5_day':   'Past Day — Magnitude 4.5+',   'significant_day':   'Past Day — Significant',
        '4.5_week':  'Past Week — Magnitude 4.5+',  'significant_week':  'Past Week — Significant',
        '4.5_month': 'Past Month — Magnitude 4.5+', 'significant_month': 'Past Month — Significant'
      }
    };

    this.props.checked.forEach( queryStr => {
      const idx = this.state.checked.findIndex(obj => Object.keys(obj)[0] === queryStr);
      this.state.checked[idx][queryStr] = true;
    });
  }

  handleOnChange(event) {
    const queryStr = event.target.name;
    const idx     = this.state.checked.findIndex(obj => Object.keys(obj)[0] === queryStr);
    const checked = this.state.checked[idx][queryStr];
    ( checked ? this.props.removeEarthquakes(queryStr) : this.props.addEarthquakes(queryStr) );
    this.setState({
      ...this.state,
      checked: [...this.state.checked.slice(0, idx), {[queryStr]: !checked}, ...this.state.checked.slice(idx+1)],
    });
  }

  exposeCheckboxes() {
    const btn = document.getElementById("selection-button");
    const arw = document.getElementById("arrow");
    btn.parentNode.classList.toggle("closed");
    arw.classList.toggle("down");
  }

  render() {
    const queryList = this.state.checked.map( (obj, idx) => {
      let name    = Object.keys(obj)[0];
      let checked = obj[name];
      return (
        <label key={idx} style={{paddingLeft:'50px'}}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={event => this.handleOnChange(event)}
          />
          { this.state.query[name] }<br />
        </label>
      );
    });

    return (
      <div className="App-medium">

        <div className="drop-down closed" style={{textAlign:'left'}}>
          <div id="selection-button" onClick={() => this.exposeCheckboxes()}>
            <span>Select earthquakes to view</span>
            <span className="arrow-container"><i id="arrow" className="down"></i></span>
          </div>
          <br /><br />{ queryList }
        </div>

      </div>
    );
  }
}

export default EarthquakesByDate;
