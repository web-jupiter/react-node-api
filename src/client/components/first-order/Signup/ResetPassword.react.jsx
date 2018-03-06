import React from "react";

export const ResetPassword = (props) => {
  const {classes, fields, headerText} = props;
  const items = fields.map((field,i) => <FormFields key={`${field}-${i}`} field={field}/>);
  return (
    <React.Fragment>
      <LogInHeader  textProp={headerText}/>
      <form  className={classes.form} >
          {items}
      </form>
    </React.Fragment>

  )
}

export default ResetPassword;