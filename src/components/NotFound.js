import React from 'react';
import PropTypes from 'prop-types'
import Block from 'material-ui/svg-icons/content/block'


class NotFound extends React.Component {

  render() {
    const styles = {
      title: {
        fontWeight: 'semibold'
      },
      icon: {
        width: '9em',
        height: '9em'
      },
      message: {
        opacity: 0.5,
        fontSize: 18
      }
    };

    const {message} = this.props;

    return (
      <div>
        <div className='center-md' style={styles.container}>
          <div style={styles.message}>
            <Block style={styles.icon}/>
            <h2 style={styles.title}>Page Not Found</h2>
            <div>{message}</div>
          </div>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  message: PropTypes.string.isRequired
};

export default NotFound;
