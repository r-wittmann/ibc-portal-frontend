import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png';
import done from '../../../../resources/done.png';
import cancel from '../../../../resources/cancel.png'


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

            const done = document.getElementById("done");

            done.removeAttribute('hidden');

    };

    declineRegistration = (id) => {
        event.preventDefault();
        backendService.declineAccount(id)
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }));

            const cancel = document.getElementById("cancel");

            cancel.removeAttribute('hidden');
    };

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} onClick={() => this.props.history.push('/admin/accounts')}>
                        <img className={'logo'} src={image} alt={'blub'}></img>
                    </a>
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


                <div hidden className={"alert alert-success alert-dismissible fade show"} role={"alert"} id={"done"}>
                  Die Anfrage wurde erfolgreich akzeptiert!
                    <button type="button" className={"close"} data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                </div>

                <div  hidden className={"alert alert-danger alert-dismissible fade show"} role={"alert"} id={"cancel"}>
                  Die Anfrage wurde erfolgreich abgelehnt!
                  <button type="button" className={"close"} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className={'headline'}>
                    <h1>Anfragen</h1>
                </div>

                {this.state.registeredAccounts.length > 0 && (
                    <table className={"table table-striped"}>
                            <th>ID</th>
                            <th>Firmenname</th>
                            <th>Benutzername</th>
                            <th>E-Mail</th>
                            <th>Webseite</th>
                            <th>Firmentyp</th>
                            <th>Status</th>
                            <th>Aktionen</th>

                            {this.state.registeredAccounts.map((account) =>
                                <tr key={account.id}>
                                    <td>{account.id}</td><td>{account.company_name}</td><td>{account.name}</td><td>{account.email}</td><td>{account.website}</td><td>{account.company_type}</td><td>{account.status}</td>
                                    <td>
                                        <div className={'float-left'}>
                                            <div className={'done float-left'}>
                                                <a onClick={() => this.acceptRegistration(account.id)}>
                                                    <img className={'done'} src={done} alt={'blub'}></img>
                                                </a>
                                            </div>
                                            <div className={'cancel float-left'}>
                                                <a onClick={() => this.declineRegistration(account.id)}>
                                                    <img className={'cancel'} src={cancel} alt={'blub'}></img>
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                    </table>
                )}
            </div>
        );
    }
}

export default Registrations;
