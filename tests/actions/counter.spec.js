import actions from 'actions/counter';
import types from 'constants/counter';

describe('actions of counter', () => {
  it('should create an action of increment', () => {
    const expected = {
      type: types.COUNTER_INCREMENT
    };
    expect(actions.increment()).to.eql(expected);
  });

  it('should create an action of chart', () => {
    const expected = {
      type: types.CHART_INCREMENT
    };

    expect(actions.chart()).to.eql(expected);
  });
});
