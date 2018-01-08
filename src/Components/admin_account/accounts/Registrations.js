import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png';
import RegistrationListItem from './RegistrationListItem';
import { toast } from "react-toastify";

class Registrations extends Component {
    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

    handleChangeType = (event, accountId) => {
        this.setState({
            registeredAccounts: this.state.registeredAccounts.map(account => {
                if (account.id === accountId) {
                    account.company_type = event.target.value
                }
                return account
            })
        });
    };

    acceptRegistration = (id, companyType) => {
        event.preventDefault();
        backendService.acceptAccount(id, companyType)
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }))
            .then(() => toast('Rigistrierung akzeptiert', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    declineRegistration = (id) => {
        event.preventDefault();
        backendService.declineAccount(id)
            .then(() => this.sendEmail(this.state.registeredAccounts.find(account => account.id === id)))
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }))
            .then(() => toast('Registrierung abgelehnt', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    sendEmail = (account) => {
        const subject = 'Default Subject';
        const emailBody = 'Default Body';
        document.location = "mailto:" + account.email + "?subject=" + subject + "&body=" + emailBody;
    };

    constructor(props) {
        super(props);
        this.state = {
            registeredAccounts: []
        };
    };

    componentDidMount() {
        backendService.getAccounts()
            .then((accounts) => {
                this.setState({
                    registeredAccounts: accounts.filter(account => account.status === 'registered')
                })
            });
    };

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} onClick={() => this.props.history.push('/admin/accounts')}>
                        <img className={'logo'} src={image} alt={'blub'}/>
                    </a>
                    <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}/>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNav">
                        <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                            <li className={'nav-item active'}>
                                <a className={'nav-link'}
                                   onClick={() => this.props.history.push('/admin/registrations')}>Anfragen</a>
                            </li>
                            <li className={'nav-item'}>
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
                    <h1>Anfragen</h1>
                </div>

                <div className={'container'}>
                    {this.state.registeredAccounts.length > 0 && (
                        <table className={"table table-hover"}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Firmenname</th>
                                <th>Benutzername</th>
                                <th>E-Mail</th>
                                <th>Webseite</th>
                                <th>Firmentyp</th>
                                <th>Aktionen</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.registeredAccounts.map((account) =>
                                <RegistrationListItem
                                    key={account.id}
                                    account={account}
                                    handleChangeType={this.handleChangeType}
                                    handleAccept={this.acceptRegistration}
                                    handleDecline={this.declineRegistration}
                                    history={this.props.history}
                                />
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default Registrations;
