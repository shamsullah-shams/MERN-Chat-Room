import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import openSocket from "socket.io-client";
import UserContext from '../context/UserProvider';
import useAuth from '../hooks/useAuth';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Chats.css"


const Chats = () => {

    const [chats, setChats] = useState([]);
    const { secondUser } = useContext(UserContext);
    const [req, setReq] = useState(0);
    const { auth } = useAuth();

    useEffect(() => {
        const loadChats = async () => {
            if (secondUser) {
                try {
                    const results = await axios.post('/api/chats', {
                        from: auth?.user._id,
                        to: secondUser._id
                    });
                    const newArray = results.data.map(element => {
                        if (element.from === auth.user._id) {
                            return {
                                ...element,
                                className: 'To'
                            }
                        } else {
                            return {
                                ...element,
                                className: 'From'
                            }
                        }
                    })
                    setChats(newArray);
                } catch (error) {
                    toast.error(error.message);
                }
            }
        }
        loadChats();
        const selectedDiv = document.getElementById('shouldBeScrolled');
        selectedDiv.scrollTop = selectedDiv.scrollHeight
    }, [secondUser, req]);

    useEffect(() => {
        const socket = openSocket('http://localhost:8080/');
        // @@ ---- If New Message
        socket.on('chats', data => {
            if (data.action === "newChat") {
                const newVar = req + 1;
                setReq(newVar);
            }
        })
    }, []);


    return (
        <div className='Chats'>
            {/* Showing Toast Notification */}
            <ToastContainer
                autoClose={5000}
            />
            <div id='shouldBeScrolled'>
                {
                    chats.map(m => (
                        <div key={m._id} className={m.className}>{m.message}</div>
                    ))
                }
            </div>

        </div>
    );
}



export default Chats;