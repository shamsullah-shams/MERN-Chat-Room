import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const DescriptionAlerts = props => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{props.message}</strong>
            </Alert>
        </Stack>
    );
}


export default DescriptionAlerts;