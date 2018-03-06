
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropzone, {useDropzone} from 'react-dropzone';
import RootRef from '@material-ui/core/RootRef';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '25vh',
    width: '50%',
    background: '#e1e1e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    borderRadius: '5%',
    margin: '0 auto',
    marginBottom : '2rem',
    maxWidth: '200px'
  }
})

function getChildren () {
  const classes = useStyles();
  const {getRootProps, getInputProps} = useDropzone();
  const {ref, ...rootProps} = getRootProps();

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps} className={classes.root} >
        <Typography variant="h5" component="h5">
            Upload a photo
        </Typography>
        <input {...getInputProps()} />
      </Paper>
    </RootRef>
  );
}

class ATPhoto extends Component {
  constructor(props) {
    super (props);
    this.state = {
      imageUrl : "",
      hasImage: null
    };
  }

  getImage () {
    return (
      <Paper >
        <img src={this.state.imageUrl}/>
      </Paper>
    )
  }

  getDropZone () {
    return (
      <Dropzone multiple={false} accept="image/jpg,image/png">
        {getChildren}
      </Dropzone>
    )
  }

  render() {
    return (!!this.state.hasImage ? this.getImage() : this.getDropZone());
  }
}

ATPhoto.propTypes = {
}

export default ATPhoto;