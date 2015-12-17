// import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { renderWithProps }    from '../helpers';
import QuestionAsker      from 'components/QuestionAsker';
import { Answer_Types }  from 'actions/questions';
import _ from 'lodash';

describe('QuestionAsker Component', function() {
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

  it('Should include a class="question" element with matching text', function() {
    rendered = renderWithProps(QuestionAsker, props);

    const node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'question');
    expect(node.textContent).to.contain(props.topic.text);
  });

  it('Should have an li element for each answer type', function() {
    rendered = renderWithProps(QuestionAsker, props);

    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');
    expect(nodes.length).to.eql(_.size(Answer_Types));
  });

  it('Should call the correct action when the answer is clicked', function() {
    rendered = renderWithProps(QuestionAsker, props);
    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');

    const not_Called = (value) => {
      expect(value.action.called).to.be.false;
    };

    props.possibleAnswers.forEach(not_Called);

    TestUtils.Simulate.click(nodes[0]);
    expect(props.possibleAnswers[0].action.called).to.be.true;
    props.possibleAnswers.slice(1).forEach(not_Called);
  });

  it('should call with the topic passed as an argument', function() {
    rendered = renderWithProps(QuestionAsker, props);
    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');

    TestUtils.Simulate.click(nodes[0]);

    expect(props.possibleAnswers[0].action.calledWith(props.topic)).to.be.true;
  });

  it('should not render any answer if there are no more questions', function() {
    props.topic = {};
    rendered = renderWithProps(QuestionAsker, props);

    const nodes = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'answer');
    expect(nodes.length).to.eql(0);
  });
});
