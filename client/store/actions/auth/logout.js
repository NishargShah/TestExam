import axios from '../../../utils/axios';
import { LOGOUT } from '../types';

const logoutSuccess = () => ({
    type: LOGOUT
});

const logout = () => async dispatch => {
    try {
        await axios({
            method: 'GET',
            url: '/logout',
            withCredentials: true
        });
        dispatch(logoutSuccess());
        return true;
    } catch (err) {
        return false;
    }
};

export default logout;
