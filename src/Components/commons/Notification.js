import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";

class Notification extends Component {


    render() {
        return (
            <ToastContainer
                position={'bottom-left'}
                hideProgressBar={true}
            />
        );
    }
}

export default Notification;
