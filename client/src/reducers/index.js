import { combineReducers } from 'redux';
import earthquakes from './earthquakesReducer';
import hurricanes from './hurricanesReducer';
import locations from './locationsReducer';
import volcanoes from './volcanoesReducer';

export default combineReducers({
  earthquakes,
  hurricanes,
  locations,
  volcanoes
});
