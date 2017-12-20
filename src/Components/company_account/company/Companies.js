import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        backendService.getCompanies()
            .then((companies) => this.setState({ companies }));
    }

    render() {
        return (
            <div>
                <div>Companies</div>
                {this.state.companies && this.state.companies.map((company) =>
                    <div key={company.id}>
                        <Link to={`/companies/${company.id}`}>{company.company_name}</Link>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/companies/create')}>
                        create new company
                    </button>
                </div>
                <div>
                    <button onClick={() => this.props.history.push('/home')}>
                        home
                    </button>
                </div>
            </div>
        );
    }
}

export default Companies;
