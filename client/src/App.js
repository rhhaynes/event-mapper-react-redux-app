import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import EarthquakesContainer from './containers/EarthquakesContainer';
import HurricanesContainer from './containers/HurricanesContainer';
import VolcanoesContainer from './containers/VolcanoesContainer';
import MapContainer from './containers/MapContainer';
import NavBar from './components/NavBar';
import './stylesheets/App.css';
import './stylesheets/dropdown.css';
import './stylesheets/form.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <header className="App-header">
            <div className="App-container">
              <NavBar />
            </div>
          </header>

          <div className="App-content">
            <div className="App-container">
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/earthquakes" component={EarthquakesContainer} />
              <Route exact path="/hurricanes" component={HurricanesContainer} />
              <Route exact path="/volcanoes" component={VolcanoesContainer} />
              <MapContainer />
            </div>
          </div>

          <footer className="App-footer">
            <div className="App-container">
              <div className="App-small">
                &copy; 2018 EventMapper
              </div>
            </div>
          </footer>

        </div>
      </Router>
    );
  }
}

export default App;
