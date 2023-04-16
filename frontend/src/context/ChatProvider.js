import React, { createContext, useState } from "react";

const ChatContext = createContext({});

export const ChatProvider = props => {
    const [messages, setMessages] = useState([]);


    return (
        <ChatContext.Provider value={{ messages, setMessages }}>
            {props.children}
        </ChatContext.Provider>
    )
}



export default ChatContext;