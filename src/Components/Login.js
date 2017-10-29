import React, { Component } from 'react';
import backendService from '../backendService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'new user',
            password: 'test123'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        backendService.login(this.state.email, this.state.password)
            .then(()=> this.props.history.push('/home'));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>Login</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            E-Mail:
                            <input type={'text'} onChange={(event) => this.setState({ email: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>Password:
                            <input type={'password'}
                                   onChange={(event) => this.setState({ password: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <input type={'submit'} value={'Submit'}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
