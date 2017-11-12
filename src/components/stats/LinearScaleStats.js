import React from 'react'
import PropTypes from 'prop-types'
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from 'victory';

class LinearScaleStats extends React.Component {
  getChartData = (optionToRepliesCount) => {
    return Object.entries(optionToRepliesCount).map((oc, idx) => {
      return {
        optionNumber: idx + 1,
        count: oc[1]
      }
    })
  };

  getOptionAxis = (optionToRepliesCount) => {
    return Object.entries(optionToRepliesCount).map((oc) => {
      return oc[0]
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

    const {avgValue, optionToRepliesCounts} = this.props;

    return (
      <div>
        <p style={styles.textValue}>
          <span style={styles.textKey}>Average value: </span>
          {avgValue}
        </p>
        <div className='col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1'>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={this.getOptionAxis(optionToRepliesCounts)}
            />
            <VictoryAxis
              dependentAxis
            />
            <VictoryBar
              data={this.getChartData(optionToRepliesCounts)}
              x="optionNumber"
              y="count"
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

LinearScaleStats.propTypes = {
  questionId: PropTypes.string.isRequired,
  avgValue: PropTypes.number.isRequired,
  optionToRepliesCounts: PropTypes.object.isRequired
};

export default LinearScaleStats;
