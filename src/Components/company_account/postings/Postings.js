import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import { toast } from "react-toastify";
import PostingListItem from "./PostingListItem";
import queryString from 'query-string';

class Postings extends Component {
    handleDelete = (postingId) => {
        backendService.deletePosting(postingId)
            .then(() => this.setState({ postings: this.state.postings.filter(posting => posting.id !== postingId) }))
            .then(() => toast('Anzeige erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    handleChange = (event, key, value) => {
        event.stopPropagation();
        let filters = this.state.filters;

        if (!filters[key].includes(value)) {
            filters[key].push(value);
        } else {
            filters[key] = filters[key].filter(e => e !== value);
        }

        this.setState({ filters })
    };

    useFilters = (event) => {
        event.preventDefault();
        location.search = queryString.stringify(this.state.filters);
    };

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            companies: [],
            recruiters: [],
            filters: {
                status: [],
                contract_type: [],
                company_id: [],
            }
        };
    };

    componentDidMount() {
        if (this.props.location.search) {
            let filters = Object.assign({}, this.state.filters, queryString.parse(this.props.location.search));
            for (let key in filters) {
                if (filters.hasOwnProperty(key) && !(filters[key] instanceof Array)) {
                    filters[key] = [filters[key]];
                }
            }
            this.setState({ filters })
        }
        backendService.getPostings(location.search)
            .then((postings) => this.setState({ postings }));
        backendService.getCompanies()
            .then((companies) => this.setState({ companies }));
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters }));
    };

    render() {
        let availableContractTypes = ['Direkteinstieg', 'Werkstudent', 'Praktikant', 'Trainee', 'Volontariat'];
        let availableStatus = [{ key: 'active', value: 'Aktiv' }, { key: 'deactivated', value: 'Deaktiviert' }];
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Stellenanzeigen</h1>
                </div>
                <div className={'create-button'}>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.push('/postings/create')}>
                        Neues Posting erstellen
                    </button>
                </div>
                <div className={'container'}>
                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>Titel</th>
                            {/* no expiry date yet */}
                            {/*<th>Ablaufdatum</th>*/}
                            <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                <form>
                                    <button className={'btn btn-small btn-outline-dark dropdown-toggle'}
                                            data-toggle={'dropdown'}>
                                        <b>Vertragsart</b>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {availableContractTypes.map(type => (
                                            <div className={'form-check'} key={type}>
                                                <input className={'form-check-input'} type={'checkbox'} id={type}
                                                       checked={this.state.filters.contract_type.includes(type)}
                                                       onChange={(event) => this.handleChange(event, 'contract_type', type)}/>
                                                <label className={'form-check-label'} htmlFor={type}>
                                                    {type}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </form>
                            </td>
                            <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                <form>
                                    <button className={'btn btn-small btn-outline-dark dropdown-toggle'}
                                            data-toggle={'dropdown'}>
                                        <b>Unternehmen</b>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {this.state.companies.map(company => (
                                            <div className={'form-check'} key={company.id}>
                                                <input className={'form-check-input'} type={'checkbox'} id={company.id}
                                                       checked={this.state.filters.company_id.includes(company.id.toString())}
                                                       onChange={(event) => this.handleChange(event, 'company_id', company.id.toString())}/>
                                                <label className={'form-check-label'} htmlFor={company.id}>
                                                    {company.company_name}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </form>
                            </td>
                            <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                <form>
                                    <button className={'btn btn-small btn-outline-dark dropdown-toggle'}
                                            data-toggle={'dropdown'}>
                                        <b>Status</b>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {availableStatus.map((status) => (
                                            <div className={'form-check'} key={status.key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={status.key}
                                                       checked={this.state.filters.status.includes(status.key)}
                                                       onChange={(event) => this.handleChange(event, 'status', status.key)}/>
                                                <label className={'form-check-label'} htmlFor={status.key}>
                                                    {status.value}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </form>
                            </td>
                            <th>
                                <button className={'btn btn-outline-dark'}
                                        onClick={this.useFilters}>
                                    <b>Filter anwenden</b>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.postings && this.state.postings.map((posting) =>
                            <PostingListItem key={posting.id}
                                             posting={posting}
                                             history={this.props.history}
                                             delete={this.handleDelete}/>
                        )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        );
    }
}

export default Postings;
