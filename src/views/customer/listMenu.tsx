import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext, AuthStatus } from "../../contexts/authContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: 360,
      marginBottom: 10,
      margin: `${theme.spacing(1)}px auto`,
    },
    details: {},
    content: {
      flex: "1 0 auto",
      width: 200,
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

export function USerListMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://urmenu-env.eba-9cbkqy3k.ap-southeast-2.elasticbeanstalk.com/public/menus")
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setList(data.users);
        }
      });
  }, []);
  return (
    <div>
      {list.map((item: any) => (
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.subtitle}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {authContext.authStatus === AuthStatus.SignedIn
                  ? "edit"
                  : "add to cart"}
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image={item.imageUrl}
            title="Live from space album cover"
          />
        </Card>
      ))}
    </div>
  );
}
