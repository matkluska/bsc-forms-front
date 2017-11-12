import React from 'react'
import PropTypes from 'prop-types'
import {Cell, Row, Table} from 'react-responsive-table'

class TextStats extends React.Component {
  render() {
    const styles = {
      table: {
        width: 'auto',
        wordBreak: 'break-all'
      }
    };

    const {questionId, repliesToCount} = this.props;

    return (
      <Table material style={styles.table}>
        <Row header key={questionId}>
          <Cell key={`cell1_${questionId}`}>Reply</Cell>
          <Cell key={`cell2_${questionId}`}>Count</Cell>
        </Row>
        {Object.entries(repliesToCount).map((rc, idx) =>
          <Row striped key={idx}>
            <Cell key={`cell1_${idx}`}>{rc[0]}</Cell>
            <Cell key={`cell2_${idx}`}>{rc[1]}</Cell>
          </Row>
        )}
      </Table>
    );
  }
}

TextStats.propTypes = {
  questionId: PropTypes.string.isRequired,
  repliesToCount: PropTypes.object.isRequired
};

export default TextStats;
