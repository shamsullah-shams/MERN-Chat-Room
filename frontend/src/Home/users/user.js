import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/action/user";
import { Card, CardHeader, Avatar } from '@material-ui/core';
import { useStyle } from "../../UI/Style";
import openSocket from "socket.io-client";


const Users = () => {
    // @@ --- Style Classess From makeStyle Hook
    const classes = useStyle();
    // @@ ---- Dispatch Actions from Redux
    const dispatch = useDispatch();
    // @@ ---- For Refresh the component
    const [req, setReq] = useState(0);

    // @@ ---- Dispatch Users Action 
    useEffect(() => {
        if (req === 1) {
            setReq(0);
        }
        dispatch(userAction());
    }, [req]);

    // @@ ---- Open Socket When New User signs up 
    useEffect(() => {
        const socket = openSocket('http://localhost:8080/');
        socket.on('newuser', data => {
            if (data.action === "newuser") {
                setReq(1);
            }
        })
    })

    // @@ ---- Get Users From State of Redux
    const userData = useSelector(state => state.users);
    const { users } = userData;

    const allUsers = users.map(singleUser => {
        return (
            <div className={classes.usersCard} key={singleUser._id}>
                <Card>
                    <CardHeader
                        avatar={(
                            <Avatar
                                src={`http://localhost:8080/${singleUser.imageUrl}`}
                            />
                        )
                        }
                        title={singleUser.name}
                        subheader={singleUser.createdAt}
                    />
                </Card>
            </div>
        )
    })

    return (
        <>
            {allUsers}
        </>

    );
}

export default Users;
