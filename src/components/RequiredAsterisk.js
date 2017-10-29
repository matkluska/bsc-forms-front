import React from 'react'


class RequiredAsterisk extends React.Component {
  render() {
    const styles = {
      requiredQuestion: {
        color: 'red'
      }
    };
    return (
      <span style={styles.requiredQuestion}>*</span>
    )
  }
}

export default RequiredAsterisk;
