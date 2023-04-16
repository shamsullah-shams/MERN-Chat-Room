import React from "react";
import TextField from "@mui/material/TextField";
import './Form.css';



const Form = () => {
    return (
        <React.Fragment>
            <form className="Form">
                <TextField
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    placeholder="Enter New Message"
                />
            </form>
        </React.Fragment>
    );
}



export default Form;