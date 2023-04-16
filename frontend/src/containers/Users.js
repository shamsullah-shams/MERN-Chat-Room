import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { Card, Avatar, CardHeader } from "@mui/material";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const singleUser = {
    name: "shamsullah",
    createdAt: "2022-12-12"
}

const Users = () => {
    return (
        <React.Fragment>

            <List component="nav" style={{ scrollbarColor: true }}>
                <ListSubheader component="div" inset>
                    Users
                </ListSubheader>
                <Card>
                    <CardHeader
                        avatar={(
                            <Avatar
                                src={`http://localhost:8080/${singleUser.imageUrl}`}
                            />
                        )
                        }
                        title={singleUser.name}
                        subheader={singleUser.createdAt}
                    />
                </Card>
                <Divider sx={{ my: 1 }} />
            </List>
        </React.Fragment>
    )
};


export default Users;