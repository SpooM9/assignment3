import React, { useContext, useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { selectAdminObj } from "../../store/adminStore";
import { useAppSelector } from "../../store/hooks";
import { AuthContext } from "../../contexts/authContext";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: 560,
      marginBottom: 10,
      margin: `${theme.spacing(1)}px auto`,
    },
    details: {
      display: "flex",
    },
    content: {
      flex: "1 0 auto",
      width: 400,
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

export function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const auth = useAppSelector(selectAdminObj);
  const authContext = useContext(AuthContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pic, setpic] = useState("")
  authContext.getAttributes().then((attributes: [CognitoUserAttribute]) => {
    console.log(attributes)
    attributes.forEach((attributes) => {
      if (attributes.Name === "email") {
        setemail(attributes.Value);
      }
      if (attributes.Name === "custom:isadmin") {
        setname(attributes.Value);
      }
      if (attributes.Name === "picture") {
        setpic(attributes.Value);
      }
    });
  });

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              email: {email}
            </Typography>
            <Typography component="h5" variant="h5">
              is Admin: {name === '1' ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={pic}
          title="profile pic"
        />
      </Card>
    </div>
  );
}
