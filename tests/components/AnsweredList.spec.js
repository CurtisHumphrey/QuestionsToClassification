// import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { renderWithProps }    from '../helpers';
import AnsweredList           from 'components/AnsweredList';
import DATA                   from 'data/questions';

describe('AnsweredList Component', function() {
  let rendered;
  let sandbox;
  let props;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(console, 'error', (message) => {
      throw new Error(message);
    });

    props = {
      title: 'A Title'
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Should include a <ul> element', function() {
    rendered = renderWithProps(AnsweredList, props);

    const node = TestUtils.findRenderedDOMComponentWithTag(rendered, 'ul');
    expect(node).to.exist;
  });

  it('Should include a class="title" element with matching text', function() {
    rendered = renderWithProps(AnsweredList, props);

    const node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'title');
    expect(node.textContent).to.eql(props.title);
  });

  it('Should have an li element with matching texting', function() {
    props.list = DATA.topics.slice(0, 1);
    rendered = renderWithProps(AnsweredList, props);

    const node = TestUtils.findRenderedDOMComponentWithTag(rendered, 'li');
    expect(node.textContent).to.eql(DATA.topics[0].text);
  });

  it('Should have 2 li elements when two list elements are given', function() {
    props.list = DATA.topics.slice(0, 2);
    rendered = renderWithProps(AnsweredList, props);

    const nodes = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li');
    expect(nodes.length).to.eql(2);
  });
});
