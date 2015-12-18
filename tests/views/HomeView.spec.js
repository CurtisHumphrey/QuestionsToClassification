import React                  from 'react';
import ReactDOM               from 'react-dom';
import { bindActionCreators } from 'redux';
import { question_Answered }  from 'actions/questions';
import TestUtils              from 'react-testutils-additions';
import { HomeView }           from 'views/HomeView';
import DATA                   from 'data/questions';
import _                      from 'lodash';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />);
}

function updateableRender(props, node) {
  return ReactDOM.render(<HomeView {...props} />, node);
}

describe('(View) Home', function () {
  let props;
  let rendered;
  let sandbox;

  beforeEach(function () {
    props = _.cloneDeep(DATA);

    sandbox = sinon.sandbox.create();

    sandbox.stub(console, 'error', (message) => {
      throw new Error(message);
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Should render correctly with good props', function() {
    rendered = renderWithProps(props);
    // with throw errors if there are issues
  });

  it('when button for instrustions is click it should display questions', function() {
    rendered = renderWithProps(props);
    let asker = TestUtils.find(rendered, '.question-block');
    expect(asker.length).to.eql(0);

    const read = TestUtils.find(rendered, '#Instructions-Read')[0];
    expect(read).to.exist;
    TestUtils.Simulate.click(read);

    asker = TestUtils.find(rendered, '.question-block');
    expect(asker.length).to.eql(1);
  });

  it('Progress should not render if under 20%', function() {
    props.topics = props.topics.slice(0, 4);
    rendered = renderWithProps(props);

    const read = TestUtils.find(rendered, '#Instructions-Read')[0];
    expect(read).to.exist;
    TestUtils.Simulate.click(read);

    const progress = TestUtils.find(rendered, '.progress-block .progress')[0];
    expect(progress).to.not.exist;
  });


  it('Progress should render if over 20%', function() {
    const node = document.createElement('div');

    props.topics = props.topics.slice(0, 4);
    rendered = updateableRender(props, node);

    const read = TestUtils.find(rendered, '#Instructions-Read')[0];
    expect(read).to.exist;
    TestUtils.Simulate.click(read);

    props.topics.pop();
    rendered = updateableRender(props, node);

    const progress = TestUtils.find(rendered, '.progress-block .progress')[0];
    expect(progress).to.exist;
  });

  it('Progress should render if over 80%', function() {
    const node = document.createElement('div');

    props.topics = props.topics.slice(0, 6);
    rendered = updateableRender(props, node);

    const read = TestUtils.find(rendered, '#Instructions-Read')[0];
    expect(read).to.exist;
    TestUtils.Simulate.click(read);

    props.topics = props.topics.slice(0, 1);
    rendered = updateableRender(props, node);

    const progress = TestUtils.find(rendered, '.progress-block .progress')[0];
    expect(progress).to.exist;
  });

  it('when all questions are answered it should display the results', function() {
    props.answers = {
      'expert': [props.topics[0]]
    };
    props.topics = [];
    rendered = renderWithProps(props);

    const results = TestUtils.find(rendered, '#Results')[0];
    expect(results).to.exist;
  });
});
