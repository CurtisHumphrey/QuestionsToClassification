import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';

export function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

export function renderWithProps (componentObject, props = {}) {
  const cp = React.createElement(componentObject, props);
  return TestUtils.renderIntoDocument(cp);
}

export function shallowRenderWithProps (componentObject, props = {}) {
  const cp = React.createElement(componentObject, props);
  return shallowRender(cp);
}
