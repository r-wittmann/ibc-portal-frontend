import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ibc.job.portal@gmail.com',
            password: 'L4V%nuv@*6g_mY9#'
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        backendService.adminLogin(this.state.email, this.state.password)
            .then(() => this.props.history.push('/admin/users'));
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

export default AdminLogin;
