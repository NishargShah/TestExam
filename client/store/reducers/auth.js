import React from "react";
import { SIGNIN_SUCCEED, SIGNIN_FAILED, EXISTING_USER, AUTH_FAILED, LOGOUT } from '../actions/types';

const initialAuthState = {
    isAuthenticated: null,
    isUserLoaded: false,
    user: null
};

const AuthReducer = (state = initialAuthState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SIGNIN_SUCCEED:
        case EXISTING_USER:
            return {
                ...state,
                user: { ...payload },
                isAuthenticated: true,
                isUserLoaded: true
            }

        case SIGNIN_FAILED:
        case LOGOUT:
        case AUTH_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                isUserLoaded: false,
                user: null
            }

        default:
            return state
    }
}

export default AuthReducer;
