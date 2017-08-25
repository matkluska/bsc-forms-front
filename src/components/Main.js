import React from 'react';
import LeftNavComponent from 'components/LeftNav';
import conf from 'config'


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'first'};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let url = conf.serverURL + 'user-service/users/best';
    console.log(conf.appEnv);
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


