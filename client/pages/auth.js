import React, { useState } from "react";
import Router from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { login } from "../store/actions";
import { emailCheck, passwordCheck } from '../utils/validate-form';
import Home from "../components/shared/home";

const Auth = ({login, isAuthenticated}) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    (async() => {
        if (isAuthenticated) {
            await Router.replace('/');
        }
    })();

    const onSubmitHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const res = await login({email, password});
        setLoading(false);
        if (res) await Router.replace('/app');
    };

    return (
        <div className="mt-5">
            <Home sectionClass="loginForm" title="Login" header={false} nav={false}>
                <div className="offset-2 col-6 mx-auto">
                    <Form onSubmit={e => onSubmitHandler(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                {...emailCheck}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                {...passwordCheck}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
                    </Form>
                </div>
            </Home>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isUserLoaded: state.auth.isUserLoaded
});

Auth.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {login})(Auth);
