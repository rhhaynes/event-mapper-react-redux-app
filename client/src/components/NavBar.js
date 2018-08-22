import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="App-title">

        <NavLink
          exact to="/"
          activeClassName="activeRoute"
        >Home</NavLink>

        &nbsp; &nbsp; &nbsp;

        <NavLink
          exact to="/earthquakes"
          activeClassName="activeRoute"
        >Earthquakes</NavLink>

        &nbsp; &nbsp; &nbsp;

        <NavLink
          exact to="/hurricanes"
          activeClassName="activeRoute"
        >Hurricanes</NavLink>

        &nbsp; &nbsp; &nbsp;

        <NavLink
          exact to="/volcanoes"
          activeClassName="activeRoute"
        >Volcanoes</NavLink>

      </div>
    );
  }
}

export default NavBar;
