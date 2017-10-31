import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backendService from '../../backendService';

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
                <div>Postings</div>
                {this.state.postings.map((posting) =>
                    <div key={posting._id}>
                        <Link to={`/postings/${posting._id}`}>{posting.title}</Link>
                    </div>
                )}
                <div>
                    <button onClick={() => this.props.history.push('/postings/create')}>
                        create new posting
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

export default Postings;
