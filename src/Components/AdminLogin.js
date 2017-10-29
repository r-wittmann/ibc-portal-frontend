import React, { Component } from 'react';
import backendService from '../backendService';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'admin',
            password: 'L4V%nuv@*6g_mY9#'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        backendService.adminLogin(this.state.email, this.state.password)
            .then(() => this.props.history.push('/admin/users'));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>
                    Login
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name
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
                        <input type={'submit'} value={'Login'}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AdminLogin;
