import React from 'react'
import PropTypes from 'prop-types'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RequiredAsterisk from 'components/RequiredAsterisk'

class SingleChoiceReply extends React.Component {
  constructor() {
    super();
  }

  render() {
    const styles = {
      radioButtons: {
        marginBottom: 15
      }
    };

    const {id, question, isRequired, handleReplyOptionIdChange, options} = this.props;

    return (
      <div>
        <p>
          {question}? {isRequired && <RequiredAsterisk/>}
        </p>
        <RadioButtonGroup
          style={styles.radioButtons}
          name='Single choice reply'
          onChange={handleReplyOptionIdChange(id, isRequired)}
        >
          {options.map((o, idx) =>
            <RadioButton
              key={idx}
              value={o.id}
              label={o.option}
            />)
          }
        </RadioButtonGroup>
      </div>
    );
  }
}

SingleChoiceReply.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  handleReplyOptionIdChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SingleChoiceReply;
