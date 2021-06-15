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

export function USerListMenu() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Chicken Briyani
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Indian
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            edit
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://cdn.concreteplayground.com/content/uploads/2017/08/Glamp-Cocktail-Bar-32-1920x1440.jpg"
                    title="Live from space album cover"
                />
            </Card>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Pasta
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Italian
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            edit
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://cdn.concreteplayground.com/content/uploads/2017/08/Glamp-Cocktail-Bar-32-1920x1440.jpg"
                    title="Live from space album cover"
                />
            </Card>
        </div>
    )
}