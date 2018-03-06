import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ATField from "../../features/AT-Field/ATField";
import ATButton from "../../features/AT-Button/ATButton";
import ATPhoto from "../../features/AT-Photo/ATPhoto";

import {fieldConfig} from "../../../config/fieldConfig";
import ErrorBoundary from "../Error/ErrorBoundry.react";
import {updateAuthFieldValueAction} from "../../../redux/actions";

const DEFAULT_RENDER_TYPE = 'ATField';

const renderAs = {
  ATField,
  ATButton,
  ATPhoto
}

class FormFields extends PureComponent{
  constructor (props) {
    super(props);
    const {field} = this.props;
    this.config = this.getConfig(field);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {name: this.config.name, value: null};
  }

  componentDidMount() {
    this.setState({value: this.props.inputValue || null});
  }

  handleOnChange (e) {
    this.setState({value: e.target.value});
  }

  handleUpdate() {
    const obj = {
      name: this.state.name, 
      value: this.state.value
    };
    this.props.handleFieldChange(obj)
  }

  getConfig(field){
    return fieldConfig[field];
  }

  render(){
    const {field, submitText} = this.props;
    const {fieldType, name, label, ...others} = this.config;

    const renderType = this.config.component || DEFAULT_RENDER_TYPE;
    const $component = renderAs[renderType];

    return(
      <ErrorBoundary>
        <$component 
          fieldType={fieldType} 
          id={field} 
          name={name} 
          label={label} 
          value={this.state.value} 
          {...others} 
          handleChange={e => this.handleOnChange(e)}
          handleBlur={this.handleUpdate}
          submitText={submitText || label}
        />
      </ErrorBoundary>
    )
  }

}

FormFields.propTypes = {
  field: PropTypes.string,
  name: PropTypes.string,
  submitText: PropTypes.string,
  handleFieldChange: PropTypes.func
}

export const mapStateToProps = (state) => {
  const {authForms} = state;
  return {
    submitText: authForms.submitText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (options) => {
      return dispatch(updateAuthFieldValueAction(options));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFields);