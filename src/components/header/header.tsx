import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../../store/adminStore'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthContext, AuthStatus } from '../../contexts/authContext';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(isLoggedIn)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const authAWS = useContext(AuthContext)
    const [isadmin, setisadmin] = useState(false);
    authAWS.getAttributes().then((attributes: [CognitoUserAttribute]) => {
      console.log(attributes)
      attributes.forEach((attributes) => {
        if (attributes.Name === "custom:isadmin") {
            setisadmin(attributes.Value === '1' ? true : false);
        }
      });
    });
    const handelLogout = () => {
        handleClose()
        authAWS.signOut()
        dispatch(logout())
    }

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}> UrMenu </Typography>
                {authAWS.authStatus === AuthStatus.SignedIn && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to={'/profile'} style={{ color: 'black', textDecoration: 'none' }}>
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to={'/createMenu'} style={{ color: 'black', textDecoration: 'none' }}>
                                    Create Item
                                </Link>
                            </MenuItem>
                            {isadmin && <>
                                <MenuItem onClick={handleClose}>
                                    <Link to={'/userMenu'} style={{ color: 'black', textDecoration: 'none' }}>
                                        List Items
                                    </Link>
                                </MenuItem>
                            </>}
                            <MenuItem onClick={handelLogout} >
                                <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
                                    Logout
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}
