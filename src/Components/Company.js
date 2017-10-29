import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../backendService';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {}
        };
    }

    componentDidMount() {
        backendService.getCompanyById(this.props.match.params.id)
            .then(company => this.setState({ company }))
    }

    render() {
        return (
            <div>
                <div>Company</div>
                <div>
                    {this.state.company && (
                        <div>
                            <div>{this.state.company.name}</div>
                            <div>{this.state.company.address}</div>
                        </div>
                    )}
                    <Link to={'/companies'}>
                        Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default Company;
