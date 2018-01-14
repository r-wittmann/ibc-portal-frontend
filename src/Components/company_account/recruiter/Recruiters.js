import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import RecruiterListItem from './RecruiterListItem';
import { toast } from "react-toastify";

class Recruiters extends Component {
    handleDelete = (recruiterId) => {
        backendService.deleteRecruiter(recruiterId)
            .then(() => this.setState({ recruiters: this.state.recruiters.filter(recruiter => recruiter.id !== recruiterId) }))
            .then(() => toast('Recruiter erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

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
                 <div className={'create-button'}>
                        <button className={'btn btn-primary'}
                                onClick={() => this.props.history.push('/company/recruiters/create')}>
                            Neuen Recruiter erstellen
                        </button>
                    </div>
                <div className={'container'}>
                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>Recruitername</th>
                            <th>Aktionen</th>
                            <th>Stellenanzeigen aktiv</th>
                            <th>gesamt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.recruiters && this.state.recruiters.map((recruiter) =>
                            <RecruiterListItem key={recruiter.id}
                                               recruiter={recruiter}
                                               history={this.props.history}
                                               delete={this.handleDelete}/>
                        )}
                        </tbody>
                    </table>
                   
                </div>
            </div>
        );
    }
}

export default Recruiters;
