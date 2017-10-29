import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RequiredAsterisk from 'components/RequiredAsterisk'

class TextReply extends React.Component {
  constructor() {
    super();
  }

  render() {
    const styles = {
      textQuestion: {
        marginBottom: 0
      },
      textField: {
        margin: 0
      }
    };

    const {question, isRequired, id, multiLine, handleReplyOptionChange} = this.props;

    return (
      <div>
        <p style={styles.textQuestion}>
          {question}? {isRequired && <RequiredAsterisk/>}
        </p>
        <TextField
          hintText='Reply'
          underlineShow={false}
          fullWidth={true}
          multiLine={multiLine}
          onChange={handleReplyOptionChange(id, isRequired)}
          style={styles.textField}
        />
      </div>
    );
  }
}

TextReply.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  multiLine: PropTypes.bool.isRequired,
  handleReplyOptionChange: PropTypes.func.isRequired
};

export default TextReply;
