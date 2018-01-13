import React, { Component } from 'react';
import backendService from '../../backendService';
import InputLabel from "../commons/InputLabel";

class AdminLogin extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        backendService.adminLogin(this.state.name, this.state.password)
            .then(() => this.props.history.push('/admin/registrations'));
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    render() {
        return (
            <div className={'ibc-background'}
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 className={'headline-login'}>IBC Jobportal</h1>
                    <div className={'login-container'}>

                        <form onSubmit={this.handleSubmit} style={{ padding: 30 }}>
                            <InputLabel
                                label={'Name'}
                                value={this.state.name}
                                onChange={(name) => this.setState({ name })}/>
                            <InputLabel
                                label={'Password'}
                                type={'password'}
                                value={this.state.password}
                                onChange={(password) => this.setState({ password })}/>
                            <div className={'float-right'}>
                                <input className={'btn btn-primary'} type={'submit'} value={'Login'}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
