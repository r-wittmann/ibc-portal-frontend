import React, { Component } from 'react';
import backendService from '../backendService';
import InputLabel from "./commons/InputLabel";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'new user',
            password: 'test123'
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        backendService.login(this.state.email, this.state.password)
            .then(() => this.props.history.push('/home'));
    };

    render() {
        return (
            <div>
                <div>
                    Login
                    <button onClick={() => this.props.history.push('/register')}>Register</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <InputLabel
                        label={'Email'}
                        value={this.state.email}
                        onChange={(email) => this.setState({ email })}/>
                    <InputLabel
                        label={'Password'}
                        type={'password'}
                        value={this.state.password}
                        onChange={(password) => this.setState({ password })}/>
                    <div>
                        <input type={'submit'} value={'Login'}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
