import reducer, {INITIAL_STATE} from 'reducers/questions';
import * as action from 'actions/questions';

describe.only('reducers of questions', function() {
  let initial_state;
  beforeEach(() => {
    initial_state = Object.assign({}, INITIAL_STATE);
  });

  it('should return the initial state', function() {
    expect(
      reducer(undefined, {})
    ).to.eql(initial_state);
  });

  it('should add an entry to EXPERT when the answer is expert', () => {
    const EXPERT = action.Answer_Types.EXPERT;
    const desired_result = Object.assign({}, initial_state);
    const topic = {
      text: 'A topic',
      max: 'expert'
    };
    desired_result[EXPERT] = [topic];

    expect(
      reducer(undefined, action.question_Answered(topic, EXPERT))
    ).to.eql(desired_result);
  });
  it('should add to entries to PROFICIENT when the answers are PROFICIENT', () => {
    const PROFICIENT = action.Answer_Types.PROFICIENT;
    const desired_result = Object.assign({}, initial_state);
    const topic = {
      text: 'A topic',
      max: 'expert'
    };
    desired_result[PROFICIENT] = [topic, topic];

    let state = reducer(undefined, action.question_Answered(topic, PROFICIENT));
    state = reducer(state, action.question_Answered(topic, PROFICIENT));
    expect(state).to.eql(desired_result);
  });
});