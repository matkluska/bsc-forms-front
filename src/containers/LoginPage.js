import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {loginUser} from '../action'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmitClick = () => {
    console.log(this.state.username);
    this.props.dispatch(loginUser({
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }))
  };

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
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

    const {isAuthenticated} = this.props;

    if (isAuthenticated) {
      return(
      <Redirect to={'/'}/>
      )
    }

    return (
      <div>
        <div style={styles.loginContainer}>

          <Paper style={styles.paper}>
            <form>
              <TextField
                hintText="Username"
                floatingLabelText="Username"
                fullWidth={true}
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                type="password"
              />

              <div>
                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                />

                <RaisedButton label="Login"
                              primary={true}
                              style={styles.loginBtn}
                              onClick={this.handleSubmitClick}
                />
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="Register"
              href="/"
              style={styles.flatButton}
              icon={<PersonAdd/>}
            />

            <FlatButton
              label="Forgot Password?"
              href="/"
              style={styles.flatButton}
              icon={<Help/>}
            />
          </div>

          <div style={styles.buttonsDiv}>
            <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={styles.btnSpan}>Log in with Facebook</span>
            </Link>
            <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={styles.btnSpan}>Log in with Google</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default LoginPage;
