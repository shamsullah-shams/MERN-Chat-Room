import * as actionTypes from "./actionTypes";
import axios from "axios";

export const messagesAction = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.MESSAGE_REQUEST });
        const { data } = await axios.get('http://localhost:8080/api/getmessages');
        dispatch({
            type: actionTypes.MESSAGE_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.MESSAGE_REQUEST_FAIL,
            payload: error.message,
        });
    }

};