import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/action/user";
import { Card, CardHeader, Avatar } from '@material-ui/core';
import { useStyle } from "../../UI/Style";


const Users = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction());
    }, []);

    const userData = useSelector(state => state.users);
    const { users, error, loading } = userData;

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
