import React, { Component } from 'react';

class HurricanesByYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: Array.from( {length: 2018-1995}, (v,i) => i+1995 ).map( year => ({[year]: false}) )
    };

    this.props.checked.forEach( yearStr => {
      const idx = this.state.checked.findIndex(obj => Object.keys(obj)[0] === yearStr);
      this.state.checked[idx][yearStr] = true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.checked.length) {
      this.setState({
        checked: Array.from( {length: 2018-1995}, (v,i) => i+1995 ).map( year => ({[year]: false}) )
      });
    }
  }

  handleOnChange(event) {
    const yearStr = event.target.name;
    const idx     = this.state.checked.findIndex(obj => Object.keys(obj)[0] === yearStr);
    const checked = this.state.checked[idx][yearStr];
    ( checked ? this.props.removeHurricanes(yearStr) : this.props.addHurricanes(yearStr) );
    this.setState({
      checked: [...this.state.checked.slice(0, idx), {[yearStr]: !checked}, ...this.state.checked.slice(idx+1)]
    });
  }

  exposeCheckboxes() {
    const btn = document.getElementById("selection-button");
    const arw = document.getElementById("arrow");
    btn.parentNode.classList.toggle("closed");
    arw.classList.toggle("down");
  }

  render() {
    const yearList = this.state.checked.map( (obj, idx) => {
      let name    = Object.keys(obj)[0];
      let checked = obj[name];
      return (
        <label key={idx}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={event => this.handleOnChange(event)}
          />
          { name }<br />
        </label>
      );
    }).reverse();

    return (
      <div className="App-medium">

          <div className="drop-down closed">
            <div id="selection-button" onClick={() => this.exposeCheckboxes()}>
              <span>Select hurricanes to view</span>
              <span className="arrow-container"><i id="arrow" className="down"></i></span>
            </div>
            <br /><br />{ yearList }
          </div>

      </div>
    );
  }
}

export default HurricanesByYear;
