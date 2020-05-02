import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import PersonOutline from "@material-ui/icons/PersonOutline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../redux/reducers/userReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1586622992874-27d98f198139?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form_container: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const styles = useStyles();

  if (user) {
    return null;
  }

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(
      login(username, password, () => {
        history.replace(from);
      })
    );
  };

  return (
    <Grid container component="main" className={styles.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={styles.form_container}>
          <Avatar className={styles.avatar}>
            <PersonOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in to the App
          </Typography>
          <form className={styles.form} onSubmit={onLogin}>
            <TextField
              id="in-username"
              label="Username"
              placeholder="Enter username"
              value={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
            <TextField
              id="in-password"
              type="password"
              label="Password"
              placeholder="Enter password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.button}
            >
              Log In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
