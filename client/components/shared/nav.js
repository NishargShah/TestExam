import { Fragment } from "react";
import Link from "next/link";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../store/actions";

const Navigation = ({auth: {isUserLoaded, isAuthenticated}, logout}) => {
    const regularLinks = (
        <Fragment>
            <Link href="/"><a>Home</a></Link>
            <Link href="/auth"><a>Sign In</a></Link>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <Link href="/"><a>Home</a></Link>
            <Link href="/app"><a>Dashboard</a></Link>
            <a onClick={logout}>Logout</a>
        </Fragment>
    )

    return (
        <nav id="navigation">
            {isUserLoaded && isAuthenticated ? authLinks : regularLinks }
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navigation);
