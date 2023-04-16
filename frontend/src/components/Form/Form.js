import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import './Form.css';



const Form = () => {
    const [inputValue, setInputValue] = useState();


    const changeHandler = event => {
        setInputValue(event.target.value);
    }

    const onSubmitHandler = event => {
        event.preventDefault(event);
        setInputValue('');
    }


    return (
        <React.Fragment>
            <form className="Form" onSubmit={onSubmitHandler}>
                <TextField
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    placeholder="Enter New Message"
                    onChange={changeHandler}
                />
            </form>
        </React.Fragment>
    );
}



export default Form;