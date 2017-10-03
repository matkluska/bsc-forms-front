import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import LeftNav from '../components/LeftNav';
import {logoutUser} from '../actions/auth_action';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: props.width === LARGE
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let {navDrawerOpen} = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    const {dispatch} = this.props;

    return (
      <div>
        <Header styles={styles.header}
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                onSignOutClick={() => dispatch(logoutUser())}/>

        <LeftNav navDrawerOpen={navDrawerOpen}
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
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(Nav);
