import React from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {white} from 'material-ui/styles/colors'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    }
  }

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      },
      accountIcon: {
        height: 30,
        width: 30
      }
    };

    if (this.state.redirectToLogin)
      return (<Redirect to='/login'/>);

    return (
      <div>
        <AppBar
          style={{...styles, ...style.appBar}}
          iconElementLeft={
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white}/>
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu color={white}
                        iconButtonElement={
                          <IconButton iconStyle={style.accountIcon}><AccountCircle color={white}/></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem
                  primaryText="Logout"
                  leftIcon={<PowerSettingsNew/>}
                  onClick={this.props.onSignOutClick}/>
              </IconMenu>
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
