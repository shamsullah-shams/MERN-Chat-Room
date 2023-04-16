import {
    TextField,
} from '@mui/material';
import React from "react";
import { useStyle } from "./Style";

const Input = (props) => {
    const classes = useStyle();
    return (
        <React.Fragment>
            <TextField
                required
                id="outlined-name-required"
                label={props.label}
                variant="outlined"
                className={classes.inputField}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
        </React.Fragment>
    )
}


export default Input;