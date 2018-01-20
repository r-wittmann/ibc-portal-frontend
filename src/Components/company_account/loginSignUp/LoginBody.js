import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from '../../commons/InputLabel';
import { toast } from "react-toastify";
import queryString from 'query-string';

class LoginBody extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.hasAttribute('novalidate') && !event.target.checkValidity()) {
            event.stopPropagation();
            event.target.classList.add('was-validated')
        } else {
            backendService.login(this.state.name, this.state.password)
                .then(() => this.props.history.push('/company/home'))
                .catch(() => toast('Login nicht möglich. Unternehmensname oder Passwort sind falsch', { type: 'error' }));
        }
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
            name: queryString.parse(location.search).name ? queryString.parse(location.search).name : '',
            password: '',
        };
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ margin: 20 }} noValidate>
                <InputLabel
                    label={'Unternehmen'}
                    value={this.state.name}
                    required
                    onChange={(name) => this.setState({ name })}/>
                <InputLabel
                    label={'Passwort'}
                    type={'password'}
                    value={this.state.password}
                    required
                    onChange={(password) => this.setState({ password })}/>
                <div className={'float-right'}>
                    <button className={'btn btn-link'}
                            style={{ marginRight: 20, padding: 0 }}
                            type={'button'}
                            onClick={this.handleForgotPassword}>
                        Passwort vergessen?
                    </button>
                    <button className={'btn btn-primary'}>
                        Login
                    </button>

                </div>
            </form>
        );
    }
}

export default LoginBody;
