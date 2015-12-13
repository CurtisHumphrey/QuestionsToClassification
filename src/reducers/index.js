import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';
import questions              from './questions';
// import counter                from './counter';
// import chart                  from './chart';


export default combineReducers({
  questions,
  routing: routeReducer
});
