import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'

class Accounts extends Component {
    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

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

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                    <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}></span>
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

                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Firmenname</th>
                        <th>Benutzername</th>
                        <th>E-Mail</th>
                        <th>Webseite</th>
                        <th>Firmentyp</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.accounts.map((account) =>
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.company_name}</td>
                            <td>{account.name}</td>
                            <td>{account.email}</td>
                            <td>{account.website}</td>
                            <td>{account.company_type}</td>
                            <td>{account.status}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Accounts;
