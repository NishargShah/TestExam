import axios, { setHeaderToken } from '../../../utils/axios';
import { NEW_USER, EXISTING_USER, AUTH_FAILED } from '../types';
import { getToken } from "../../../utils/util";

const newUser = () => ({
    type: NEW_USER
});

const existingUser = res => ({
    type: EXISTING_USER,
    payload: res.data.user
});

const authFailed = () => ({
    type: AUTH_FAILED
});

const loadUser = () => async dispatch => {
    const token = getToken();

    if (!token) return dispatch(newUser());
    setHeaderToken(token);

    try {
        const res = await axios({
            method: 'GET',
            url: '/me'
        });
        dispatch(existingUser(res));
    } catch (err) {
        dispatch(authFailed());
    }
};

export default loadUser;
