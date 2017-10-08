import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import conf from 'config';


class HomePage extends React.Component {

  componentDidMount() {
    console.log('start');
    let url = `${conf.serverURL}form-service/forms`;
    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    };
    fetch(url, config)
      .then(response =>
        response.json()
          .then(body => ({body, response}))
      ).then(({body}) => {
      console.log(body)
    }).catch(err => console.error('Error: ', err))
  }

  render() {
    return (
      <Card>
        <CardTitle title="React Application" subtitle="This is the home page."/>
      </Card>
    )
      ;
  }
}

export default HomePage;
