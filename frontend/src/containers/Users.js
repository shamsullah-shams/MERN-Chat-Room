import React, { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import SingleUser from '../components/UI/SingleUser';
import axios from '../api/axios';
import openSocket from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import 'react-toastify/dist/ReactToastify.css';



const Users = () => {
    const [usersArray, setUsersArray] = useState([]);
    const [req, setReq] = useState(0);
    const { auth } = useAuth();
    const user = auth?.user;

    useEffect(() => {
        if (req === 1) {
            setReq(0);
        }
        const loadUsers = async () => {
            try {
                const results = await axios.get('/api/users');
                const newArray = results.data.filter(u => {
                    if (u._id !== user._id) {
                        u.createdAt = u.createdAt.toString().split('T')[0];
                        return u;
                    }
                });
                setUsersArray(newArray);
            } catch (error) {
                toast.error(error.message);
            }
        }
        // run the function
        loadUsers();
    }, [req]);

    useEffect(() => {
        const socket = openSocket('http://localhost:8080/');
        socket.on('newuser', data => {
            if (data.action === "newuser") {
                setReq(1);
            }
        })
    })



    return (
        <React.Fragment>
            {/* Showing Toast Notification */}
            <ToastContainer
                autoClose={5000}
            />
            <List component="nav" style={{ scrollbarColor: true }}>
                <ListSubheader component="div" inset>
                    Users
                </ListSubheader>
                {
                    usersArray.map((u, id) => (
                        <SingleUser
                            key={id}
                            user={u}
                        />
                    ))
                }
            </List>
        </React.Fragment>
    )
};


export default Users;