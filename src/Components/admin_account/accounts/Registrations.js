import React, { Component } from 'react';
import backendService from '../../../backendService';

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

    render() {
        return (
            <div>
                <div>Registrations</div>
                {this.state.registeredAccounts.length > 0 && (
                    <div>
                        {this.state.registeredAccounts.map((account) =>
                            <div key={account.id}>
                                {account.id}, {account.company_name}, {account.name}, {account.email}, {account.website}, {account.company_type}, {account.status}
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/admin/accounts')}>Accounts</button>
                </div>
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default Registrations;
