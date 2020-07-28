import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import store from "../store/store";
import { loadUser } from "../store/actions";
import "../styles/index.scss";

const app = ({Component, pageProps}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async() => {
            await store.dispatch(loadUser())
            setLoading(true);
        })();
    }, []);

    return (
        <Provider store={store}>
            {loading && <Component {...pageProps} />}
        </Provider>
    )
}

export default app;
