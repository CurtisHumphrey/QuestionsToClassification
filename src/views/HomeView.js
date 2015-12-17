import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { question_Answered, Answer_Types }  from 'actions/questions';
import AnsweredList           from 'components/AnsweredList';
import QuestionAsker          from 'components/QuestionAsker';
import CategoryResult          from 'components/CategoryResult';
import _ from 'lodash';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  // outcomes
  // counter : state.counter,
  // chart   : state.chart,
  // routerState : state.router
  outcomes: state.questions.outcomes,
  answers: state.questions.answers,
  topics: state.questions.topics
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({question_Answered}, dispatch)
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() );
}

export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    topics   : React.PropTypes.array,
    answers  : React.PropTypes.object,
    outcomes : React.PropTypes.objects
  };

  constructor (props) {
    super();
    this.state = {};
    this.state.possibleAnswers = _.map(props.answers, (list, key) => {
      return {
        text: key,
        action: (topic) => props.actions.question_Answered(topic, key)
      };
    });
  }

  renderAnsweredList () {
    return _.map(Answer_Types, category => {
      return (
        <div className='col-md-3'>
          <AnsweredList title={toTitleCase(category)} key={category} list={this.props.answers[category]} />
        </div>
      );
    });
  }

  render () {
    console.log(this.props);
    return (
      <div className='container text-center'>
        <h1>Welcome to the Question to Category!</h1>
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <QuestionAsker topic={this.props.topics[0]} possibleAnswers={this.state.possibleAnswers} />
          </div>
        </div>
        <hr/>
        <CategoryResult outcomes={this.props.outcomes} answers={this.props.answers} />
        <hr/>
        <h3> Your topic answers </h3>
        <p>Please note just because one rates themselves as 'expert' on a skill topic does not make them an expert of
        the overall subject. Example: Being an expert at breathing does not make one a expert of public speaking even
        though public speaking require breathing.</p>
        <div className='row'>
          { this.renderAnsweredList() }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
