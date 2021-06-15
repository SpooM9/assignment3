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
import {selectAdminObj} from '../../store/adminStore'
import { useAppSelector } from '../../store/hooks';
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

export function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const auth = useAppSelector(selectAdminObj)

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {auth.name}
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={auth.profileUrl}
                    title="profile pic"
                />
            </Card>
        </div>
    )
}