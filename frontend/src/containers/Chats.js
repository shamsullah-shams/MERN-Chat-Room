import React, { useContext } from 'react';
import ChatContext from '../context/ChatProvider';
import { List, ListItem } from '@mui/material';





const Chats = () => {

    const { messages } = useContext(ChatContext);

    return (
        <div className='Chats'>
            <h1>Recent Chats</h1>
            <List>
                {
                    messages &&
                    messages.map((m, i) => (
                        <ListItem>{m}</ListItem>
                    ))
                }
            </List>
        </div>
    );
}



export default Chats;