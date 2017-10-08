import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import LeftNav from '../components/LeftNav';
import {logoutUser} from '../actions/auth_action';

class Nav extends React.Component {
  render() {
    const {dispatch, isOpen, changeNavBar} = this.props;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: isOpen ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <div>
        <Header styles={styles.header}
                handleChangeRequestNavDrawer={() => changeNavBar()}
                onSignOutClick={() => dispatch(logoutUser())}/>

        <LeftNav navDrawerOpen={isOpen}
                 username="User Admin"/>

        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  changeNavBar: PropTypes.func.isRequired
};

export default Nav;
