import { createReducer }     from '../utils';
import { QUESTION_ANSWERED } from 'constants/constants';
import { Answer_Types }      from 'actions/questions';
import _ from 'lodash';

export const INITIAL_STATE = {};
// make arrays for each answer key to story the answers questions
_.forEach(Answer_Types, (value, key) => {
  INITIAL_STATE[key] = [];
});

/**
 * action is {
 *  topic: {
 *    text:
 *    max:
 *  }
    answer: an Answer_Types
 }
 * }
 */
function add_Answers(state, action) {
  const next_state = Object.assign({}, state);
  const type = action.answer;
  next_state[type] = [
    ...next_state[type],
    action.topic
  ];

  return next_state;
}

export default createReducer(INITIAL_STATE, {
  [QUESTION_ANSWERED] : add_Answers
});
