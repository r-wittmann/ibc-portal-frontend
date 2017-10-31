import React, { Component } from 'react';
import backendService from '../backendService';
import InputLabel from "./commons/InputLabel";

class Register extends Component {
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
            <div>
                <div>
                    Register
                    <button onClick={() => this.props.history.push('/login')}>Login</button>
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
                        <input type={'submit'} value={'Register'}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
