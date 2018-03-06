import React from "react";
import Typography from '@material-ui/core/Typography';


const SectionHeader = (props) => {
  console.log(props);
  const text = props.textProp;
  return (
    <React.Fragment >
      <Typography variant="h5" component="h5" gutterBottom >
         <b>{text} </b> 
      </Typography>
    </React.Fragment>

  );
}

export default SectionHeader;