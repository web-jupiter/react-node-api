import React, {Component} from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import { capitalize } from '@material-ui/core/utils';

/**
 * @name ATField @extends React.Component
 * @description Field Component for adventure Tripper
 * @prop {string} textProp 
 */

export class ATField extends Component {
  getTextField() {
    const {variant, id, label, name, autoCompleteProp, isRequired, handleChange, margin, handleBlur} = this.props
    return (
      <TextField
        variant= {variant}
        margin={margin}
        required = {isRequired ? true: false}
        id={id || name}
        label={label || name}
        name={name}
        fullWidth
        autoFocus
        autoComplete={String(autoCompleteProp)}
        onChange={e => handleChange(e)}
        onBlur={e=> handleBlur(e)}
      />
    );
  }
  getSelect() {
    const {variant, id, label, name, input,value, handleChange} = this.props
    return (
      <Select
        variant= {variant}
        input
        margin={margin}
        fullWidth
        id={id || name}
        label={label || name}
        name={name}
        displayEmpty
        autoFocus
        value
        onChange={e => handleChange(e)}
      />
    );
  }

  getMenuItem() {
    const {value, textProp} = this.props;
    return (<MenuItem value={value}>{textProp}</MenuItem>)
  }

  getFinalComponent() {
    const {fieldType} = this.props;

    switch (fieldType) {
      case "TextField":
        return this.getTextField();
      case "Select":
        return this.getSelect();
      case "MenuItem":
        return this.getMenuItem();
      default:
        return null;
    }
  }
  render(){
    return this.getFinalComponent();
  }
}

ATField.propTypes = {
  textProp: PropTypes.string,
  fieldType: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  autoCompleteProp: PropTypes.bool,
  handleChange: PropTypes.func
}

ATField.defaultProps = {
  fieldType: "TextField",
  type:"email",
  variant: "standard",
  autoCompleteProp: true,
  margin: "normal"
}

export default ATField;