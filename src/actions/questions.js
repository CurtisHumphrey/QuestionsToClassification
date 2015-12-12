import { createConstants } from '../utils';
import { QUESTION_ANSWERED } from 'constants/constants';

export const Answer_Types = createConstants(
  'EXPERT',
  'PROFICIENT',
  'FAMILIAR',
  'BEGINNER',
);

export function question_Answered(topic, answer) {
  return {
    type: QUESTION_ANSWERED,
    topic,
    answer
  };
}
