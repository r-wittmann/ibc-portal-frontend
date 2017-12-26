import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../../backendService';
import Header from "../Header";

class Postings extends Component {
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
                {this.state.postings.map((posting) =>
                    <div key={posting._id}>
                        <Link to={`/postings/${posting._id}`}>{posting.title}</Link>
                    </div>
                )}
                <div className={'create-button'}>
                    <button className={'btn btn-primary'} onClick={() => this.props.history.push('/postings/create')}>
                        Neue Stellenanzeige erstellen
                    </button>
                </div>
            </div>
        );
    }
}

export default Postings;
