import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../backendService';

class Companies extends Component {
    constructor (props) {
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        backendService.getCompanies()
            .then((response) => this.setState({companies: response}));
    }

    render() {
        return (
            <div>
                <div>Companies</div>
                <div>
                {this.state.companies.map((company) =>
                    <div key={company._id}>{company.name}</div>
                )}
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
