import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';

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
                <div>Recruiters</div>
                {this.state.recruiters && this.state.recruiters.map((recruiter) =>
                    <div key={recruiter.id}>
                        <Link to={`/recruiters/${recruiter.id}`}>{recruiter.recruiter_name}</Link>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/recruiters/create')}>
                        create new recruiter
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

export default Recruiters;
