import { createReducer }     from '../utils';
import { QUESTION_ANSWERED } from 'constants/constants';
import { Answer_Types }      from 'actions/questions';
import DATA                  from 'data/questions';

import _ from 'lodash';

export const INITIAL_STATE = {};
// make arrays for each answer key to story the answereds questions
_.forEach(Answer_Types, (value, key) => {
  INITIAL_STATE[key] = [];
});
// load question data for use
Object.assign(INITIAL_STATE, DATA);

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

function next_Question(state) {
  const next_state = Object.assign({}, state);
  next_state.topics = next_state.topics.slice(1);

  return next_state;
}

function answer_Question(state, action) {
  return next_Question(add_Answers(state, action), action);
}

export default createReducer(INITIAL_STATE, {
  [QUESTION_ANSWERED] : answer_Question
});
