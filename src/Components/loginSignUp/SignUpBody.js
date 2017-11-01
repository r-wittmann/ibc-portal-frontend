import React, { Component } from 'react';
import backendService from '../../backendService';
import InputLabel from '../commons/InputLabel';

class SignUpBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        backendService.register(this.state.email, this.state.password)
            .then(() => this.props.history.push('/login'));
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ margin: 20 }}>
                <InputLabel
                    label={'Email'}
                    type={'email'}
                    value={this.state.email}
                    onChange={(email) => this.setState({ email })}/>
                <InputLabel
                    label={'Passwort'}
                    type={'password'}
                    value={this.state.password}
                    onChange={(password) => this.setState({ password })}/>
                <div className={'float-right'}>
                    <input className={'btn btn-primary'} type={'submit'} value={'Registrieren'}/>
                </div>
            </form>
        );
    }
}

export default SignUpBody;
