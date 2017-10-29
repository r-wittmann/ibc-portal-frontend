import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../backendService';

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
                <div>
                    {this.state.companies.map((company) =>
                        <div key={company._id}>
                            <Link to={`/companies/${company._id}`}>{company.name}</Link>
                        </div>
                    )}
                </div>
                <div>
                    <Link to={'/companies/create'}>
                        create new company
                    </Link>
                </div>
                <div>
                    <Link to={'/home'}>
                        home
                    </Link>
                </div>
            </div>
        );
    }
}

export default Companies;
