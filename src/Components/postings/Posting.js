import React, { Component } from 'react';
import backendService from '../../backendService';

class Posting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posting: undefined
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        backendService.getPostingById(this.props.match.params.id)
            .then(posting => this.setState({ posting }))
    }

    handleSubmit = () => {
        backendService.updatePosting(this.props.match.params.id, this.state.posting)
            .then(posting => this.setState({ posting }))
    };

    handleDelete = () => {
        backendService.deletePosting(this.state.posting._id);
        this.props.history.push('/home');
    };

    render() {
        return (
            <div>
                <div>Posting</div>
                <div>
                    {this.state.posting && (
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Title:
                                    <input
                                        type={'text'}
                                        value={this.state.posting.title}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { title: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Subtitle:
                                    <input
                                        type={'text'}
                                        value={this.state.posting.subtitle}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { subtitle: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Content:
                                    <input
                                        type={'text'}
                                        value={this.state.posting.content}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { content: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <input type={'submit'} value={'Submit'}/>
                            </div>
                        </form>
                    )}
                    <div>
                        <button onClick={this.handleDelete}>delete this posting</button>
                    </div>
                    <div>
                        <button onClick={() => this.props.history.push('/postings')}>
                            back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posting;
