import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'


class Registrations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredAccounts: []
        };
    }

    componentDidMount() {
        backendService.getAccounts()
            .then((accounts) => {
                this.setState({
                    registeredAccounts: accounts.filter(account => account.status === 'registered')
                })
            });
    }

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/admin/login');
    };

    acceptRegistration = (id) => {
        event.preventDefault();
        backendService.acceptAccount(id)
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }));
    };

    declineRegistration = (id) => {
        event.preventDefault();
        backendService.declineAccount(id)
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }));
    };

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                  <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                  <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}></span>
                  </button>
                  <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                      <li className={'nav-item active'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/admin/registrations')}>Anfragen</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/admin/accounts')}>Alle Accounts</a>
                      </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                      <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>

                  </div>
                </nav>
                <h1>Anfragen</h1>
                {this.state.registeredAccounts.length > 0 && (
                    <div>
                        {this.state.registeredAccounts.map((account) =>
                            <div key={account.id}>
                                {account.id}, {account.company_name}, {account.name}, {account.email}, {account.website}, {account.company_type}, {account.status}
                                <button onClick={() => this.acceptRegistration(account.id)}>Accept</button>
                                <button onClick={() => this.declineRegistration(account.id)}>Decline</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Registrations;
