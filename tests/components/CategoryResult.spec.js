// import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { renderWithProps }    from '../helpers';
import CategoryResult         from 'components/CategoryResult';
import { Answer_Types }       from 'actions/questions';
import _ from 'lodash';

describe.only('CategoryResult Component', function() {
  let rendered;
  let sandbox;
  let props;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(console, 'error', (message) => {
      throw new Error(message);
    });

    props = {
      topic: {
        text: 'A Topic'
      },
      possibleAnswers: _.map(Answer_Types, type => {
        return {
          text: type,
          action: sandbox.spy()
        };
      })
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('sub functions', () => {
    let levels;
    beforeEach(function() {
      levels = ['beginner', 'familiar', 'proficient', 'expert'];
    });

    it('levelToRank should return 2 for proficient', function() {
      expect(CategoryResult.levelToRank('proficient', levels)).to.be.eql(2);
    });

    it('computeAllowCategory should return answer if below max', function() {
      const topic = {
        title: 'A title',
        max: 'proficient'
      };
      expect(CategoryResult.computeAllowedCategory(topic, 'familiar', levels))
        .to.be.eql('familiar');
    });

    it('computeAllowCategory should return max if above max', function() {
      const topic = {
        title: 'A title',
        max: 'proficient'
      };
      expect(CategoryResult.computeAllowedCategory(topic, 'expert', levels))
        .to.be.eql('proficient');
    });
  });

  xit('Should include a class="question" element with matching text', function() {
    rendered = renderWithProps(CategoryResult, props);

    const node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'question');
    expect(node.textContent).to.contain(props.topic.text);
  });

  xit('Should have an li element for each answer type', function() {
    rendered = renderWithProps(CategoryResult, props);

    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');
    expect(nodes.length).to.eql(_.size(Answer_Types));
  });

  xit('Should call the correct action when the answer is clicked', function() {
    rendered = renderWithProps(CategoryResult, props);
    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');

    const not_Called = (value) => {
      expect(value.action.called).to.be.false;
    };

    props.possibleAnswers.forEach(not_Called);

    TestUtils.Simulate.click(nodes[0]);
    expect(props.possibleAnswers[0].action.called).to.be.true;
    props.possibleAnswers.slice(1).forEach(not_Called);
  });

  xit('should call with the topic passed as an argument', function() {
    rendered = renderWithProps(CategoryResult, props);
    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');

    TestUtils.Simulate.click(nodes[0]);

    expect(props.possibleAnswers[0].action.calledWith(props.topic)).to.be.true;
  });
});
