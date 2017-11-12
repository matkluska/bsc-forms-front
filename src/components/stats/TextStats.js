import React from 'react'
import PropTypes from 'prop-types'
import withWidth, {SMALL} from 'material-ui/utils/withWidth'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class TextStats extends React.Component {
  render() {
    const styles = {
      table: {
        wordBreak: 'break-all'
      },
      columns: {
        reply: {
          width: this.props.width === SMALL ? '70%' : '85%',
          whiteSpace: 'normal'
        },
        count: {
          width: this.props.width === SMALL ? '30%' : '15%',
          textAlign: 'center',
          whiteSpace: 'normal'
        }
      }
    };

    const {repliesToCount} = this.props;

    return (
      <Table
        selectable={false}
        style={styles.table}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn tooltip='Reply value' style={styles.columns.reply}>
              Reply
            </TableHeaderColumn>
            <TableHeaderColumn tooltip='Reply count' style={styles.columns.count}>
              Count
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}
          stripedRows={true}
        >
          {Object.entries(repliesToCount).map((rc, idx) => {
            return (
              <TableRow key={idx}>
                <TableRowColumn style={styles.columns.reply}>{rc[0]}</TableRowColumn>
                <TableRowColumn style={styles.columns.count}>{rc[1]}</TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    );
  }
}

TextStats.propTypes = {
  questionId: PropTypes.string.isRequired,
  repliesToCount: PropTypes.object.isRequired
};

export default withWidth()(TextStats);
