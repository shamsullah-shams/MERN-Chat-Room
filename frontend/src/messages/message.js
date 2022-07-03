import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesAction } from "../store/action/message";
import axios from "axios";

const Messages = () => {
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(messagesAction())
    }, []);

    const messag = useSelector(state => state.messages);
    const { messages, error, loading } = messag;

    const onChangeHandler = (event) => {
        setMessage(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/newmessage', {
            message: message
        })
            .then(result => {
                dispatch(messagesAction());
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <ul>
                {
                    messages.map(m => {
                        return (
                            <li key={m._id}>
                                {m.message}
                            </li>
                        )
                    })
                }
            </ul>
            <form onSubmit={submitHandler}>
                <input onChange={onChangeHandler} placeholder="Enter Message" />
                <button>send</button>
            </form>
        </>

    )
}


export default Messages;