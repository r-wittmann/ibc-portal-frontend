import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png'
import AccountListItem from "./AccountListItem";
import { toast } from "react-toastify";
import queryString from "query-string";
import translate from "../../../translationService";

class Accounts extends Component {
    defaultFilters = () => {
        return {
            status: [],
            company_type: []
        }
    };

    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

    handleFilterChange = (event, key, value) => {
        event.stopPropagation();
        let filters = Object.assign({}, this.state.filters);

        if (!filters[key].includes(value)) {
            filters[key].push(value);
        } else {
            filters[key] = filters[key].filter(e => e !== value);
        }

        this.setState({ filters });

        location.hash = queryString.stringify(filters);
    };

    getAccounts() {
        backendService.getAccounts(location.hash)
            .then((accounts) => {
                this.setState({
                    accounts: accounts.filter(account => account.status !== 'registered'),
                })
            });
    };

    deleteFilters = (event) => {
        event && event.preventDefault();

        this.setState({
            filters: Object.assign({}, this.defaultFilters())
        });

        location.hash = ''
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
            accounts: [],
            filters: this.defaultFilters()
        };
    };

    componentDidMount() {
        if (location.hash) {
            let filters = Object.assign({}, this.state.filters, queryString.parse(location.hash));
            for (let key in filters) {
                if (filters.hasOwnProperty(key) && !(filters[key] instanceof Array)) {
                    filters[key] = [filters[key]];
                }
            }
            this.setState({ filters });
        }
        this.getAccounts();
    };

    componentWillUpdate(nextProps) {
        if (nextProps.location.hash !== this.props.location.hash) {
            let filters = Object.assign({}, this.defaultFilters(), queryString.parse(nextProps.location.hash));
            for (let key in filters) {
                if (filters.hasOwnProperty(key) && !(filters[key] instanceof Array)) {
                    filters[key] = [filters[key]];
                }
            }
            this.setState({ filters });

            this.getAccounts();
        }
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
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'https://analytics.google.com/analytics/web/#embed/report-home/a71308674w167653651p167860407/'} target={'_blank'}>Analytics</a>
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
                            <th>Firmenname</th>
                            <th>Kontakt</th>
                            <th>E-Mail</th>
                            <th>Telefon</th>
                            <th>Webseite</th>
                            <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                <form>
                                    <button className={'btn btn-small btn-outline-dark'}
                                            data-toggle={'dropdown'}>
                                        <b>Firmentyp </b>
                                        <span className={'fa fa-filter'}
                                              style={this.state.filters.company_type.length ? {} : { color: 'lightgrey' }}/>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {Object.keys(translate.companyType()).map((key) => (
                                            <div className={'form-check'} key={key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={key}
                                                       checked={this.state.filters.company_type.includes(key)}
                                                       onChange={(event) => this.handleFilterChange(event, 'company_type', key)}/>
                                                <label className={'form-check-label'} htmlFor={key}>
                                                    {translate.companyType(key)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </td>
                            <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                <form>
                                    <button className={'btn btn-small btn-outline-dark'}
                                            data-toggle={'dropdown'}>
                                        <b>Status </b>
                                        <span className={'fa fa-filter'}
                                              style={this.state.filters.status.length ? {} : { color: 'lightgrey' }}/>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {Object.keys(translate.registrationStatus()).map((key) =>
                                            key !== 'registered' ? (
                                            <div className={'form-check'} key={key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={key}
                                                       checked={this.state.filters.status.includes(key)}
                                                       onChange={(event) => this.handleFilterChange(event, 'status', key)}/>
                                                <label className={'form-check-label'} htmlFor={key}>
                                                    {translate.registrationStatus(key)}
                                                </label>
                                            </div>
                                            ) : null
                                        )}
                                    </div>
                                </form>
                            </td>
                            <th>
                                <button className={'btn btn-outline-dark'}
                                        onClick={this.deleteFilters}>
                                    <b>Filter entfernen</b>
                                </button>
                            </th>
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
