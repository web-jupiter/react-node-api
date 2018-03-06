import React from "react";
import { connect } from "react-redux";
import clsx from 'clsx';
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import { AccountEdit, MapMarkerPlus, MapMarkerPath, DesktopMacDashboard  } from 'mdi-material-ui'
import useStyles from "./SidebarStyles";
import {STATE_SIDEBAR} from "../../../config/constants";
import { updateApplicationStateAction } from "../../../redux/actions";


const getListItemText = (item) => {
  switch (item) {
    case "profileEdit":
      return "Edit Profile";
    case "addTour":
        return "Add Tour";
    case "updateTour":
        return "Update Tour";
    case "dashboard":
        return "Dashboard";
    default:
      return "";
  }
}

const getListItemIcon = (item) => {
  switch (item) {
    case "profileEdit":
      return <AccountEdit />;
    case "addTour":
      return <MapMarkerPlus />;
    case "updateTour":
      return <MapMarkerPath />;
    case "dashboard":
      return <DesktopMacDashboard />;
    default:
      return <AccountEdit />;
  }
}

const SideBar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.drawerPaper]: !open || open
        }),
      }}
      open={open}
    >
      <div className={classes.toolbar} />
      <Typography variant="h6" component="h6" gutterBottom className={classes.sidebarHeading}>
        Tour Management
      </Typography>
      <List>
        {STATE_SIDEBAR.map(
          (item, index) => (
            <ListItem 
              selected={index === props.formState || false}
              button 
              key={item} 
              onClick={(e) => props.changeStateForApplication({selected: index})}
            >
              {/* <ListItemIcon> {getListItemIcon(item)} </ListItemIcon> */}
              <ListItemText primary={getListItemText(item)} />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  formState: PropTypes.number,
  changeStateForApplication: PropTypes.func
};


export const mapStateToProps = (state) => {
  const {user} = state;
  return {
    formState: user.formState
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    changeStateForApplication: options => {
      return dispatch(updateApplicationStateAction(options));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
