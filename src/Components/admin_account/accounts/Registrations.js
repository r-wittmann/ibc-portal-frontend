import React, { Component } from 'react';
import backendService from '../../../backendService';
import image from '../../../../resources/ibc_logo.png';
import RegistrationListItem from './RegistrationListItem';
import { toast } from "react-toastify";
import queryString from "query-string";

class Registrations extends Component {
    defaultFilters = () => {
        return {
            company_type: []
        }
    };

    handleLogout = (event) => {
        event.preventDefault();
        backendService.adminLogout();
        this.props.history.push('/admin/login');
    };

    handleFilterChange = (event, value) => {
        event.stopPropagation();
        let filters = Object.assign({}, this.state.filters);
        let key = 'company_type';

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
                    registeredAccounts: accounts.filter(account => account.status === 'registered'),
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
            registeredAccounts: [],
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
        let availableTypes = [{ key: 'ibc', value: 'IBC Unternehmen' },
            { key: 'startup', value: 'Startup' },
            { key: 'ngo', value: 'Verein' }];

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
                    <h1>Anfragen</h1>
                </div>

                <div className={'container'}>
                    <table className={"table table-hover"}>
                        <thead>
                        <tr>
                            <th>Benutzername</th>
                            <th>E-Mail</th>
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
                                        {availableTypes.map((type) => (
                                            <div className={'form-check'} key={type.key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={type.key}
                                                       checked={this.state.filters.company_type.includes(type.key)}
                                                       onChange={(event) => this.handleFilterChange(event, type.key)}/>
                                                <label className={'form-check-label'} htmlFor={type.key}>
                                                    {type.value}
                                                </label>
                                            </div>
                                        ))}
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
                        {this.state.registeredAccounts.length > 0 && this.state.registeredAccounts.map((account) =>
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
                </div>
            </div>
        );
    }
}

export default Registrations;
