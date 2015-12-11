import React, {
  Component, PropTypes
}
from 'react';
import ReactDOM from 'react-dom';
import ChartJS from 'chart.js';


export default class ChartjsPolarArea extends Component {
  static displayName = 'PolarArea';
  static styleguide = {
    category: 'Charts',
    title: 'PolarArea',
    description: 'A ChartJS Polar Area graph',
    code: '<ChartjsPolarArea data="chartjs array" />'
  };
  static propTypes = {
    /**
     * ChartJS Data Object for [Polar Area](http://www.chartjs.org/docs/#polar-area-chart-data-structure)
     */
    data: PropTypes.arrayOf( PropTypes.shape( {
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    } ) )
  };

  static defaultProps = {
    data: []
  };

  constructor( props ) {
    super( props );
    this.state = {};
  }

  componentDidMount() {
    this.initializeChart( this.props );
  }

  componentWillReceiveProps ( nextProps ) {
    const chart = this.state.chart;
    chart.destroy();
    this.initializeChart( nextProps );
  }

  componentWillUnmount() {
    const chart = this.state.chart;
    chart.destroy();
  }

  initializeChart( nextProps ) {
    const el = ReactDOM.findDOMNode( this );
    const ctx = el.getContext( '2d' );
    const chart = new ChartJS( ctx ).PolarArea( nextProps.data ); // eslint-disable-line new-cap
    this.state.chart = chart;
  }

  render() {
    return (
      <canvas width='400' height='400' style={ { border: '1px solid black' } } ></canvas>
    );
  }
}

// export default ChartjsPolarArea;
