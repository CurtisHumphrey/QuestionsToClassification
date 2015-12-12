import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';
// import counter                from './counter';
// import chart                  from './chart';


export default combineReducers({
  // counter,
  // chart,
  routing: routeReducer
});
