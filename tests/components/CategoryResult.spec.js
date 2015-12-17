// import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { renderWithProps }    from '../helpers';
import CategoryResult         from 'components/CategoryResult';
import { Answer_Types }       from 'actions/questions';
import _ from 'lodash';

describe('CategoryResult Component', function() {
  let rendered;
  let sandbox;
  let props;
  let levels;
  let answers;
  let outcomes_categories;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(console, 'error', (message) => {
      throw new Error(message);
    });


    levels = ['beginner', 'familiar', 'proficient', 'expert'];

    answers = {
      expert: [
        {
          title: 'A title',
          max: 'proficient'
        }, {
          title: 'A title',
          max: 'expert'
        }
      ],
      proficient: [
        {
          title: 'A title',
          max: 'proficient'
        }
      ]
    };

    outcomes_categories = {
      expert: {
        title: 'expert',
        text: 'An expert',
        require_options: [
          {
            expert: 1,
            proficient: 2
          }
        ]
      },
      proficient: {
        require_options: [
          {
            proficient: 2
          }
        ]
      }
    };

    props = {
      answers,
      outcomes: {
        levels,
        categories: outcomes_categories
      }
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('sub functions', () => {
    it('levelToRank should return 2 for proficient', function() {
      expect(CategoryResult.levelToRank('proficient', levels)).to.be.eql(2);
    });

    it('computeAllowCategory should return answer if below max', function() {
      const topic = {
        title: 'A title',
        max: 'proficient'
      };
      expect(CategoryResult.computeAllowedCategory(topic, 'familiar', levels))
        .to.be.eql('familiar');
    });

    it('computeAllowCategory should return max if above max', function() {
      const topic = {
        title: 'A title',
        max: 'proficient'
      };
      expect(CategoryResult.computeAllowedCategory(topic, 'expert', levels))
        .to.be.eql('proficient');
    });

    it('computeCounts should return 1 expert and 2 proficients', function() {
      expect(CategoryResult.computeCounts(answers, levels))
        .to.be.eql({
          expert: 1,
          proficient: 2
        });
    });

    it('checkRequire should return true in this case', function() {
      const counts = {
        expert: 1,
        proficient: 2
      };
      const require_options = [
        {
          proficient: 1
        },
        {
          familiar: 3
        }
      ];

      expect(CategoryResult.checkRequire(require_options, counts)).to.be.true;
    });

    it('checkRequire should return true when require is met', function() {
      const counts = {
        expert: 1,
        proficient: 2
      };
      const require_options = [
        {
          expert: 1,
          proficient: 2
        },
        {
          familiar: 3
        }
      ];

      expect(CategoryResult.checkRequire(require_options, counts)).to.be.true;
    });

    it('checkRequire should return true when require is 0', function() {
      const counts = {
        expert: 0
      };
      const require_options = [
        {
          proficient: 0
        }
      ];

      expect(CategoryResult.checkRequire(require_options, counts)).to.be.true;
    });

    it('checkRequire should return false when require are not met', function() {
      const counts = {
        expert: 1,
        proficient: 2
      };
      const require_options = [
        {
          expert: 2,
          proficient: 2
        },
        {
          familiar: 3
        }
      ];

      expect(CategoryResult.checkRequire(require_options, counts)).to.be.false;
    });

    it('computeRequires should have no to expert and yes to proficient', function() {
      const counts = {
        expert: 0,
        proficient: 2
      };
      expect(CategoryResult.computeRequires(outcomes_categories, counts)).to.be.eql({
        expert: false,
        proficient: true
      });
    });

    it('computeRequires should have yes to expert and yes to proficient', function() {
      const counts = {
        expert: 1,
        proficient: 2
      };
      expect(CategoryResult.computeRequires(outcomes_categories, counts)).to.be.eql({
        expert: true,
        proficient: true
      });
    });

    it('computeCategory should return proficient object', function() {
      expect(CategoryResult.computeCategory(props).title).to.be.eql('expert');
    });
  });

  it('Should include a class="title" element with matching text', function() {
    rendered = renderWithProps(CategoryResult, props);

    const node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'title');
    expect(node.textContent).to.contain('expert');
  });

  it('Should include a class="message" element with matching text', function() {
    rendered = renderWithProps(CategoryResult, props);

    const node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'message');
    expect(node.textContent).to.contain('An expert');
  });

  it('Should include classes "title" and "unknown" when none match', function() {
    props.answers = {};
    rendered = renderWithProps(CategoryResult, props);

    let node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'title');
    expect(node).to.exist;

    node = TestUtils.findRenderedDOMComponentWithClass(rendered, 'unknown');
    expect(node).to.exist;
  });
});
