import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesAction } from "../../store/action/message";
import { CardContent } from "@material-ui/core";
import List from "../../UI/List";
import { useStyle } from "../../UI/Style";
import axios from "axios";

const Messages = (props) => {
    const classes = useStyle();
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(messagesAction())
    }, []);

    const messag = useSelector(state => state.messages);
    const { messages, error, loading } = messag;

    // const onChangeHandler = (event) => {
    //     setMessage(event.target.value);
    // }

    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     axios.post('http://localhost:8080/api/newmessage', {
    //         message: message
    //     })
    //         .then(result => {
    //             dispatch(messagesAction());
    //         })
    //         .catch(error => console.log(error));
    // }

    const allMessages = messages.map(ch => {
        return (
            <List message={ch} key={ch._id} />
        )
    });


    return (
        <>
            {allMessages}
        </>

    )
}


export default Messages;