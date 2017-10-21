import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {saveForm} from '../actions/save_form_action'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Save from 'material-ui/svg-icons/content/save'
import {blue600, pink500} from 'material-ui/styles/colors'
import NewQuestion from 'components/NewQuestion';

export const questionTypes = {
  shortText: 'SHORT_TEXT',
  longText: 'LONG_TEXT',
  singleChoice: 'SINGLE_CHOICE',
  multipleChoice: 'MULTIPLE_CHOICE',
  linearScale: 'LINEAR_SCALE'
};

class FormCreatorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      questions: []
    }
  }

  addQuestion() {
    this.setState({
      questions: this.state.questions.concat({
        id: guid(),
        type: questionTypes.shortText,
        question: '',
        required: false
      })
    })
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  };

  handleDescChange = (event) => {
    this.setState({
      description: event.target.value
    })
  };

  handleRequiredChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, required: event.target.checked})
    });
  };

  handleQuestionValChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, question: event.target.value})
    });
  };

  handleQuestionTypeChange = (id) => (event, index, value) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : FormCreatorPage.getQuestionWithType(value, q))
    })
  };

  static getQuestionWithType(type, q) {
    let question = {
      id: q.id,
      type: type,
      question: q.question,
      required: q.required
    };

    if (type === questionTypes.singleChoice || type === questionTypes.multipleChoice)
      question = {
        ...question,
        options: []
      };
    else if (type === questionTypes.linearScale)
      question = {
        ...question,
        minLabel: '',
        maxLabel: '',
        min: 1,
        max: 10
      };

    return question
  }


  handleDelete = (id) => () => {
    this.setState({
      questions: this.state.questions.filter(q => q.id !== id)
    });
  };

  handleMinValChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, min: event.target.value})
    });
  };

  handleMinLabelChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, minLabel: event.target.value})
    });
  };

  handleMaxValChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, max: event.target.value})
    });
  };

  handleMaxLabelChange = (id) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {...q, maxLabel: event.target.value})
    });
  };

  addOption = (id) => () => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== id ? q : {
        ...q, options: q.options.concat(
          {
            id: guid(),
            option: ''
          }
        )
      })
    });
  };

  deleteOption = (questionId, optionId) => () => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== questionId ? q :
        {...q, options: q.options.filter(o => o.id !== optionId)})
    });
  };

  handleOptionChange = (questionId, optionId) => (event) => {
    this.setState({
      questions: this.state.questions.map(q => q.id !== questionId ? q :
        {...q, options: q.options.map(o => o.id !== optionId ? o : {...o, option: event.target.value})})
    });
  };

  handleSaveClick = () => {
    this.props.onSaveClick(this.state)
  };

  render() {
    const styles = {
      paper: {
        padding: 20,
        overflow: 'auto',
        margin: '2%'
      },
      saveBtn: {
        float: 'left'
      },
      addQuestionBtn: {
        margin: 0,
        top: 'auto',
        right: 90,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      },
      saveFormBtn: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      }
    };

    return (
      <div>
        <div className='row center-md'>
          <div className='col-md-8'>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  hintText='Form title'
                  floatingLabelText='Form title'
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  fullWidth={true}
                />
                <TextField
                  hintText='Description'
                  floatingLabelText='Description'
                  value={this.state.description}
                  onChange={this.handleDescChange}
                  fullWidth={true}
                />
              </form>
            </Paper>
          </div>
        </div>

        {this.state.questions.map((question, idx) =>
          <NewQuestion
            key={question.id}
            data={question}
            index={idx}
            handleQuestionChange={this.handleQuestionValChange}
            handleRequiredChange={this.handleRequiredChange}
            handleTypeChange={this.handleQuestionTypeChange}
            handleDelete={this.handleDelete}
            handleMinChange={this.handleMinValChange}
            handleMinLabelChange={this.handleMinLabelChange}
            handleMaxChange={this.handleMaxValChange}
            handleMaxLabelChange={this.handleMaxLabelChange}
            addOption={this.addOption}
            deleteOption={this.deleteOption}
            handleOptionChange={this.handleOptionChange}
          />
        )
        }

        <FloatingActionButton
          style={styles.addQuestionBtn}
          backgroundColor={pink500}
          onClick={() => this.addQuestion()}
        >
          <ContentAdd/>
        </FloatingActionButton>
        <FloatingActionButton
          style={styles.saveFormBtn}
          backgroundColor={blue600}
          onClick={() => this.handleSaveClick()}
        >
          <Save/>
        </FloatingActionButton>
      </div>
    );
  }
}

function guid() {
  return s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

FormCreatorPage.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  isSaved: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => {

  const {saveForm} = state;
  const {isSaved, errorMessage} = saveForm;

  return {
    isSaved,
    errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClick: (state) => {
      dispatch(saveForm(state))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCreatorPage);
