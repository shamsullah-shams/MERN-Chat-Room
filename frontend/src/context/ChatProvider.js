import React, { createContext, useState } from "react";

const ChatContext = createContext({});

export const ChatProvider = props => {
    const [chats, setChats] = useState([]);


    return (
        <ChatContext.Provider value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    )
}



export default ChatContext;