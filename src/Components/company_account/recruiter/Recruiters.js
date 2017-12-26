import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';
import Header from "../Header";

class Recruiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiters: []
        };
    }

    componentDidMount() {
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Recruiter</h1>
                </div>
                {this.state.recruiters && this.state.recruiters.map((recruiter) =>
                    <div key={recruiter.id}>
                        <Link to={`/recruiters/${recruiter.id}`}>{recruiter.recruiter_name}</Link>
                    </div>
                )}
                <div className={'create-button'}>
                    <button className={'btn btn-primary'} onClick={() => this.props.history.push('/recruiters/create')}>
                        Neuen Recruiter erstellen
                    </button>
                </div>
            </div>
        );
    }
}

export default Recruiters;
