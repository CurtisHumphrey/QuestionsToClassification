import reducer, {INITIAL_STATE} from 'reducers/questions';
import * as action from 'actions/questions';

describe.only('reducers of questions', function() {
  let desired_result;
  let topic;
  let state;

  beforeEach(() => {
    topic = {
      text: 'A topic',
      max: 'expert'
    };
  });

  it('should return the initial state', function() {
    expect(
      reducer(undefined, {})
    ).to.eql(INITIAL_STATE);
  });

  it('should add an entry to EXPERT when the answer is expert', () => {
    const EXPERT = action.Answer_Types.EXPERT;
    desired_result = [topic];

    state = reducer(undefined, action.question_Answered(topic, EXPERT));
    expect(state[EXPERT]).to.eql(desired_result);
  });

  it('should add to entries to PROFICIENT when the answers are PROFICIENT', () => {
    const PROFICIENT = action.Answer_Types.PROFICIENT;
    desired_result = [topic, topic];

    state = reducer(undefined, action.question_Answered(topic, PROFICIENT));
    state = reducer(state, action.question_Answered(topic, PROFICIENT));
    expect(state[PROFICIENT]).to.eql(desired_result);
  });

  it('should remove the first question on the topic list', function() {
    const EXPERT = action.Answer_Types.EXPERT;
    topic = INITIAL_STATE.topics[0];

    state = reducer(undefined, action.question_Answered(topic, EXPERT));
    expect(state.topics.length + 1).to.eql(INITIAL_STATE.topics.length); // one less
  });

  it('should have queued the next topic on the list', () => {
    const EXPERT = action.Answer_Types.EXPERT;
    topic = INITIAL_STATE.topics[0];
    const next_topic = INITIAL_STATE.topics[1];

    state = reducer(undefined, action.question_Answered(topic, EXPERT));
    expect(state.topics[0]).to.eql(next_topic);
  });

});
