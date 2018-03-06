import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: theme.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.containerTopMargin
  }
}));

export default useStyles;