import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'
import AccountListItem from "./AccountListItem";
import { toast } from "react-toastify";

class Accounts extends Component {
    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

    handleChangeEmail = (event, accountId) => {
        event.preventDefault();
        this.setState({
            accounts: this.state.accounts.map(account => {
                if (account.id === accountId) {
                    account.email = event.target.value
                }
                return account
            })
        });
    };

    handleChangeType = (event, accountId) => {
        event.preventDefault();
        this.setState({
            accounts: this.state.accounts.map(account => {
                if (account.id === accountId) {
                    account.company_type = event.target.value
                }
                return account
            })
        });
    };

    handleSave = (accountId) => {
        let accountToBeUpdated = this.state.accounts
            .map(account => ({ id: account.id, email: account.email, company_type: account.company_type }))
            .find(account => account.id === accountId);

        backendService.updateAccount(accountId, accountToBeUpdated)
            .then(() => toast('Account aktualisiert', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }))
    };

    handleDelete = (accountId) => {
        backendService.deleteAccount(accountId)
            .then(() => this.setState({ accounts: this.state.accounts.filter(account => account.id !== accountId) }))
            .then(() => toast('Account erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    };

    componentDidMount() {
        backendService.getAccounts()
            .then((accounts) => {
                this.setState({
                    accounts: accounts.filter(account => account.status !== 'registered'),
                })
            });
    };

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                    <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}/>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNav">
                        <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'}
                                   onClick={() => this.props.history.push('/admin/registrations')}>Anfragen</a>
                            </li>
                            <li className={'nav-item active'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/admin/accounts')}>Alle
                                    Accounts</a>
                            </li>
                        </ul>

                        <ul className={'navbar-nav my-2 my-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                            </li>
                        </ul>

                    </div>
                </nav>
                <div className={'headline'}>
                    <h1>Alle Accounts</h1>
                </div>

                <div className={'container'}>
                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firmenname</th>
                            <th>Benutzername</th>
                            <th>E-Mail</th>
                            <th>Webseite</th>
                            <th>Firmentyp</th>
                            <th>Status</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.accounts && this.state.accounts.map((account) =>
                            <AccountListItem key={account.id}
                                             account={account}
                                             updateEmail={this.handleChangeEmail}
                                             updateType={this.handleChangeType}
                                             history={this.props.history}
                                             handleSave={this.handleSave}
                                             delete={this.handleDelete}/>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Accounts;
