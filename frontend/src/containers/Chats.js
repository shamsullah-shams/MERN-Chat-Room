import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { List, ListItem } from '@mui/material';
import openSocket from "socket.io-client";
import UserContext from '../context/UserProvider';
import useAuth from '../hooks/useAuth';







const Chats = () => {

    const [chats, setChats] = useState([]);
    const { secondUser } = useContext(UserContext);
    const [req, setReq] = useState(0);
    const { auth } = useAuth();

    useEffect(() => {
        if (req === 1) {
            setReq(0);
        }
        const loadChats = async () => {
            if (secondUser) {
                try {
                    const results = await axios.post('/api/chats', {
                        from: auth?.user._id,
                        to: secondUser._id
                    });
                    setChats(results.data);
                } catch (error) {
                    console.log(error)
                }
            }
        }
        loadChats();
    }, [secondUser, req]);


    useEffect(() => {
        const socket = openSocket('http://localhost:8080/');
        // @@ ---- If New Message
        socket.on('chats', data => {
            if (data.action === "newChat") {
                console.log('action received');
                setReq(1);
            }
        })
    }, []);


    return (
        <div className='Chats'>
            <h1>some messages</h1>
            <List>
                {
                    chats.map(m => (
                        <ListItem key={m._id}>{m.message}</ListItem>
                    ))
                }
            </List>

        </div>
    );
}



export default Chats;