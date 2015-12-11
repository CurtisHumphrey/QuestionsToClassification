import React                  from 'react';
import ReactDOM               from 'react-dom';
import TestUtils              from 'react-addons-test-utils';
import ChartjsPolarArea       from 'components/ChartjsPolarArea';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (componentObject, props = {}) {
  const cp = React.createElement(componentObject, props);
  return TestUtils.renderIntoDocument(cp);
}

function shallowRenderWithProps (componentObject, props = {}) {
  const cp = React.createElement(componentObject, props);
  return shallowRender(cp);
}

describe('ChartjsPolarArea Component', function() {
  let rendered;
  let component;
  const _spies = {};

  beforeEach(function() {
    component = shallowRenderWithProps(ChartjsPolarArea);
    rendered = renderWithProps(ChartjsPolarArea);
  });

  it('Should include a <canvas> element', function() {
    const canvas = TestUtils.findRenderedDOMComponentWithTag(rendered, 'canvas');

    expect(canvas).to.exist;
  });

  it('Upon unmounting it should destory the chart', function() {
    _spies.chart_destroy = sinon.spy();
    rendered.state.chart.destroy = _spies.chart_destroy;

    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(rendered).parentNode);

    expect(_spies.chart_destroy.called);
  });
});
