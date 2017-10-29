import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Save from 'material-ui/svg-icons/content/save'
import {blue600} from 'material-ui/styles/colors'
import NotFound from 'components/NotFound'
import {getForm} from 'actions/get_form_action'
import {questionTypes} from './FormCreatorPage'
import TextReply from 'components/replies/TextReply'
import SingleChoiceReply from 'components/replies/SingleChoiceReply'
import MultipleChoiceReply from 'components/replies/MultipleChoiceReply'
import LinearScaleReply from 'components/replies/LinearScaleReply'

class FormReplyPage extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      requiredReplies: []
    }
  }

  componentDidMount() {
    console.log('send request');
    this.props.fetchForm(this.props.match.params.formId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.questions.length === 0 && nextProps.form) {
      let q = nextProps.form.questions.map((question) => {
        return FormReplyPage.getQuestionWithType(question.type, question)
      });
      let requiredQuestions = nextProps.form.questions
        .filter((question) => question.required)
        .map((question) => question.id);

      this.setState({
        formId: nextProps.form.id,
        questions: q,
        requiredReplies: requiredQuestions
      })
    }
  }

  static getQuestionWithType(type, q) {
    let question = {
      id: q.id,
      type: `${type}_REPLY`
    };

    if (type === questionTypes.SHORT_TEXT || type === questionTypes.LONG_TEXT || type === questionTypes.LINEAR_SCALE)
      question = {
        ...question,
        option: q.min
      };
    else if (type === questionTypes.SINGLE_CHOICE)
      question = {
        ...question,
        optionId: undefined
      };
    else if (type === questionTypes.MULTIPLE_CHOICE)
      question = {
        ...question,
        optionIds: []
      };


    return question
  }

  handleReplyOptionChange = (id, isRequired) => (event, value) => {
    this.setState({
      questions: this.state.questions.map(r => r.id !== id ? r : {...r, option: value})
    });
    if (isRequired)
      this.updateRequiredReplies(id, value)
  };

  handleReplyOptionIdChange = (id, isRequired) => (event, value) => {
    this.setState({
      questions: this.state.questions.map(r => r.id !== id ? r : {...r, optionId: value})
    });
    if (isRequired)
      this.updateRequiredReplies(id, value)
  };

  handleReplyOptionIdsChange = (id, optionId, isRequired) => (event, checked) => {
    this.setState({
      questions: this.state.questions.map(r => r.id !== id ? r :
        {...r, optionIds: this.modifyOptionIds(r.optionIds, optionId, checked)})
    });
    if (isRequired) {
      this.updateRequiredReplies(id, checked || this.state.questions.filter(r => r === id).map(r => r.optionIds.length > 1)[0])
    }
  };

  modifyOptionIds = (optionIds, optionId, isChecked) => {
    return isChecked ? optionIds.concat(optionId) : optionIds.filter(o => o !== optionId)
  };

  updateRequiredReplies = (id, isFilled) => {
    if (isFilled) {
      this.setState({
        requiredReplies: this.state.requiredReplies.filter(r => r !== id)
      })
    } else {
      this.setState({
        requiredReplies: this.state.requiredReplies.concat(id)
      })
    }
  };

  prepareRepliesToSend = () => {
    return this.state.questions.filter(r => this.checkIfFilled(r))
  };

  checkIfFilled = (reply) => {
    return (reply.hasOwnProperty('option') && reply.option) ||
      (reply.hasOwnProperty('optionId') && reply.optionId) ||
      (reply.hasOwnProperty('optionIds') && reply.optionIds.length > 0)

  };

  render() {
    const styles = {
      paper: {
        padding: 20,
        textAlign: 'left',
        overflow: 'auto',
        margin: '2%'
      },
      saveBtn: {
        float: 'left'
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

    const {isFound, isNotFound, form} = this.props;

    if (isFound === true) {
      return (
        <div>
          <div className='row center-md'>
            <div className='col-md-8'>
              <Paper style={styles.paper}>
                <h2>Title: {form.title}</h2>
                <h3>Description: {form.desc}</h3>
                {form.questions.map((q, idx) =>
                  <div key={idx}>
                    <Divider/>
                    {q.type === questionTypes.SHORT_TEXT &&
                    <TextReply
                      id={q.id}
                      question={q.question}
                      isRequired={q.required}
                      multiLine={false}
                      handleReplyOptionChange={this.handleReplyOptionChange}
                    />
                    }
                    {q.type === questionTypes.LONG_TEXT &&
                    <TextReply
                      id={q.id}
                      question={q.question}
                      isRequired={q.required}
                      multiLine={true}
                      handleReplyOptionChange={this.handleReplyOptionChange}
                    />
                    }
                    {q.type === questionTypes.SINGLE_CHOICE &&
                    <SingleChoiceReply
                      id={q.id}
                      question={q.question}
                      isRequired={q.required}
                      options={q.options}
                      handleReplyOptionIdChange={this.handleReplyOptionIdChange}
                    />
                    }
                    {q.type === questionTypes.MULTIPLE_CHOICE &&
                    <MultipleChoiceReply
                      id={q.id}
                      question={q.question}
                      isRequired={q.required}
                      options={q.options}
                      handleReplyOptionIdsChange={this.handleReplyOptionIdsChange}
                    />
                    }
                    {q.type === questionTypes.LINEAR_SCALE &&
                    <LinearScaleReply
                      id={q.id}
                      question={q.question}
                      isRequired={q.required}
                      handleReplyChange={this.handleReplyOptionChange}
                      min={q.min}
                      max={q.max}
                      minLabel={q.minLabel}
                      maxLabel={q.maxLabel}
                    />
                    }
                  </div>
                )}
              </Paper>
            </div>
          </div>
          <FloatingActionButton
            style={styles.saveFormBtn}
            backgroundColor={blue600}
            disabled={this.state.requiredReplies.length > 0}
            onClick={() => {
              console.log(this.prepareRepliesToSend())
            }}
          >
            <Save/>
          </FloatingActionButton>
        </div>
      );
    } else if (isNotFound === true) {
      return (
        <NotFound message='Such form does not exist'/>
      );
    } else {
      return (
        <div className='row center-md'>
          <CircularProgress size={80} thickness={6}/>
        </div>
      );
    }
  }
}

FormReplyPage.propTypes = {
  fetchForm: PropTypes.func.isRequired,
  isFound: PropTypes.bool,
  isNotFound: PropTypes.bool,
  form: PropTypes.object,
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => {

  const {getForm} = state;
  const {isFound, isNotFound, form, errorMessage} = getForm;

  return {
    isFound,
    isNotFound,
    form,
    errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForm: (formId) => {
      dispatch(getForm(formId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormReplyPage);
