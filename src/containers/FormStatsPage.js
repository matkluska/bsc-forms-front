import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getStats} from 'actions/get_stats_action'
import {getForm} from 'actions/get_form_action'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import NotFound from 'components/NotFound'
import {questionTypes} from './FormCreatorPage'
import TextStats from 'components/stats/TextStats'
import LinearScaleStats from 'components/stats/LinearScaleStats'
import SingleChoiceStats from 'components/stats/SingleChoiceStats'
import MultipleChoiceStats from 'components/stats/MultipleChoiceStats'

class FormStatsPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let formId = this.props.match.params.formId;
    this.props.getForm(formId);
    this.props.getStats(formId)
  }

  getQuestion = (questions, questionId) => {
    return questions.find((q) => q.id === questionId)
  };

  render() {
    const styles = {
      paper: {
        padding: 20,
        overflow: 'auto',
        margin: '2%'
      },
      textKey: {
        textAlign: 'left',
        fontWeight: 'bold',
        opacity: 0.5
      },
      textValue: {
        textAlign: 'left'
      }
    };

    const {getStatsFound, getFormFound, getStatsNotFound, getFormNotFound, stats, form} = this.props;

    if (getStatsFound === true && getFormFound === true) {
      return (
        <div>
          <div className='row center-md center-xs'>
            <div className='col-md-8 col-xs-12'>
              {stats.questionStats.map((qs, idx) =>
                <Paper key={idx} style={styles.paper}>
                  <p style={styles.textValue}>
                    <span style={styles.textKey}>Question: </span>
                    {this.getQuestion(form.questions, qs.questionId).question}
                  </p>
                  <p style={styles.textValue}>
                    <span style={styles.textKey}>Number of replies: </span>
                    {qs.repliesCount}
                  </p>
                  {(qs.type === `${questionTypes.SHORT_TEXT}_STATS` || qs.type === `${questionTypes.LONG_TEXT}_STATS`) &&
                  <TextStats questionId={qs.questionId} repliesToCount={qs.repliesToCount} key={idx}/>
                  }
                  {(qs.type === `${questionTypes.LINEAR_SCALE}_STATS`) &&
                  <LinearScaleStats questionId={qs.questionId} avgValue={qs.avgValue}
                                    optionToRepliesCounts={qs.optionToRepliesCounts}/>
                  }
                  {(qs.type === `${questionTypes.SINGLE_CHOICE}_STATS`) &&
                  <SingleChoiceStats questionId={qs.questionId} optionIdToRepliesCounts={qs.optionIdToRepliesCounts}
                                     options={this.getQuestion(form.questions, qs.questionId).options}/>
                  }
                  {(qs.type === `${questionTypes.MULTIPLE_CHOICE}_STATS`) &&
                  <MultipleChoiceStats questionId={qs.questionId} optionIdToRepliesCounts={qs.optionIdToRepliesCounts}
                                       options={this.getQuestion(form.questions, qs.questionId).options}/>
                  }
                </Paper>)}
            </div>
          </div>
        </div>
      );
    } else if (getFormNotFound === true) {
      return (
        <NotFound message='Such form does not exist'/>
      );
    } else if (getStatsNotFound === true) {
      return (
        <NotFound message='Form stats not calculated yet'/>
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

FormStatsPage.propTypes = {
  getStats: PropTypes.func.isRequired,
  getForm: PropTypes.func.isRequired,
  getStatsFound: PropTypes.bool.isRequired,
  getFormFound: PropTypes.bool.isRequired,
  getStatsNotFound: PropTypes.bool.isRequired,
  getFormNotFound: PropTypes.bool.isRequired,
  stats: PropTypes.object,
  form: PropTypes.object
};

const mapStateToProps = (state) => {

  const {getStats, getForm} = state;
  const {isFound: getStatsFound, isNotFound: getStatsNotFound, stats, errorMessage: getStatsError} = getStats;
  const {isFound: getFormFound, isNotFound: getFormNotFound, form, errorMessage: getFormError} = getForm;

  return {
    getStats,
    getForm,
    getStatsFound,
    getFormFound,
    getStatsNotFound,
    getFormNotFound,
    stats,
    form,
    getStatsError,
    getFormError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStats: (formId) => {
      dispatch(getStats(formId))
    },
    getForm: (formId) => {
      dispatch(getForm(formId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStatsPage);
