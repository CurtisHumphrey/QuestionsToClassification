import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class QuestionAsker extends Component {
  static displayName = 'Question Asker';
  static styleguide = {
    category: 'lists',
    title: 'Answered List',
    description: 'A list of answered topics',
    code: '<AnsweredList title="String" list="[{text: String}, ...]" />'
  };
  static propTypes = {
    topic: PropTypes.shape( {
      text: PropTypes.string
    }),
    possibleAnswers: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired
    }))
  };

  static defaultProps = {
    topic: {}
  };

  constructor( props ) {
    super( props );
    this.state = {};
  }

  renderAnswers () {
    const topic = this.props.topic;
    return _.map(this.props.possibleAnswers, answer => {
      const text = answer.text.toLowerCase();
      const click = () => answer.action(topic);
      return (
        <button className='answer btn-block btn-lg btn btn-default' key={text} onClick={click} >{text}</button>
      );
    });
  }
  
  render() {
    if (this.props.topic.text) {
      return (
        <div className='question'>
          <div className='question-title h4'>What level do you know this topic:</div>
          <div className='question-topic h3'>{this.props.topic.text}?</div>
          { this.renderAnswers() }
        </div>
      );
    } else {
      return (
        <div className='question h3'>No More Questions!</div>
      );
    }
  }
}
