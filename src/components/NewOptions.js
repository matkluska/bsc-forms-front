import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

class NewOptions extends React.Component {
  render() {
    const styles = {
      icon: {
        padding: 12
      },
      optionsLabel: {
        marginBottom: 0,
        textAlign: 'left',
        fontSize: 16
      },
      optionValue: {
        margin: 0
      }
    };
    const {questionId, options, addOption, deleteOption, handleOptionChange} = this.props;

    return (
      <div>
        <p style={styles.optionsLabel}>Options:</p>
        {options.map((option, idx) =>
          <div className='row bottom-xs' key={option.id}>
            <ChevronRight style={styles.icon}/>
            <div className='col-xs-10'>
              <TextField
                hintText={`Option #${idx + 1}`}
                floatingLabelText={`Option #${idx + 1}`}
                value={option.option}
                onChange={handleOptionChange(questionId, option.id)}
                fullWidth={true}
                style={styles.optionValue}
              />
            </div>
            <div className='col-xs end-xs'>
              <IconButton onClick={deleteOption(questionId, option.id)}>
                <Clear/>
              </IconButton>
            </div>
          </div>
        )}
        <div className='row'>
          <IconButton onClick={addOption(questionId)}>
            <Add/>
          </IconButton>
        </div>
      </div>
    )
  }
}

NewOptions.propTypes = {
  questionId: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  addOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired
};

export default NewOptions;
