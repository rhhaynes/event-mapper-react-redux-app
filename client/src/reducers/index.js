import { combineReducers } from 'redux';
import earthquakes from './earthquakesReducer';
import hurricanes from './hurricanesReducer';
import volcanoes from './volcanoesReducer';

export default combineReducers({
  earthquakes,
  hurricanes,
  volcanoes
});
