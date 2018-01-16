import React, { Component } from 'react';
import backendService from '../../../backendService';
import PostingListItem from "./PublicPostingListItem";
import queryString from 'query-string';
import Header from "../Header";
import translate from "../../../translationService";

class PublicPostings extends Component {
    defaultFilters = () => {
        return {
            contract_type: [],
            field_of_employment: [],
            company_id: [],
            entry_level: []
        }
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
        backendService.getPublicPostings(location.hash)
            .then((postings) => this.setState({ postings }));
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
            this.setState({ filters })
        }

        this.getPostings();
        backendService.getPublicCompanies()
            .then((companies) => this.setState({ companies }));
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
                    <h1>Digitale Jobs in und um München</h1>
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
                                    <button className={'btn btn-small btn-outline-dark'}
                                            data-toggle={'dropdown'}>
                                        <b>Vertragsart </b>
                                        <span className={'fa fa-filter'}
                                              style={this.state.filters.contract_type.length ? {} : { color: 'lightgrey' }}/>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
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
                                        <b>Tätigkeit </b>
                                        <span className={'fa fa-filter'}
                                              style={this.state.filters.field_of_employment.length ? {} : { color: 'lightgrey' }}/>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {Object.keys(translate.fieldOfEmployment()).map(key => (
                                            <div className={'form-check'} key={key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={key}
                                                       checked={this.state.filters.field_of_employment.includes(key)}
                                                       onChange={(event) => this.handleChange(event, 'field_of_employment', key)}/>
                                                <label className={'form-check-label'} htmlFor={key}>
                                                    {translate.fieldOfEmployment(key)}
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
                                        <b>Zielgruppe </b>
                                        <span className={'fa fa-filter'}
                                              style={this.state.filters.entry_level.length ? {} : { color: 'lightgrey' }}/>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {Object.keys(translate.entryLevel()).map(key => (
                                            <div className={'form-check'} key={key}>
                                                <input className={'form-check-input'} type={'checkbox'} id={key}
                                                       checked={this.state.filters.entry_level.includes(key)}
                                                       onChange={(event) => this.handleChange(event, 'entry_level', key)}/>
                                                <label className={'form-check-label'} htmlFor={key}>
                                                    {translate.entryLevel(key)}
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
                            <th>
                                <button className={'btn btn-outline-dark'}
                                        onClick={this.deleteFilters}>
                                    <b>Filter entfernen</b>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.postings && this.state.postings.map((posting) =>
                            <PostingListItem key={posting.id}
                                             posting={posting}/>
                        )}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default PublicPostings;
