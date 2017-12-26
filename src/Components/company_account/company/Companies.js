import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';
import Header from "../Header";

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
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihr Unternehmen</h1>
                </div>
                {this.state.companies && this.state.companies.map((company) =>
                    <div key={company.id}>
                        <Link to={`/companies/${company.id}`}>{company.company_name}</Link>
                    </div>
                )}
                <div className={'create-button'}>
                    <button className={'btn btn-primary'} onClick={() => this.props.history.push('/companies/create')}>
                        Neues Unternehmen erstellen
                    </button>
                </div>
            </div>
        );
    }
}

export default Companies;
