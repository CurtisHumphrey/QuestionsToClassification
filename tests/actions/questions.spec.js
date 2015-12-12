import * as actions from 'actions/questions';
import types from 'constants/constants';

describe('actions of questions', () => {
  it('should create an action of add answer', () => {
    const desired_result = {
      type: types.QUESTION_ANSWERED,
      topic: {
        text: 'A topic',
        max: 'max category'
      },
      answer: 'category'
    };

    const result = actions.question_Answered({
      text: 'A topic',
      max: 'max category'
    }, 'category');

    expect(result).to.eql(desired_result);
  });
});
