import React, {Component} from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

/**
 * @name ATButton @extends React.Component
 * @description A default button component which renders buttons for the whole application
 * @prop {string} buttonColor : color of the button
 * @prop {string} type: Type of the button as defined in Material UI default is submit
 * @prop {string} variant: Different variants from Material UI
 * @prop {string} textProp: Text inside the button
 * @prop {boolean} fullWidth: Should button take up the full width of the parent
 * @todo add stories
 */

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export class ATButton extends Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    const { disabled, mounted, classes, ...others } = this.props;
    const classNames = `${this.props.classes.button} ${this.state.class}`;
    const isFullWidth = this.props.isFullWidth ? true : false;
    return (
      <Button
        focusRipple
        margin="high"
        disabled={!mounted || disabled}
        type={this.props.type}
        variant={this.props.variant}
        color={this.props.buttonColor}
        className={classNames}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        fullWidth={isFullWidth}
        style={{ margin : '2rem'}}
      >
        {this.props.submitText}
      </Button>
    );
  }
}

ATButton.propTypes = {
  submitText: PropTypes.string,
  textProp: PropTypes.string,
  buttonColor: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  isFullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
  classes: PropTypes.object
}

ATButton.defaultProps = {
  buttonColor: "primary",
  type: "submit",
  variant: "outlined",
  isFullWidth: false,
  textProp: "Sign In",
  disabled: false,
  mounted: true,
  classes: {}
}

export default ATButton;