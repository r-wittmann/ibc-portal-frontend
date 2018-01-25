import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import { toast } from "react-toastify";
import PostingListItem from "./PostingListItem";
import queryString from 'query-string';
import translate from "../../../translationService";

class Postings extends Component {
    defaultFilters = () => {
        return {
            status: [],
            contract_type: [],
            company_id: [],
            recruiter_id: []
        }
    };

    handleDelete = (postingId) => {
        backendService.deletePosting(postingId)
            .then(() => this.setState({ postings: this.state.postings.filter(posting => posting.id !== postingId) }))
            .then(() => toast('Stellenanzeige erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    handleStatusChange = (id, status) => {

        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 60);

        let expiry_date = status === 'active'
            ? expiryDate
            : '';

        backendService.updatePosting(id, { status, expiry_date })
            .then(() => this.setState({
                    posting: this.state.postings.map(posting => {
                        if (id === posting.id) {
                            posting.status = status;
                            posting.expiry_date = expiry_date;
                        }
                        return posting;
                    })
                }
            ))
            .then(() => {
                let hash = location.hash;
                location.hash = '';
                location.hash = hash;
            })
            .then(() => toast('Anzeige aktualisiert', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    handleChange = (event, key, value) => {
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

    getPostings() {
        this.setState({ loading: true });
        backendService.getPostings(location.hash)
            .then((postings) => this.setState({ postings, loading: false }));
    };

    deleteFilters = (event) => {
        event && event.preventDefault();

        this.setState({
            filters: Object.assign({}, this.defaultFilters())
        });

        location.hash = ''
    };

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            companies: [],
            recruiters: [],
            filters: this.defaultFilters(),
            loading: true,
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
            this.setState({ filters })
        }

        this.getPostings();
        backendService.getCompanies()
            .then((companies) => this.setState({ companies }));
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters }));
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

            this.getPostings();
        }
    };

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Stellenanzeigen</h1>
                </div>
                <p className={'description'}>Legen Sie neue Stellenanzeigen an, fügen Sie diesen einem Unternehmen bzw.
                    Recruiter
                    hinzu und verwalten Sie diese.</p>
                <div className={'create-button'}>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.push('/company/postings/create')}>
                        Neue Stellenanzeige erstellen
                    </button>
                </div>
                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        : <table className={'table table-hover'}>
                            <thead>
                            <tr>
                                <th>Titel</th>
                                <th>Ablaufdatum</th>
                                <td className={'dropdown'} style={{ borderBottom: '2px solid #e9ecef' }}>
                                    <form>
                                        <button className={'btn btn-small btn-outline-dark'}
                                                data-toggle={'dropdown'}>
                                            <b>Vertragsart </b>
                                            <span className={'fa fa-filter'}
                                                  style={this.state.filters.contract_type.length ? {} : { color: 'lightgrey' }}/>
                                        </button>
                                        <div className={'dropdown-menu p-2 pl-4'}>
                                            {Object.keys(translate.contractType()).map(key => (
                                                <div className={'form-check'} key={key}>
                                                    <input className={'form-check-input'} type={'checkbox'} id={key}
                                                           checked={this.state.filters.contract_type.includes(key)}
                                                           onChange={(event) => this.handleChange(event, 'contract_type', key)}/>
                                                    <label className={'form-check-label'} htmlFor={key}>
                                                        {translate.contractType(key)}
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
                                            <b>Unternehmen </b>
                                            <span className={'fa fa-filter'}
                                                  style={this.state.filters.company_id.length ? {} : { color: 'lightgrey' }}/>
                                        </button>
                                        <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                            {this.state.companies.map(company => (
                                                <div className={'form-check'} key={company.id}>
                                                    <input className={'form-check-input'} type={'checkbox'}
                                                           id={company.id}
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
                                        <button className={'btn btn-small btn-outline-dark'}
                                                data-toggle={'dropdown'}>
                                            <b>Recruiter </b>
                                            <span className={'fa fa-filter'}
                                                  style={this.state.filters.recruiter_id.length ? {} : { color: 'lightgrey' }}/>
                                        </button>
                                        <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                            {this.state.recruiters.map(recruiter => (
                                                <div className={'form-check'} key={recruiter.id}>
                                                    <input className={'form-check-input'} type={'checkbox'}
                                                           id={recruiter.id}
                                                           checked={this.state.filters.recruiter_id.includes(recruiter.id.toString())}
                                                           onChange={(event) => this.handleChange(event, 'recruiter_id', recruiter.id.toString())}/>
                                                    <label className={'form-check-label'} htmlFor={recruiter.id}>
                                                        {recruiter.recruiter_name}
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
                                            {Object.keys(translate.postingStatus()).map(key => (
                                                <div className={'form-check'} key={key}>
                                                    <input className={'form-check-input'} type={'checkbox'} id={key}
                                                           checked={this.state.filters.status.includes(key)}
                                                           onChange={(event) => this.handleChange(event, 'status', key)}/>
                                                    <label className={'form-check-label'} htmlFor={key}>
                                                        {translate.postingStatus(key)}
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
                            {this.state.postings.length > 0
                                ? this.state.postings.map((posting) =>
                                    <PostingListItem key={posting.id}
                                                     posting={posting}
                                                     history={this.props.history}
                                                     delete={this.handleDelete}
                                                     save={this.handleStatusChange}/>
                                ) : <tr>
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

export default Postings;
