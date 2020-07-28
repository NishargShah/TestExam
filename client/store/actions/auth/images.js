import setAlert from "../alert";
import axios from '../../../utils/axios';
import { IMAGES_START, IMAGES_SUCCEED, IMAGES_FAILED } from '../types';

const imagesStarted = () => ({
    type: IMAGES_START
});

const imagesSuccess = () => ({type: IMAGES_SUCCEED});

const imagesFailed = () => ({
    type: IMAGES_FAILED
});

const images = () => async dispatch => {
    dispatch(imagesStarted());
    try {
        const res = await axios({
            method: 'GET',
            url: '/images'
        });
        dispatch(imagesSuccess());
        return res.data.images;
    } catch (err) {
        dispatch(imagesFailed(err));
        dispatch(setAlert(err.response.data.message, 'error'));
        return false;
    }
};

export default images;
