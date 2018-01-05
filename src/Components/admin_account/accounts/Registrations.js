import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png';


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
            }));

        const done = document.getElementById("done");

        done.removeAttribute('hidden');

    };

    declineRegistration = (id) => {
        event.preventDefault();
        backendService.declineAccount(id)
            .then(() => this.sendEmail(this.state.registeredAccounts.find(account => account.id === id)))
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }));

        const cancel = document.getElementById("cancel");

        cancel.removeAttribute('hidden');
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


                <div hidden className={"alert alert-success alert-dismissible fade show"} role={"alert"} id={"done"}>
                    Die Anfrage wurde erfolgreich akzeptiert!
                    <button type="button" className={"close"} data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div hidden className={"alert alert-danger alert-dismissible fade show"} role={"alert"} id={"cancel"}>
                    Die Anfrage wurde erfolgreich abgelehnt!
                    <button type="button" className={"close"} data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

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
                            <th>Status</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.registeredAccounts.map((account) =>
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.company_name}</td>
                                <td>{account.name}</td>
                                <td>{account.email}</td>
                                <td>{account.website}</td>
                                <td>{account.company_type}</td>
                                <td>{account.status}</td>
                                <td>
                                <div className={'btn-group'}>
                                    <button className={'btn btn-outline-dark'}
                                            data-toggle='modal'
                                            data-target={'#'+account.id}>
                                        <span className={'fa fa-check'}/>
                                    </button>
                                    <button className={'btn btn-outline-dark'}
                                            onClick={() => this.declineRegistration(account.id)}>
                                        <span className={'fa fa-times'}/>
                                    </button>
                                </div>
                                    <div className="modal fade"
                                         id={account.id}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    Stimmt die Unternehmensart?
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input"
                                                                   type="radio"
                                                                   name="gridRadios"
                                                                   value="ibc"
                                                                   checked={account.company_type === 'ibc'}
                                                                   onChange={(event) => this.handleChangeType(event, account.id)}/>
                                                            IBC-Unternehmen
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input"
                                                                   type="radio"
                                                                   name="gridRadios"
                                                                   value="startup"
                                                                   checked={account.company_type === 'startup'}
                                                                   onChange={(event) => this.handleChangeType(event, account.id)}/>
                                                            Startup
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input"
                                                                   type="radio"
                                                                   name="gridRadios"
                                                                   value="ngo"
                                                                   checked={account.company_type === 'ngo'}
                                                                   onChange={(event) => this.handleChangeType(event, account.id)}/>
                                                            Gemeinnütziger Verein
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button"
                                                            onClick={() => {}}
                                                            className="btn btn-secondary"
                                                            data-dismiss="modal">Abbrechen
                                                    </button>
                                                    <button type="button"
                                                            onClick={() => {
                                                                this.acceptRegistration(account.id,
                                                                    this.state.registeredAccounts.find(acc => acc.id === account.id).company_type);
                                                            }}
                                                            className="btn btn-primary"
                                                            data-dismiss="modal">Speichern
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
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
