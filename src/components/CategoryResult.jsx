import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class CategoryResult extends Component {
  static displayName = 'Category Result';
  static styleguide = {
    category: 'lists',
    title: 'Category Result',
    description: 'The resulting Category',
    code: '<CategoryResult title="String" list="[{text: String}, ...]" />'
  };
  static propTypes = {
    outcomes: PropTypes.shape({
      levels: PropTypes.arrayOf(PropTypes.string).isRequired,
      categories: PropTypes.object
    }).isRequired,
    answers: PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  constructor( props ) {
    super( props );
    this.state = {};
  }

  static levelToRank(answer_type, levels) {
    return _.indexOf(levels, answer_type.toLowerCase());
  }

  static computeAllowedCategory(topic, answer_type, levels) {
    if (CategoryResult.levelToRank(answer_type, levels) > CategoryResult.levelToRank(topic.max, levels)) {
      return topic.max;
    } else {
      return answer_type;
    }
  }

  static computeCounts(answers, levels) {
    const counts = {};
    _.forEach(answers, (list, answer_type) => {
      _.forEach(list, (topic) => {
        const level = CategoryResult.computeAllowedCategory(topic, answer_type, levels).toLowerCase();
        counts[level] = (counts[level] ? counts[level] : 0) + 1;
      });
    });
    return counts;
  }

  static checkRequire(require_options, counts) {
    return _.reduce(require_options, (r_result, options) => {
      return r_result || _.reduce(options, (o_result, min, key) => {
        let value = counts[key.toLowerCase()];
        if (value === undefined) {
          value = 0; // count is always at least 0
        }
        return o_result && value >= min;
      }, true);
    }, false);
  }

  static computeRequires(outcomes_categories, counts) {
    const categories = {};
    _.forEach(outcomes_categories, (value, category) => {
      categories[category] = CategoryResult.checkRequire(value.require_options, counts);
    });
    return categories;
  }

  static computeCategory(props) {
    // count answer types
    const counts = CategoryResult.computeCounts(props.answers, props.outcomes.levels);
    console.log(counts);

    // check requires
    const categoriesStates = CategoryResult.computeRequires(props.outcomes.categories, counts);

    console.log(categoriesStates);

    // check level
    for (let i = props.outcomes.levels.length - 1; i >= 0; i -= 1) {
      const level = props.outcomes.levels[i].toLowerCase();
      if (categoriesStates[level]) {
        return props.outcomes.categories[level];
      }
    }

    return null;
  }

  render() {
    const my_category = CategoryResult.computeCategory(this.props);
    if (my_category === null) {
      return (
        <div className='title unknown'>Unknown Category</div>
      );
    } else {
      return (
        <div>
          <div className='title h2'>{my_category.title}</div>
          <div className='message'>{my_category.text}</div>
        </div>
      );
    }
  }
}
