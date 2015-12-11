import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import CoreLayout from 'layouts/CoreLayout';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<CoreLayout {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<CoreLayout {...props} />);
}

describe('(Layout) Core', function () {
  let _component, _rendered, _props, _child;
  let sandbox;

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>;
    _props = {
      children : _child
    };

    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error').throws();
  });
  afterEach(function() {
    sandbox.restore();
  });

  it('Should render as a <div>.', function () {
    _component = shallowRenderWithProps(_props);

    expect(_component.type).to.equal('div');
  });

  it('Should render a child component.', function () {
    _rendered  = renderWithProps(_props);

    const child = TestUtils.findRenderedDOMComponentWithClass(
      _rendered, 'child'
    );

    expect(child).to.exist;
  });
});
