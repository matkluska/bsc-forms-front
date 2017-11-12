import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveForm} from '../actions/save_form_action'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Save from 'material-ui/svg-icons/content/save'
import {blue600, pink500} from 'material-ui/styles/colors'
import NewQuestion from 'components/NewQuestion'

export const questionTypes = {
  SHORT_TEXT: 'SHORT_TEXT',
  LONG_TEXT: 'LONG_TEXT',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  LINEAR_SCALE: 'LINEAR_SCALE'
};

class FormCreatorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      questions: []
    }
  }

  addQuestion() {
    this.setState({
      questions: this.state.questions.concat({
        id: guid(),
        type: questionTypes.SHORT_TEXT,
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
      desc: event.target.value
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

    if (type === questionTypes.SINGLE_CHOICE || type === questionTypes.MULTIPLE_CHOICE)
      question = {
        ...question,
        options: []
      };
    else if (type === questionTypes.LINEAR_SCALE)
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
        <div className='row center-xs'>
          <div className='col-xs-8'>
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
                  value={this.state.desc}
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
