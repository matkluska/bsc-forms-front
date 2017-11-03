import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import {listForms} from 'actions/list_forms_action'
import {deleteForm} from 'actions/delete_form_action'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Link from 'material-ui/svg-icons/content/link'
import Delete from 'material-ui/svg-icons/action/delete'
import ShowChart from 'material-ui/svg-icons/editor/show-chart'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class ListFormsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      copied: false,
      deletedMsg: false
    }
  }

  componentDidMount() {
    this.props.listForms()
  }

  getFormReplyPageURL = (formId) => {
    return `${window.location.href}form/${formId}`
  };

  onDeleteClick = (formId) => {
    this.props.deleteForm(formId);
    this.props.listForms();
    this.setState({deletedMsg: true})
  };

  render() {
    const styles = {
      title: {
        padding: 15,
        fontSize: 24
      },
      paper: {
        padding: 10,
        textAlign: 'left',
        overflow: 'auto',
        margin: '2%'
      },
      columns: {
        title: {
          width: '20%'
        },
        desc: {
          width: '20%',
          textAlign: 'center'
        },
        date: {
          width: '20%',
          textAlign: 'center'
        },
        questions: {
          width: '20%',
          textAlign: 'center'
        },
        actions: {
          width: '20%',
          textAlign: 'right',
          paddingRight: 0,
          overflow: 'visible'
        }
      },
      noData: {
        paddingTop: 10,
        opacity: 0.5,
        fontSize: 18
      }
    };

    const {isListed, listFormsError, forms} = this.props;

    if (isListed === true) {
      return (
        <div>
          <div className='row center-md'>
            <div className='col-xs-12'>
              <Paper style={styles.paper}>
                <p style={styles.title}>Your forms</p>
                <Table
                  selectable={false}
                >
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                  >
                    <TableRow>
                      <TableHeaderColumn tooltip='Form title' style={styles.columns.title}>
                        Title
                      </TableHeaderColumn>
                      <TableHeaderColumn tooltip='Form description' style={styles.columns.desc}>
                        Description
                      </TableHeaderColumn>
                      <TableHeaderColumn tooltip='Creation date' style={styles.columns.date}>
                        Date
                      </TableHeaderColumn>
                      <TableHeaderColumn tooltip='Number of questions' style={styles.columns.questions}>
                        Questions
                      </TableHeaderColumn>
                      <TableHeaderColumn/>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                    stripedRows={true}
                  >
                    {forms.map((f, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableRowColumn style={styles.columns.title}>{f.title}</TableRowColumn>
                          <TableRowColumn style={styles.columns.desc}>{f.desc}</TableRowColumn>
                          <TableRowColumn style={styles.columns.date}>
                            {f.creationTime ? new Date(f.creationTime).toDateString() : '-'}
                          </TableRowColumn>
                          <TableRowColumn style={styles.columns.questions}>{f.questions.length}</TableRowColumn>
                          <TableRowColumn style={styles.columns.actions}>
                            <IconButton
                              tooltip='Show stats'
                              tooltipPosition={idx === 0 ? 'bottom-center' : 'top-center'}
                            >
                              <ShowChart/>
                            </IconButton>
                            <CopyToClipboard
                              text={this.getFormReplyPageURL(f.id)}
                              onCopy={() => this.setState({copied: true})}
                            >
                              <IconButton
                                tooltip='Copy link'
                                tooltipPosition={idx === 0 ? 'bottom-center' : 'top-center'}
                              >
                                <Link/>
                              </IconButton>
                            </CopyToClipboard>
                            <IconButton
                              tooltip='Delete form'
                              tooltipPosition={idx === 0 ? 'bottom-center' : 'top-center'}
                              onClick={() => this.onDeleteClick(f.id)}
                            >
                              <Delete/>
                            </IconButton>
                          </TableRowColumn>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                {forms.length === 0 &&
                <div className='center-xs'>
                  <div style={styles.noData}>
                    <div>No data</div>
                  </div>
                </div>
                }
              </Paper>
            </div>
          </div>
          {listFormsError && <Snackbar
            open={true}
            autoHideDuration={5000}
            message={listFormsError}
          />}
          {this.state.copied && <Snackbar
            open={true}
            autoHideDuration={5000}
            message='Form link copied to clipboard'
            onRequestClose={() => this.setState({copied: false})}
          />}
          {(this.props.isDeleted && this.state.deletedMsg) && <Snackbar
            open={true}
            autoHideDuration={5000}
            message='Form successfully deleted'
            onRequestClose={() => this.setState({deletedMsg: false})}
          />}
        </div>
      );
    } else {
      return (
        <div className='row center-xs'>
          <CircularProgress size={80} thickness={6}/>
        </div>
      );
    }
  }
}

ListFormsPage.propTypes = {
  listForms: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
  isListed: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  forms: PropTypes.array,
  listFormsError: PropTypes.string,
  deleteFormError: PropTypes.string
};

const mapStateToProps = (state) => {

  const {listForms, deleteForm} = state;
  const {isListed, forms, errorMessage: listFormsError} = listForms;
  const {isDeleted, errorMessage: deleteFormError} = deleteForm;

  return {
    isListed,
    isDeleted,
    forms,
    listFormsError,
    deleteFormError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    listForms: () => {
      dispatch(listForms())
    },
    deleteForm: (formId) => {
      dispatch(deleteForm(formId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFormsPage);
