import configureStore  from 'store/configureStore';

describe('Store', function() {
  it('Should have a getState function', function() {
    const store = configureStore({});

    configureStore({}, true); // lame way of testing debug branch
    // TODO rewire DevTools.instrument to make sure it was called

    expect(store.getState).to.be.a('function');
  });
});