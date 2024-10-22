import { Fragment } from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import Navigation from './nav';
import Alert from "../alert";

const Home = ({title = 'Project', nav = true, alert = true, sectionClass, children}) => {
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            <div id="home">
                {alert && <Alert/>}
                {nav && <Navigation/>}
                <main id="main">
                    <section id={sectionClass}>
                        {children}
                    </section>
                </main>
            </div>
        </Fragment>
    )
}

Home.propTypes = {
    title: PropTypes.string.isRequired,
    nav: PropTypes.bool,
    alert: PropTypes.array,
    sectionClass: PropTypes.string.isRequired
};

export default Home;
