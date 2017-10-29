import React, { Component } from 'react';
import backendService from '../backendService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        backendService.register(this.state.email, this.state.password)
            .then(() => this.props.history.push('/login'));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>
                    Register
                    <button onClick={() => this.props.history.push('/login')}>Login</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            E-Mail:
                            <input
                                type={'text'}
                                value={this.state.email}
                                onChange={(event) => this.setState({ email: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>Password:
                            <input
                                type={'password'}
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <input type={'submit'} value={'Register'}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
