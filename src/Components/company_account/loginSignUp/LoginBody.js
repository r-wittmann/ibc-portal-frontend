import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';
import { toast } from "react-toastify";

class LoginBody extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        backendService.login(this.state.name, this.state.password)
            .then(() => this.props.history.push('/home'));
    };

    handleForgotPassword = (event) => {
        event.preventDefault();
        backendService.forgotPassword(this.state.name)
            .then(() => toast('Neues Passwort wird ihnen per E-Mail zugeschickt', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ margin: 20 }}>
                <InputLabel
                    label={'Benutzername'}
                    value={this.state.name}
                    onChange={(name) => this.setState({ name })}/>
                <InputLabel
                    label={'Passwort'}
                    type={'password'}
                    value={this.state.password}
                    onChange={(password) => this.setState({ password })}/>
                <div className={'float-right'}>
                    <button className={'btn btn-link'}
                            style={{ marginRight: 20, padding: 0 }}
                            onClick={this.handleForgotPassword}>
                        Passwort vergessen?
                    </button>
                    <input className={'btn btn-primary'} type={'submit'} value={'Login'}/>

                </div>
            </form>
        );
    }
}

export default LoginBody;
