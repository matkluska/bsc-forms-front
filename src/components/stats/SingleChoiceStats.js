import React from 'react'
import PropTypes from 'prop-types'
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory';

class SingleChoiceStats extends React.Component {
  getChartData = (optionToRepliesCount) => {
    return Object.entries(optionToRepliesCount).map((oc, idx) => {
      return {
        option: `${String.fromCharCode(65 + idx)}`,
        count: oc[1]
      }
    })
  };

  getOptionAxisValues = (optionToRepliesCount, options) => {
    return Object.entries(optionToRepliesCount).map((oc, idx) => {
      let option = options.find((o) => oc[0] === o.id).option;
      return {
        key: `${String.fromCharCode(65 + idx)}`,
        value: option
      }
    })
  };

  render() {
    const styles = {
      textKey: {
        textAlign: 'left',
        fontWeight: 'bold',
        opacity: 0.5
      },
      textValue: {
        textAlign: 'left'
      }
    };

    const {optionIdToRepliesCounts, options} = this.props;

    return (
      <div>
        <div className='col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1'>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryBar
              horizontal
              data={this.getChartData(optionIdToRepliesCounts)}
              x="option"
              y="count"
            />
          </VictoryChart>
        </div>
        {this.getOptionAxisValues(optionIdToRepliesCounts, options).map(entry =>
          <p style={styles.textValue}>
            <span style={styles.textKey}>{entry.key}: </span>
            {entry.value}
          </p>
        )}
      </div>
    );
  }
}

SingleChoiceStats.propTypes = {
  questionId: PropTypes.string.isRequired,
  optionIdToRepliesCounts: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
};

export default SingleChoiceStats;
