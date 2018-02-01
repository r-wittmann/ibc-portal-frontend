import React, { Component } from 'react';
import backendService from '../../../backendService';
import RegistrationListItem from './RegistrationListItem';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import translate from '../../../translationService';
import Header from '../Header';

class Registrations extends Component {
    defaultFilters = () => {
        return {
            company_type: []
        }
    };

    // receives the click event and key and value of the filter attribute to be added or removed
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
        this.setState({ loading: true });
        backendService.getAccounts(location.hash)
            .then((accounts) => {
                this.setState({
                    // get only the accounts with status 'registered'
                    registeredAccounts: accounts.filter(account => account.status === 'registered'),
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

    acceptRegistration = (event, id, companyType) => {
        event.preventDefault();
        backendService.acceptAccount(id, companyType)
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }))
            .then(() => toast('Registrierung akzeptiert', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    declineRegistration = (event, id) => {
        event.preventDefault();
        backendService.declineAccount(id)
            .then(() => this.sendEmail(this.state.registeredAccounts.find(account => account.id === id)))
            .then(() => this.setState({
                registeredAccounts: this.state.registeredAccounts.filter(account => account.id !== id)
            }))
            .then(() => toast('Registrierung abgelehnt', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    // TODO: We can actually create an email template for this. None was requested though
    sendEmail = (account) => {
        const subject = 'Default Subject';
        const emailBody = 'Default Body';
        document.location = 'mailto:' + account.email + '?subject=' + subject + '&body=' + emailBody;
    };

    constructor(props) {
        super(props);
        this.state = {
            registeredAccounts: [],
            filters: this.defaultFilters(),
            loading: true,
        };
    };

    componentDidMount() {
        // check for a hash value and if there is one, apply the filters
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

    // check for a hash value and if there is one, apply the filters
    // this method is called every time the hash value of the location changes (react does that for us)
    // to keep filters and displayed accounts in sync
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
                    <h1>Anfragen</h1>
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
                                            {Object.keys(translate.companyType()).map((key) =>
                                                <div className={'form-check'} key={key}>
                                                    <input className={'form-check-input'} type={'checkbox'} id={key}
                                                           checked={this.state.filters.company_type.includes(key)}
                                                           onChange={(event) => this.handleFilterChange(event, key)}/>
                                                    <label className={'form-check-label'} htmlFor={key}>
                                                        {translate.companyType(key)}
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
                            {this.state.registeredAccounts.length > 0
                                ? this.state.registeredAccounts.map((account) =>
                                    <RegistrationListItem
                                        key={account.id}
                                        account={account}
                                        handleChangeType={this.handleChangeType}
                                        handleAccept={this.acceptRegistration}
                                        handleDecline={this.declineRegistration}
                                        history={this.props.history}
                                    />
                                )
                                : <tr>
                                    <td className={'text-center text-muted'} colSpan={9}>
                                        {this.state.filters.company_type.length === 0
                                            ? 'Keine offenen Registrierungen'
                                            : 'Zu diesen Suchkriterien gibt es leider nichts anzuzeigen'

                                        }
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

export default Registrations;
