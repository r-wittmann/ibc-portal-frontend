import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import { toast } from "react-toastify";
import PostingListItem from "./PostingListItem";

class Postings extends Component {
    handleDelete = (postingId) => {
        backendService.deletePosting(postingId)
            .then(() => this.setState({ postings: this.state.postings.filter(posting => posting.id !== postingId) }))
            .then(() => toast('Anzeige erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            postings: []
        };
    }

    componentDidMount() {
        backendService.getPostings()
            .then((postings) => this.setState({ postings }));
    }

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
