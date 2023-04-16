import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
        </Card><Card>
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