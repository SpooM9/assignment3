import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { CustomerType } from '../../store/customerStore';
import { useAppDispatch } from '../../store/hooks';
import { setType } from '../../store/customerStore'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            paddingTop: 40
        },
        card: {
            display: 'flex',
            width: 450,
            marginRight: 10
        },
        details: {
            display: 'flex',
        },
        content: {
            flex: '1 0 auto',
            width: 200
        },
        cover: {
            width: 250,
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

export function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useAppDispatch();
  
    const openMenu = (type: CustomerType) => {
        if(type === CustomerType.DELIVER){
            dispatch(setType(CustomerType.DELIVER))
            history.push("/address");
        } else {
            dispatch(setType(CustomerType.DININ))
            history.push("/userMenu");
        }
    }

    return (
        <div className={classes.root}>
            <Card onClick={() => openMenu(CustomerType.DININ)} className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Dine-In
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Eat in style
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://dinein.me/assets/dine-in-exceptional-dining.jpg"
                    title="Dine-In"
                />
            </Card>
            <Card onClick={() => openMenu(CustomerType.DELIVER)} className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Get it delivered
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Eat in comfort
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://get-it-delivered.co.uk/app/uploads/2020/09/orange-logo-e1600264764572.png"
                    title="Get it delivered"
                />
            </Card>
        </div>
    )
}