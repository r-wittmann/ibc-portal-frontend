import React, { Component } from 'react';
import backendService from '../../../backendService';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        backendService.getAccounts()
            .then((accounts) => {
                this.setState({
                    accounts: accounts.filter(account => account.status !== 'registered'),
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
                <div>Accounts</div>
                {this.state.accounts.map((account) =>
                    <div key={account.id}>
                        {account.id}, {account.company_name}, {account.name}, {account.email}, {account.website}, {account.company_type}, {account.status}
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/admin/registrations')}>Registrations</button>
                </div>
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default Accounts;
