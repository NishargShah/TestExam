import { v4 as uuidV4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "./types";

const setAlert = (message, type, timeout = 50000) => dispatch => {
    const id = uuidV4();
    dispatch({
        type: SET_ALERT,
        payload: { id, type, message, timeout }
    });
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        });
    }, timeout);
};

export default setAlert;
