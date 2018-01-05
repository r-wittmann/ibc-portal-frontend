import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";

class Notification extends Component {


    render() {
        return (
            <ToastContainer
                position={'top-left'}
                hideProgressBar={true}
                style={{ marginTop: 60 }}
            />
        );
    }
}

export default Notification;
