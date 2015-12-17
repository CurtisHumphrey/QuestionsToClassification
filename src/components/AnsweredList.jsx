import React, { Component, PropTypes } from 'react';

export default class AnsweredList extends Component {
  static displayName = 'Answered List';
  static styleguide = {
    category: 'lists',
    title: 'Answered List',
    description: 'A list of answered topics',
    code: '<AnsweredList title="String" list="[{text: String}, ...]" />'
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf( PropTypes.shape( {
      text: PropTypes.string.isRequired
    } ) )
  };

  static defaultProps = {
    list: []
  };

  constructor( props ) {
    super( props );
    this.state = {};
  }

  render() {
    const listNode = this.props.list.map(function({text}) {
      return (
        <li className="list-group-item" key={text} >{text}</li>
      );
    });

    return (
      <div>
        <div className="title h4">{this.props.title}</div>
        <ul className="list-group">
          {listNode}
        </ul>
      </div>
    );
  }
}
