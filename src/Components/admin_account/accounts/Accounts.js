import React, { Component } from 'react';
import backendService from '../../../backendService';
import AccountListItem from './AccountListItem';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import translate from '../../../translationService';
import Header from '../Header';

class Accounts extends Component {
    defaultFilters = () => {
        return {
            status: [],
            company_type: []
        }
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
        this.setState({ loading: true });
        backendService.getAccounts(location.hash)
            .then((accounts) => {
                this.setState({
                    accounts: accounts.filter(account => account.status !== 'registered'),
                    loading: false,
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
            filters: this.defaultFilters(),
            loading: true
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
                <Header history={this.props.history}/>
                <div className={'headline'}>
                    <h1>Alle Accounts</h1>
                </div>

                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        : <table className={'table table-hover'}>
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
                                                key !== 'registered' &&
                                                <div className={'form-check'} key={key}>
                                                    <input className={'form-check-input'} type={'checkbox'} id={key}
                                                           checked={this.state.filters.status.includes(key)}
                                                           onChange={(event) => this.handleFilterChange(event, 'status', key)}/>
                                                    <label className={'form-check-label'} htmlFor={key}>
                                                        {translate.registrationStatus(key)}
                                                    </label>
                                                </div>
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
                            {this.state.accounts.length > 0
                                ? this.state.accounts.map((account) =>
                                    <AccountListItem key={account.id}
                                                     account={account}
                                                     updateEmail={this.handleChangeEmail}
                                                     updateType={this.handleChangeType}
                                                     history={this.props.history}
                                                     handleSave={this.handleSave}
                                                     delete={this.handleDelete}/>
                                )
                                : <tr>
                                    <td className={'text-center text-muted'} colSpan={9}>
                                        Zu diesen Suchkriterien gibt es leider nichts anzuzeigen
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default Accounts;
