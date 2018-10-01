import { combineReducers } from 'redux';
import mapOptions from './mapsReducer';
import earthquakes from './earthquakesReducer';
import hurricanes from './hurricanesReducer';
import locations from './locationsReducer';
import volcanoes from './volcanoesReducer';

export default combineReducers({
  mapOptions,
  earthquakes,
  hurricanes,
  locations,
  volcanoes
});
