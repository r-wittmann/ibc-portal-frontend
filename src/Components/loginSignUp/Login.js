import React, { Component } from 'react';
import LoginBody from './LoginBody';
import SignUpBody from './SignUpBody';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.match.path === '/login'
        };
    }

    render() {
        return (
            <div className={'login-background'}
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={'login-container'}>
                    <nav className={'nav nav-tabs nav-fill nav-justified'}>
                        <a className={this.state.login ? 'nav-item nav-link active' : 'nav-item nav-link'}
                           onClick={() => this.setState({ login: true })}
                           href={'#'}
                           style={{ borderTopLeftRadius: 8 }}>Login</a>
                        <a className={!this.state.login ? 'nav-item nav-link active' : 'nav-item nav-link'}
                           onClick={() => this.setState({ login: false })}
                           href={'#'}
                           style={{ borderTopRightRadius: 8 }}>Registrieren</a>
                    </nav>
                    {this.state.login ? (
                        <LoginBody history={this.props.history}/>
                    ) : (
                        <SignUpBody history={this.props.history}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Login;
