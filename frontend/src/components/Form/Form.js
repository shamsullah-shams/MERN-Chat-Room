import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import useAuth from '../../hooks/useAuth';
import UserContext from "../../context/UserProvider";
import axios from '../../api/axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Form.css';


const InputStyle = {
    backgroundColor: "#494949",
    color: '#fff',
    WebkitTextFillColor: '#fff',
    display: 'flex',
    flexDirection: 'column'
}

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const { auth } = useAuth();
    const { secondUser } = useContext(UserContext);

    const changeHandler = event => {
        setInputValue(event.target.value);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault(event);
        setInputValue('');

        if (inputValue.length !== '') {
            try {
                await axios.post('/api/chats/create', {
                    from: auth.user._id,
                    to: secondUser._id,
                    message: inputValue
                });
            } catch (error) {
                toast.error(error.message);
            }

        }
    }


    return (
        <React.Fragment>
            {/* Showing Toast Notification */}
            <ToastContainer
                autoClose={5000}
            />
            <form className="Form" onSubmit={onSubmitHandler}>
                <TextField
                    sx={InputStyle}
                    placeholder="Type New Message"
                    onChange={changeHandler}
                    value={inputValue}
                    autoComplete="off"
                />
            </form>
        </React.Fragment>
    );
}



export default Form;