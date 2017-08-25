import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class LeftNavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            docked={false}
            open={this.state.open}>
            <MenuItem onClick={this.handleClose}>Menu Item 1</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 3</MenuItem>
          </Drawer>
          <AppBar title='BSc forms'
                  onLeftIconButtonTouchTap={this.handleToggle}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default LeftNavComponent;
