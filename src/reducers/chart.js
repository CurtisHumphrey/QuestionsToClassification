import { createReducer }     from '../utils';
import { CHART_INCREMENT } from 'constants/counter';

const initialState = 0;
export default createReducer(initialState, {
  [CHART_INCREMENT] : (state) => state + 10
});
