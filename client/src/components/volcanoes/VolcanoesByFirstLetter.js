import React, { Component } from 'react';

class VolcanoesByFirstLetter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map( char => ({[char]: false}) )
    };

    this.props.checked.forEach( charStr => {
      const idx = this.state.checked.findIndex(obj => Object.keys(obj)[0] === charStr);
      this.state.checked[idx][charStr] = true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.checked.length) {
      this.setState({
        checked: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map( char => ({[char]: false}) )
      });
    }
  }

  handleOnChange(event) {
    const charStr = event.target.name;
    const idx     = this.state.checked.findIndex(obj => Object.keys(obj)[0] === charStr);
    const checked = this.state.checked[idx][charStr];
    ( checked ? this.props.removeVolcanoes(charStr) : this.props.addVolcanoes(charStr) );
    this.setState({
      checked: [...this.state.checked.slice(0, idx), {[charStr]: !checked}, ...this.state.checked.slice(idx+1)]
    });
  }

  exposeCheckboxes() {
    const btn = document.getElementById("selection-button");
    const arw = document.getElementById("arrow");
    btn.parentNode.classList.toggle("closed");
    arw.classList.toggle("down");
  }

  render() {
    const charList = this.state.checked.map( (obj, idx) => {
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
          { name }<br />
        </label>
      );
    });

    return (
      <div className="drop-down closed">
        <div id="selection-button" onClick={() => this.exposeCheckboxes()}>
          <span>Select volcanoes to view</span>
          <span className="arrow-container"><i id="arrow" className="down"></i></span>
        </div>
        <br /><br />{ charList }
      </div>
    );
  }
}

export default VolcanoesByFirstLetter;
