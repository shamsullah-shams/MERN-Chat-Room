import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { Avatar, CardHeader } from "@mui/material";
import List from '@mui/material/List';
import SingleUser from '../components/UI/SingleUser';


const arr = [
    {
        name: "shamsullah",
        createdAt: "2022-12-12"
    },
    {
        name: "Naqib",
        createdAt: "2022-12-12"
    },
    {
        name: "Jalil",
        createdAt: "2022-12-12"
    },
    {
        name: "Janan",
        createdAt: "2022-12-12"
    },
    {
        name: "Naqibullah",
        createdAt: "2022-12-12"
    },
    {
        name: "Khan Muhammad",
        createdAt: "2022-12-12"
    },

]
const Users = () => {
    return (
        <React.Fragment>
            <List component="nav" style={{ scrollbarColor: true }}>
                <ListSubheader component="div" inset>
                    Users
                </ListSubheader>
                {
                    arr.map((u, id) => (
                        <SingleUser
                            key={id}
                            user={u}
                        />
                    ))
                }
            </List>
        </React.Fragment>
    )
};


export default Users;