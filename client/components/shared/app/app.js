import { Fragment, useEffect } from 'react';
import Head from "next/head";
import Router from "next/router";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const App = ({title = 'Project', sectionClass, auth : {isUserLoaded, isAuthenticated},  children}) => {
    useEffect(() => {
        (async () => {
            if (isUserLoaded && !isAuthenticated) {
                await Router.replace('/');
            }
        })();
    });

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            <div id="app">
                <main id="main">
                    <section id={sectionClass}>
                        {children}
                    </section>
                </main>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

App.propTypes = {
    title: PropTypes.string.isRequired,
    sectionClass: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App);
