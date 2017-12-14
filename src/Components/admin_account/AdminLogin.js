import React, { Component } from 'react';
import backendService from '../../backendService';
import InputLabel from "../commons/InputLabel";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'admin',
            password: '1'
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        backendService.adminLogin(this.state.name, this.state.password)
            .then(() => this.props.history.push('/admin/registrations'));
    };

    render() {
        return (
            <div>
                <div>
                    Login
                </div>
                <form onSubmit={this.handleSubmit}>
                    <InputLabel
                        label={'Name'}
                        value={this.state.name}
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

export default AdminLogin;
