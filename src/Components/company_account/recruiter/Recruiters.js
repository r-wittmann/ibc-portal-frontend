import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from '../Header';
import RecruiterListItem from './RecruiterListItem';
import { toast } from 'react-toastify';

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
            recruiters: [],
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters, loading: false }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Recruiter</h1>
                </div>
                <p className={'description'}>Legen Sie Recruiter-Profile an, fügen Sie diese Ihren Stellenanzeigen hinzu
                    und verwalten Sie diese.
                </p>
                <div className={'create-button'}>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.push('/company/recruiters/create')}>
                        Neuen Recruiter erstellen
                    </button>
                </div>
                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        : <table className={'table table-hover'}>
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
                    }
                </div>
            </div>
        );
    }
}

export default Recruiters;
