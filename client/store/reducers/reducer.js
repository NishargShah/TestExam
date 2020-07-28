import { combineReducers } from "redux";
import { AuthReducer, AlertReducer } from './index';

const reducer = combineReducers({
    auth: AuthReducer,
    alert: AlertReducer
});

export default reducer;
