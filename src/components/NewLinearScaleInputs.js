import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class NewLinearScaleInputs extends React.Component {
  render() {

    const {data, handleMinChange, handleMinLabelChange, handleMaxChange, handleMaxLabelChange} = this.props;

    return (
      <div>
        <TextField
          hintText='Minimum value'
          floatingLabelText='Minimum value'
          type='number'
          value={data.min}
          onChange={handleMinChange(data.id)}
          fullWidth={true}
        />
        <TextField
          hintText='Minimum value label'
          floatingLabelText='Minimum value label'
          value={data.minLabel}
          onChange={handleMinLabelChange(data.id)}
          fullWidth={true}
        />
        <TextField
          hintText='Maximum value'
          floatingLabelText='Maximum value'
          type='number'
          value={data.max}
          onChange={handleMaxChange(data.id)}
          fullWidth={true}
        />
        <TextField
          hintText='Maximum value label'
          floatingLabelText='Maximum value label'
          value={data.maxLabel}
          onChange={handleMaxLabelChange(data.id)}
          fullWidth={true}
        />
      </div>
    );
  }
}

NewLinearScaleInputs.propTypes = {
  data: PropTypes.object.isRequired,
  handleMinChange: PropTypes.func.isRequired,
  handleMinLabelChange: PropTypes.func.isRequired,
  handleMaxChange: PropTypes.func.isRequired,
  handleMaxLabelChange: PropTypes.func.isRequired
};

export default NewLinearScaleInputs;
