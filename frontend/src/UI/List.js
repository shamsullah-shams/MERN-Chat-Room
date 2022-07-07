import React, { useEffect, useState } from 'react';
import {
    Grid,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    makeStyles
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    ListContent: {
        width: 20
    },
    DeleteIconStyle: {
        marginLeft: 250,
    },
    EditIconStyle: {
        marginRight: 5,
    }
}));

export default function AlignItemsList(props) {
    const classes = useStyles();
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);


    let userId = '';

    useEffect(() => {
        // @@ ---- Get User Id From Local Storage
        const localStorageUserId = localStorage.getItem('user') ? localStorage.getItem('user') : false;
        if (localStorageUserId) {
            const user = JSON.parse(localStorageUserId);
            userId = user.user._id;

        }
        // @@ ---- to show the delete and update icons
        if (userId === props.message.userId) {
            setShowDeleteIcon(true);
        }
    }, []);




    return (
        <div>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src={`http://localhost:8080/${props.message.userImageUrl}`} />
                    </ListItemAvatar>
                    <ListItemText className={classes.ListContent}
                        primary={props.message.userName}
                        secondary={
                            <React.Fragment >
                                {props.message.message}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {
                    showDeleteIcon ?
                        <Grid className={classes.DeleteIconStyle} item xs={8}>
                            <EditIcon
                                className={classes.EditIconStyle}
                                onClick={() => { props.updateMessage(props.message) }}
                            />
                            <DeleteIcon
                                onClick={() => { props.deleteMessage(props.message._id) }}
                            />
                        </Grid>
                        : ''
                }
                <Divider variant="inset" component="li" />
            </List>
        </div>
    );
}