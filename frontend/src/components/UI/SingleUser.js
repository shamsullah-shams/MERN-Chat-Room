import React, { useContext } from 'react';
import { Avatar, CardHeader } from "@mui/material";
import UserContext from '../../context/UserProvider';

const SingleUser = props => {
    const { setUser } = useContext(UserContext);

    // set the user in the header bar
    const clickHandler = (event) => {
        setUser(props.user);
    }
    return (
        <React.Fragment>
            <CardHeader
                avatar={(
                    <Avatar
                        src={`http://localhost:8080/${props.user.imageUrl}`}
                        onClick={clickHandler}
                    />
                )
                }
                title={props.user.name}
                subheader={props.user.createdAt}
            />
        </React.Fragment>
    );
};



export default SingleUser;