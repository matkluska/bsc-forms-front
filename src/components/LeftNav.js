import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import {spacing, typography} from 'material-ui/styles'
import {blue600, white} from 'material-ui/styles/colors'
import Home from 'material-ui/svg-icons/action/home'
import BorderColor from 'material-ui/svg-icons/editor/border-color'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'


class LeftNav extends React.Component {

  render() {
    const styles = {
      logo: {
        cursor: 'pointer',
        fontSize: 22,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: blue600,
        paddingLeft: 40,
        height: 56
      },
      menuItem: {
        color: white,
        fontSize: 14
      }
    };

    const {navDrawerOpen, onSignOutClick} = this.props;

    return (
      <div>
        <Drawer
          docked={true}
          open={navDrawerOpen}
        >
          <div style={styles.logo}>
            BSc Forms
          </div>
          <MenuItem
            primaryText="My Forms"
            containerElement={<Link to="/"/>}
            style={styles.menuItem}
            leftIcon={<Home/>}
          />
          <MenuItem
            primaryText="Form Creator"
            containerElement={<Link to="/creator"/>}
            style={styles.menuItem}
            leftIcon={<BorderColor/>}
          />
          <MenuItem
            primaryText="Logout"
            onClick={onSignOutClick}
            style={styles.menuItem}
            leftIcon={<PowerSettingsNew/>}
          />
        </Drawer>
      </div>
    );
  }
}


LeftNav.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  navDrawerOpen: PropTypes.bool,
  username: PropTypes.string
};

export default LeftNav;
