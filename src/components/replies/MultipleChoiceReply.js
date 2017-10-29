import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import RequiredAsterisk from 'components/RequiredAsterisk'

class MultipleChoiceReply extends React.Component {
  constructor() {
    super();
  }

  render() {
    const styles = {
      checkBoxes: {
        marginBottom: 15
      }
    };

    const {id, question, isRequired, handleReplyOptionIdsChange, options} = this.props;

    return (
      <div>
        <p>
          {question}? {isRequired && <RequiredAsterisk/>}
        </p>
        <div style={styles.checkBoxes}>
          {options.map((o, idx) =>
            <Checkbox
              key={idx}
              label={o.option}
              onCheck={handleReplyOptionIdsChange(id, o.id, isRequired)}
            />
          )}
        </div>
      </div>
    );
  }
}

MultipleChoiceReply.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  handleReplyOptionIdsChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default MultipleChoiceReply;
