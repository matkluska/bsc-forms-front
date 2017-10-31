import React from 'react';
import PropTypes from 'prop-types'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'


class Success extends React.Component {

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
        <div className='center-xs' style={styles.container}>
          <div style={styles.message}>
            <CheckCircle style={styles.icon}/>
            <h2 style={styles.title}>Success</h2>
            <div>{message}</div>
          </div>
        </div>
      </div>
    );
  }
}

Success.propTypes = {
  message: PropTypes.string.isRequired
};

export default Success;
