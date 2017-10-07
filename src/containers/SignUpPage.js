import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {grey500, white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {registerUser} from '../actions/register_action'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      usernameError: '',
      passwordError: '',
      emailError: '',
      confirmPasswordError: '',
      isUsernameFieldValid: false,
      isPasswordValid: false,
      isEmailFieldValid: false,
      formError: props.errorMessage
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errorMessage)
      this.setState({
        formError: nextProps.errorMessage
      })
  }

  handleSubmitClick = () => {
    this.handleUsernameBlur();
    this.handlePasswordBlur();
    this.handleConfirmPasswordBlur();
    if (this.state.username && this.state.password && this.state.confirmPassword)
      this.props.onSignInClick(
        this.state.username,
        this.state.email,
        this.state.password
      )
  };

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
      isUsernameFieldValid: !!event.target.value,
      usernameError: '',
      formError: ''
    })
  };

  handlePasswordChange = (event) => {
    let pass = event.target.value;
    let isPassValid = pass && this.state.confirmPassword && this.state.confirmPassword === pass;
    this.setState({
      password: pass,
      isPasswordValid: isPassValid,
      passwordError: (isPassValid || !this.state.confirmPassword) ? '' : 'Passwords are not equal',
      confirmPasswordError: '',
      formError: ''
    })
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
      isEmailFieldValid: !!event.target.value,
      emailError: '',
      formError: ''
    })
  };

  handleConfirmPasswordChange = (event) => {
    let pass = event.target.value;
    let isConfirmValid = pass && this.state.password && this.state.password === pass;
    this.setState({
      confirmPassword: pass,
      isPasswordValid: isConfirmValid,
      passwordError: '',
      confirmPasswordError: (isConfirmValid || !this.state.password) ? '' : 'Passwords are not equal',
      formError: ''
    })
  };

  handleUsernameBlur = () => {
    if (!this.state.username)
      this.setState({usernameError: 'Required'})
  };

  handlePasswordBlur = () => {
    if (!this.state.password)
      this.setState({passwordError: 'Required'});
  };

  handleEmailBlur = () => {
    if (!this.state.email)
      this.setState({emailError: 'Required'})
  };

  handleConfirmPasswordBlur = () => {
    if (!this.state.confirmPassword)
      this.setState({confirmPasswordError: 'Required'});
  };

  render() {
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      buttonsDiv: {
        textAlign: 'center',
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: 'left',
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      loginBtn: {
        float: 'right'
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: '#4f81e9'
      },
      btnGoogle: {
        background: '#e14441'
      },
      btnSpan: {
        marginLeft: 5
      }
    };

    const {isRegistered} = this.props;

    if (isRegistered) {
      return (
        <Redirect to={'/login'}/>
      )
    }

    return (
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            {this.state.formError &&
            <Snackbar
              open={true}
              autoHideDuration={5000}
              message={this.state.formError}
            />}
            <form>
              <TextField
                hintText="Username"
                floatingLabelText="Username"
                errorText={this.state.usernameError}
                fullWidth={true}
                value={this.state.username}
                onChange={this.handleUsernameChange}
                onBlur={this.handleUsernameBlur}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.handleSubmitClick()
                  }
                }}
              />
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                errorText={this.state.emailError}
                fullWidth={true}
                value={this.state.email}
                onChange={this.handleEmailChange}
                onBlur={this.handleEmailBlur}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.handleSubmitClick()
                  }
                }}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                errorText={this.state.passwordError}
                fullWidth={true}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                onBlur={this.handlePasswordBlur}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.handleSubmitClick()
                  }
                }}
                type="password"
              />
              <TextField
                hintText="Confirm Password"
                floatingLabelText="Confirm Password"
                errorText={this.state.confirmPasswordError}
                fullWidth={true}
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
                onBlur={this.handleConfirmPasswordBlur}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.handleSubmitClick()
                  }
                }}
                type="password"
              />

              <RaisedButton label="Sign In"
                            primary={true}
                            style={styles.loginBtn}
                            onClick={this.handleSubmitClick}
                            disabled={!(this.state.isPasswordValid &&
                              this.state.isUsernameFieldValid &&
                              this.state.isEmailFieldValid )}
              />
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={styles.btnSpan}>Sign in with Facebook</span>
            </Link>
            <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={styles.btnSpan}>Sign in with Google</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isRegistered: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => {

  const {auth, registration} = state;
  const {isAuthenticated} = auth;
  const {isRegistered, errorMessage} = registration;

  return {
    isAuthenticated,
    isRegistered,
    errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInClick: (username, email, password) => {
      dispatch(registerUser({
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
      }))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
