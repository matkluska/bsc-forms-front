import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import Save from 'material-ui/svg-icons/content/save'
import {blue600, pink500} from 'material-ui/styles/colors'

class FormCreatorPage extends React.Component {
  render() {
    const styles = {
      paper: {
        padding: 20,
        overflow: 'auto',
        margin: '2%'
      },
      saveBtn: {
        float: 'left'
      },
      addQuestionBtn: {
        margin: 0,
        top: 'auto',
        right: 90,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      },
      saveFormBtn: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      }
    };

    return (
      <div>
        <div className='row center-md'>
          <div className='col-md-8'>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  hintText='Form title'
                  floatingLabelText='Form title'
                  fullWidth={true}
                />
                <TextField
                  hintText='Description'
                  floatingLabelText='Description'
                  fullWidth={true}
                />
              </form>
            </Paper>
          </div>
        </div>
        <div className='row center-md'>
          <div className='col-md-8'>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  hintText='Form title'
                  floatingLabelText='Form title'
                  fullWidth={true}
                />
                <TextField
                  hintText='Description'
                  floatingLabelText='Description'
                  fullWidth={true}
                />
              </form>
            </Paper>
          </div>
        </div>
        <FloatingActionButton style={styles.addQuestionBtn} backgroundColor={pink500}>
          <ContentAdd/>
        </FloatingActionButton>
        <FloatingActionButton style={styles.saveFormBtn} backgroundColor={blue600}>
          <Save/>
        </FloatingActionButton>
      </div>
    );
  }
}

export default FormCreatorPage;
