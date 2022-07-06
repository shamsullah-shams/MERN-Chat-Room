import * as actionTypes from "../action/actionTypes";

const initialState = {
    users: []
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REQUEST_REQUEST:
            return {
                loading: true,
                users: [],
            }
        case actionTypes.USER_REQUEST_SUCCESS:
            return {
                loading: false,
                users: action.payload,
            }
        case actionTypes.USER_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}


export default usersReducer;