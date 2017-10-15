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
      <div className='row center-md'>
        <div className='col-md-8'>
          <Paper style={styles.paper}>
            <form>
              <div className='row bottom-md'>
                <div className='col-md-4'>
                  <SelectField
                    floatingLabelText='Question type'
                    value={data.type}
                    onChange={handleTypeChange(data.id)}
                    style={styles.questionType}
                  >
                    <MenuItem value={questionTypes.shortText} primaryText='Short Text'/>
                    <MenuItem value={questionTypes.longText} primaryText='Long Text'/>
                    <MenuItem value={questionTypes.singleChoice} primaryText='Single Choice'/>
                    <MenuItem value={questionTypes.multipleChoice} primaryText='Multiple Choice'/>
                    <MenuItem value={questionTypes.linearScale} primaryText='Linear Scale'/>
                  </SelectField>
                </div>
                <div className='col-md-offset-3 col-md-3'>
                  <Toggle
                    label='Required'
                    toggled={data.required}
                    onToggle={handleRequiredChange(data.id)}
                    style={styles.toggle}
                  />
                </div>
                <div className='col-md-1 end-md'>
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
              {(data.type === questionTypes.singleChoice || data.type === questionTypes.multipleChoice) &&
              <NewOptions
                questionId={data.id}
                options={data.options}
                addOption={addOption}
                deleteOption={deleteOption}
                handleOptionChange={handleOptionChange}
              />}
              {data.type === questionTypes.linearScale &&
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
