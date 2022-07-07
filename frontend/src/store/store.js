import { createStore, combineReducers, applyMiddleware } from "redux";
import messageReducer from "./reducer/message";
import usersReducer from "./reducer/user";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    messages: messageReducer,
    users: usersReducer,
});

const middleware = [thunk];
const initialState = {}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;