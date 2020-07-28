import React, {useState}  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Toast} from "react-bootstrap";

const Alert = ({alerts}) => {
    const [open, setOpen] = useState(true);

    const template = (i, timeout, errorType, message) => (
        <Toast key={i} onClose={() => setOpen(false)} show={open} className={errorType} role='alert'
               aria-live='assertive' aria-atomic='true' delay={timeout} autohide>
            <Toast.Header>
                <strong className="mr-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );

    return (
        <div aria-live="polite" aria-atomic="true" className="toast_block">
            <div className="toast_position">
                {
                    alerts !== null && alerts.length > 0 && alerts.map(({message, type, timeout}, i) => {
                        const errorType = type === 'error' ? 'bg-light' : 'bg-success';
                        return (
                            Array.isArray(message) ? message.map((cur, i) =>
                                template(i, timeout * ((i + 1) + (1 * (i + 1))), errorType, cur)
                            ) : (
                                template(i, timeout, errorType, message)
                            )
                        )
                    })
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    alerts: state.alert
});

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Alert);
