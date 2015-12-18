import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { question_Answered, Answer_Types }  from 'actions/questions';
import AnsweredList           from 'components/AnsweredList';
import QuestionAsker          from 'components/QuestionAsker';
import CategoryResult          from 'components/CategoryResult';
import _ from 'lodash';
import 'styles/category-assessor.scss';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
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
    outcomes : React.PropTypes.object
  };

  constructor (props) {
    super();
    this.state = {
      display_instructions: true,
      total_topics: props.topics.length
    };
    this.state.possibleAnswers = _.map(props.answers, (list, key) => {
      return {
        text: key,
        action: (topic) => props.actions.question_Answered(topic, key)
      };
    });
  }

  instructionsDone () {
    this.setState({'display_instructions': false});
  }

  renderProgress () {
    let percentage = (1.0 - this.props.topics.length / this.state.total_topics) * 100;
    let title = 'Progress:';
    
    if (percentage < 20 || percentage > 99) {
      return (
        <div className='row progress-block'>
          <div className='col-md-12' style={{height: 40}}>&nbsp;</div>
        </div>
      );
    } else if (percentage > 80 && percentage < 99) {
      title = 'Almost...';
    }

    percentage += '%';
    return (
      <div className='row progress-block'>
        <div className='col-md-1 col-md-offset-3 text-left'>{title}</div>
        <div className='col-md-5'>
          <div className='progress'>
            <div className='progress-bar' role='progressbar' style={{width: percentage}} >
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAnsweredList () {
    return _.map(Answer_Types, category => {
      return (
        <div className='col-md-3' key={category}>
          <AnsweredList title={toTitleCase(category)} list={this.props.answers[category]} />
        </div>
      );
    });
  }

  renderInstructions () {
    return (
      <div className='container instructions'>
        <h2> Simple Instructions </h2>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4'>
            <p className=''> For each skill topic that is used by a Data Scientist *simply* pick your competence  level.</p>
            <button className='btn btn-primary btn-lg btn-block' id='Instructions-Read' onClick={this.instructionsDone.bind(this)} >Got it!</button>
          </div>
        </div>
      </div>
    );
  }

  renderQuestions () {
    return (
      <div className='container question-block'>
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <QuestionAsker topic={this.props.topics[0]} possibleAnswers={this.state.possibleAnswers} />
          </div>
        </div>
        { this.renderProgress() }
      </div>
    );
  }

  renderResults () {
    return (
      <div className='container' id='Results'>
        <CategoryResult outcomes={this.props.outcomes} answers={this.props.answers} />
        <hr/>
        <h3> Your topic answers: </h3>
        <div className='row'>
          { this.renderAnsweredList() }
        </div>
        <div className='row note-block'>
          <div className='col-md-3 text-right'>Please Note:</div>
          <small className='col-md-8'>Please note that just because one rates themselves an 'expert' on a topic does not make them an expert of
          the overall subject. Example: Being an expert at breathing does not make one a expert of public speaking even
          though public speaking require breathing.</small>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='header-block row'>
          <div className='container'>
            <h1>Welcome to Category Assessor!</h1>
            <div className='row subsection text-left'>
              <div className='col-md-1 col-md-offset-3 h4'>Purpose:</div>
              <div className='col-md-5'>This project's purpose is to experiment
               with ways of asking questions to discover what skill category a person is with
               respect to an overall skill set.</div>
            </div>
            <div className='row text-left'>
              <div className='col-md-1 col-md-offset-3 h4'>Demo:</div>
              <div className='col-md-5'>
                Goal is to discover your Data Scientist skill level by asking you question 
                which are quick for you to answer.
              </div>
            </div>
          </div>
        </div>
        <div className='row main-body'>
          { (this.state.display_instructions) ? this.renderInstructions() : this.renderQuestions() }
        </div>
        <div className='answered-block'>
          { (this.props.topics[0]) ? null : this.renderResults() }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
