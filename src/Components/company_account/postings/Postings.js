import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import { toast } from "react-toastify";
import PostingListItem from "./PostingListItem";
import queryString from 'query-string';

class Postings extends Component {
    handleDelete = (postingId) => {
        backendService.deletePosting(postingId)
            .then(() => this.setState({ postings: this.state.postings.filter(posting => posting.id !== postingId) }))
            .then(() => toast('Anzeige erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    handleChange = (key, value) => {

        let search = queryString.parse(this.props.location.search);
        search[key] = value;

        location.search = queryString.stringify(search);
    };

    constructor(props) {
        super(props);
        this.state = {
            postings: [],
            companies: [],
            recruiters: [],
        };
    };

    componentDidMount() {
        backendService.getPostings(this.props.location.search)
            .then((postings) => this.setState({ postings }));
        backendService.getCompanies()
            .then((companies) => this.setState({ companies }));
        backendService.getRecruiters()
            .then((recruiters) => this.setState({ recruiters }));
    };

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Stellenanzeigen</h1>
                </div>
                <div className={'create-button'}>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.push('/postings/create')}>
                        Neues Posting erstellen
                    </button>
                </div>
                <div className={'container'}>
                    <div className={'row'}>
                        <div>
                            Status:
                            <div className={'from-check'}>
                                <input className={'form-radio-input'} type={'radio'} value={''} id={'active'}
                                       checked={queryString.parse(this.props.location.search).status === 'active'}
                                       onChange={() => this.handleChange('status', 'active')}/>
                                <label className={'form-check-label'} htmlFor={'active'}>
                                    Aktive
                                </label>
                            </div>
                            <div className={'from-check'}>
                                <input className={'form-radio-input'} type={'radio'} value={''} id={'deactivated'}
                                       checked={queryString.parse(this.props.location.search).status === 'deactivated'}
                                       onChange={() => this.handleChange('status', 'deactivated')}/>
                                <label className={'form-check-label'} htmlFor={'deactivated'}>
                                    Deaktiviert
                                </label>
                            </div>
                        </div>
                    </div>
                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>Titel</th>
                            {/* no expiry date yet */}
                            {/*<th>Ablaufdatum</th>*/}
                            <th>Unternehmen</th>
                            <th>Status</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.postings && this.state.postings.map((posting) =>
                            <PostingListItem key={posting.id}
                                             posting={posting}
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

export default Postings;
