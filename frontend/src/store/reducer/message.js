import * as actionTypes from "../action/actionTypes";

const initialState = {
    messages: []
}


const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGE_REQUEST:
            return {
                loading: true,
                messages: [],
            }
        case actionTypes.MESSAGE_REQUEST_SUCCESS:
            return {
                loading: false,
                messages: action.payload,
            }
        case actionTypes.MESSAGE_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
};


export default messageReducer;