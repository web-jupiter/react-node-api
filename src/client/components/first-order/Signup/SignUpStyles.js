import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebar: {
    background: theme.palette.background.light,
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(16, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    background: theme.palette.background.light,
    padding: "2rem 3rem",
    textTransform: "Capitalize",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  field: {
    margin: theme.spacing(4, 0, 0, 0),
    textTransform: "Capitalize",
  },
  header: {
    boxShadow: '0px 18px 8px -20px #36A79B',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;