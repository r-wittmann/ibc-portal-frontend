import React, { Component } from 'react';
import backendService from '../../../backendService';
import PostingListItem from "./PublicPostingListItem";
import queryString from 'query-string';

class PublicPostings extends Component {
    defaultFilters = () => {
        return {
            contract_type: [],
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
        let availableContractTypes = ['Direkteinstieg', 'Werkstudent', 'Praktikant', 'Trainee', 'Volontariat'];
        let availableEntryLevels = ['Studenten', 'Maseranden', 'Absolventen'];
        return (
            <div>
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
                                        <b>Zielgruppe</b>
                                    </button>
                                    <div className={'dropdown-menu p-0 pl-4 pt-2'}>
                                        {availableEntryLevels.map(level => (
                                            <div className={'form-check'} key={level}>
                                                <input className={'form-check-input'} type={'checkbox'} id={level}
                                                       checked={this.state.filters.entry_level.includes(level)}
                                                       onChange={(event) => this.handleChange(event, 'entry_level', level)}/>
                                                <label className={'form-check-label'} htmlFor={level}>
                                                    {level}
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
