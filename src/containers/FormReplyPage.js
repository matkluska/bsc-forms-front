import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Send from 'material-ui/svg-icons/content/send'
import {blue600} from 'material-ui/styles/colors'
import NotFound from 'components/NotFound'
import {getForm} from 'actions/get_form_action'
import {addReply} from 'actions/add_reply_action'
import {questionTypes} from './FormCreatorPage'
import TextReply from 'components/replies/TextReply'
import SingleChoiceReply from 'components/replies/SingleChoiceReply'
import MultipleChoiceReply from 'components/replies/MultipleChoiceReply'
import LinearScaleReply from 'components/replies/LinearScaleReply'
import Snackbar from 'material-ui/Snackbar';
import Success from 'components/Success';

class FormReplyPage extends React.Component {
  constructor() {
    super();
    this.state = {
      formId: '',
      questions: [],
      requiredReplies: []
    }
  }

  componentDidMount() {
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
      questionId: q.id,
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

  onAddReplyClick = () => {
    let repliesToSend = this.prepareRepliesToSend();
    this.props.addReply(repliesToSend, this.state.formId)
  };

  handleReplyOptionChange = (id, isRequired) => (event, value) => {
    this.setState({
      questions: this.state.questions.map(r => r.questionId !== id ? r : {...r, option: value})
    });
    if (isRequired)
      this.updateRequiredReplies(id, value)
  };

  handleReplyOptionIdChange = (id, isRequired) => (event, value) => {
    this.setState({
      questions: this.state.questions.map(r => r.questionId !== id ? r : {...r, optionId: value})
    });
    if (isRequired)
      this.updateRequiredReplies(id, value)
  };

  handleReplyOptionIdsChange = (id, optionId, isRequired) => (event, checked) => {
    this.setState({
      questions: this.state.questions.map(r => r.questionId !== id ? r :
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
      }
    };

    const {isFound, isNotFound, form, isAdded, addReplyError} = this.props;

    if (isAdded === true) {
      return (
        <Success message='Your reply was added'/>
      )
    } else if (isFound === true) {
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
                <div className='end-xs'>
                  <RaisedButton
                    label='Send'
                    onClick={this.onAddReplyClick}
                    backgroundColor={blue600}
                    primary={true}
                    icon={<Send/>}
                    disabled={this.state.requiredReplies.length > 0}
                  />
                </div>
              </Paper>
            </div>
          </div>
          {addReplyError && <Snackbar
            open={true}
            autoHideDuration={5000}
            message={addReplyError}
          />}
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
  addReply: PropTypes.func.isRequired,
  isFound: PropTypes.bool,
  isNotFound: PropTypes.bool,
  form: PropTypes.object,
  getFormError: PropTypes.string,
  isAdded: PropTypes.bool,
  addReplyError: PropTypes.string
};

const mapStateToProps = (state) => {

  const {getForm, addReply} = state;
  const {isFound, isNotFound, form, errorMessage: getFormError} = getForm;
  const {isAdded, errorMessage: addReplyError} = addReply;

  return {
    isFound,
    isNotFound,
    form,
    getFormError,
    isAdded,
    addReplyError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForm: (formId) => {
      dispatch(getForm(formId))
    },
    addReply: (reply, formId) => {
      dispatch(addReply(reply, formId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormReplyPage);
