import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import counterActions         from 'actions/counter';
import { Link }               from 'react-router';
import ChartjsPolarArea       from 'components/ChartjsPolarArea';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter,
  chart   : state.chart,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(counterActions, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    chart    : React.PropTypes.number
  }
  constructor () {
    super();
    this.state = {
      chart_data:[ {
        value: 300,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Red'
      }, {
        value: 50,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Green'
      }, {
        value: 100,
        color: '#FDB45C',
        highlight: '#FFC870',
        label: 'Yellow'
      }, {
        value: 40,
        color: '#949FB1',
        highlight: '#A8B3C5',
        label: 'Grey'
      } ]
    };
  }

  get_Chart_Data () {
    const data = this.state.chart_data;
    data[3].value = this.props.chart;
    return data;
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <button className='btn btn-default'
                onClick={this.props.actions.increment}>
          Increment
        </button>
        <button className='btn btn-default'
                onClick={this.props.actions.chart}>
          Add To Chart
        </button>
        <hr />
        <ChartjsPolarArea data={this.get_Chart_Data()} />
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
