import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {blue600, white} from 'material-ui/styles/colors';
import Home from 'material-ui/svg-icons/action/home';


class LeftNav extends React.Component {

  render() {
    const style = {
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

    return (
      <div>
        <Drawer
          docked={true}
          open={this.props.navDrawerOpen}
        >
          <div style={style.logo}>
            BSc Forms
          </div>
          <MenuItem
            primaryText="Home"
            containerElement={<Link to="/"/>}
            style={style.menuItem}
            leftIcon={<Home/>}
          />
          <MenuItem
            primaryText="Form Creator"
            containerElement={<Link to="/creator"/>}
            style={style.menuItem}
          />
        </Drawer>
      </div>
    );
  }
}


LeftNav.propTypes = {
  navDrawerOpen: PropTypes.bool,
  username: PropTypes.string
};

export default LeftNav;
