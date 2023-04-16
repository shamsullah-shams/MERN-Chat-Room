import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { Card, Avatar, CardHeader } from "@mui/material";

const singleUser = {
    name: "shamsullah",
    createdAt: "2022-12-12"
}

export const mainListItems = (
    <React.Fragment>
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
    </React.Fragment>
);