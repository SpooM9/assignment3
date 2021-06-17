import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setLoginDetails, setIsSuper } from "../../store/adminStore";
import { AuthContext } from "../../contexts/authContext";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Your Website
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState<"0" | "1">("0");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(email, password);
      dispatch(setIsSuper(true));
      dispatch(
        setLoginDetails({
          authKey: "test",
          id: "admin",
          name: "name",
          profileUrl:
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        })
      );
      const attributes:[CognitoUserAttribute] = await authContext.getAttributes();
      attributes.forEach(attributes => {
        if(attributes.Name === "custom:isadmin"){
          dispatch(setIsSuper(attributes.Value === '1'));
        }
      });
      history.push("/userMenu");
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        history.push("verify");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEmail(evt.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPassword(evt.target.value);
          }}
        />
        <Box mt={2}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signInClicked}
        >
          Sign In
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
