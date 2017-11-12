import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import NewLinearScaleInputs from './NewLinearScaleInputs';
import {questionTypes} from '../containers/FormCreatorPage';
import NewOptions from './NewOptions';

class NewQuestion extends React.Component {
  render() {
    const styles = {
      paper: {
        padding: 20,
        overflow: 'auto',
        margin: '2%'
      },
      questionType: {
        textAlign: 'left',
        width: 170
      },
      question: {
        textAlign: 'left'
      },
      toggle: {
        padding: 16
      },
      clearBtn: {
        marginBottom: 4
      }
    };

    const {data, index, handleQuestionChange, handleRequiredChange, handleTypeChange, handleDelete,
    handleMinChange, handleMinLabelChange, handleMaxChange, handleMaxLabelChange,
    addOption, deleteOption, handleOptionChange} = this.props;

    return (
      <div className='row center-xs'>
        <div className='col-xs-8'>
          <Paper style={styles.paper}>
            <form>
              <div className='row bottom-xs'>
                <div className='col-xs-4 start-xs'>
                  <SelectField
                    floatingLabelText='Question type'
                    value={data.type}
                    onChange={handleTypeChange(data.id)}
                    style={styles.questionType}
                  >
                    <MenuItem value={questionTypes.SHORT_TEXT} primaryText='Short Text'/>
                    <MenuItem value={questionTypes.LONG_TEXT} primaryText='Long Text'/>
                    <MenuItem value={questionTypes.SINGLE_CHOICE} primaryText='Single Choice'/>
                    <MenuItem value={questionTypes.MULTIPLE_CHOICE} primaryText='Multiple Choice'/>
                    <MenuItem value={questionTypes.LINEAR_SCALE} primaryText='Linear Scale'/>
                  </SelectField>
                </div>
                <div className='col-xs-offset-4 col-xs'>
                  <Toggle
                    label='Required'
                    toggled={data.required}
                    onToggle={handleRequiredChange(data.id)}
                    style={styles.toggle}
                  />
                </div>
                <div className='col-xs end-xs'>
                  <IconButton onClick={handleDelete(data.id)} style={styles.clearBtn}>
                    <Clear/>
                  </IconButton>
                </div>
              </div>
              <TextField
                hintText={`Question #${index + 1}`}
                floatingLabelText={`Question #${index + 1}`}
                value={data.question}
                onChange={handleQuestionChange(data.id)}
                multiLine={true}
                rowsMax={2}
                fullWidth={true}
                style={styles.question}
              />
              {(data.type === questionTypes.SINGLE_CHOICE || data.type === questionTypes.MULTIPLE_CHOICE) &&
              <NewOptions
                questionId={data.id}
                options={data.options}
                addOption={addOption}
                deleteOption={deleteOption}
                handleOptionChange={handleOptionChange}
              />}
              {data.type === questionTypes.LINEAR_SCALE &&
              <NewLinearScaleInputs
                data={data}
                handleMinChange={handleMinChange}
                handleMinLabelChange={handleMinLabelChange}
                handleMaxChange={handleMaxChange}
                handleMaxLabelChange={handleMaxLabelChange}
              />}
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
  handleRequiredChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMinChange: PropTypes.func.isRequired,
  handleMinLabelChange: PropTypes.func.isRequired,
  handleMaxChange: PropTypes.func.isRequired,
  handleMaxLabelChange: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired
};

export default NewQuestion;
