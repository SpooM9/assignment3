import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: 360,
            marginBottom: 10,
            margin: `${theme.spacing(1)}px auto`,
        },
        details: {
            display: 'flex',
        },
        content: {
            flex: '1 0 auto',
            width: 200
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);

export function ListUser() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Name: Spoorthi
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Email: spoo@gmail.com
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Type: Employee
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    title="Live from space album cover"
                />
            </Card>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Name: shreyas
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Email: shreyas@gmail.com
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Type: Employee
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    title="Live from space album cover"
                />
            </Card>
        </div>
    )
}