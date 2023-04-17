import React, { createContext, useState } from 'react';


const UserContext = createContext({});

export const UserProvider = props => {
    const [secondUser, setSecondUser] = useState(null);

    return (
        <UserContext.Provider value={{ secondUser, setSecondUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;