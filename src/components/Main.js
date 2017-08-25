import React from 'react';
import LeftNavComponent from 'components/LeftNav';


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'first'};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:8080/user-service/users/best';
    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Error server response')
        }
        return response.text();
      })
      .then((text) => {
        this.setState({
          text: text
        });
      });
  }

  render() {
    return (
      <div>
        <LeftNavComponent/>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;


