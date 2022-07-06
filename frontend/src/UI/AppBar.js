import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'black',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
    },
    MainBar: {
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bolder',
        fontSize: '21px'
    },
    header: {
        backgroundColor: "darkblue"
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.header}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Chat Room In Web
                    </Typography>
                    <Button className={classes.logoutBtn} onClick={props.logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}