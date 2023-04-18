import React, { useContext } from 'react';
import { Avatar, CardHeader } from "@mui/material";

import UserContext from '../../context/UserProvider';



const SingleUser = props => {
    const { setSecondUser } = useContext(UserContext);


    // set the user in the header bar
    const clickHandler = async () => {
        setSecondUser(props.user);
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
                subheaderTypographyProps={{ color: 'white' }}
                title={props.user.name}
                subheader={props.user.createdAt}
            />
        </React.Fragment>
    );
};



export default SingleUser;