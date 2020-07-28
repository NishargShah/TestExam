import setAlert from "../alert";
import axios from '../../../utils/axios';
import { SIGNIN_START, SIGNIN_SUCCEED, SIGNIN_FAILED } from '../types';

const loginStarted = () => ({
    type: SIGNIN_START
});

const loginSuccess = res => ({
    type: SIGNIN_SUCCEED,
    payload: res.data.user
});

const loginFailed = () => ({
    type: SIGNIN_FAILED
});

const login = data => async dispatch => {
    dispatch(loginStarted());
    try {
        const res = await axios({
            method: 'POST',
            url: '/login',
            data,
            withCredentials: true
        });
        dispatch(loginSuccess(res));
        return true;
    } catch (err) {
        dispatch(loginFailed(err));
        dispatch(setAlert(err.response.data.message, 'error'));
        return false;
    }
};

export default login;
