import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/action/user";


const Users = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction());
    }, []);

    const userData = useSelector(state => state.users);
    const { users, error, loading } = userData;

    return (
        <ul>
            {
                users.map(u => {
                    return (
                        <li key={u._id}>
                            {u.name}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Users;