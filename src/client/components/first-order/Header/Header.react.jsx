import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import imageSrc from "../../../images/logo.png";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "transparent",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    maxWidth: "220px",
    maxHeight: "100px"
  }
}));

const Header = props => {
  useEffect(() => {
    const logoImage = document.getElementById("atLogoImage");
    logoImage.src = imageSrc;
  });
  const classes = useStyles();
  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      color="inherit"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <img id="atLogoImage" alt="PhotoTripr logo" className={classes.logo} />
    </AppBar>
  );
};

export default Header;
