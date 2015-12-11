import React                    from 'react';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import routes                   from '../routes';
import DevTools                 from './DevTools';
import { createDevToolsWindow } from '../utils';
import Helmet                   from 'react-helmet';
import icon_url                 from 'assets/adec_image.png';

export default class Root extends React.Component {
  static propTypes = {
    history : React.PropTypes.object.isRequired,
    store   : React.PropTypes.object.isRequired,
    debug   : React.PropTypes.bool,
    debugExternal : React.PropTypes.bool
  };

  static defaultProps = {
    debug : false,
    debugExternal : false
  };

  renderDevTools () {
    if (!this.props.debug) {
      return null;
    }

    return this.props.debugExternal ?
      createDevToolsWindow(this.props.store) : <DevTools/>;
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          <Helmet
            title='A React Base'
            link={[
              { 'rel':'icon', 'type':'image/png', 'href':icon_url }
            ]}
          />
          <Router history={this.props.history}>
            {routes}
          </Router>
          {this.renderDevTools()}
        </div>
      </Provider>
    );
  }
}
