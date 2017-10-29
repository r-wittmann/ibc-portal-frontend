import React, { Component } from 'react';
import backendService from '../../backendService';

class Recruiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiter: undefined
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        backendService.getRecruiterById(this.props.match.params.id)
            .then(recruiter => this.setState({ recruiter }))
    }

    handleSubmit = () => {
        console.log(this.state.recruiter);
        backendService.updateRecruiter(this.props.match.params.id, this.state.recruiter)
            .then(recruiter => this.setState({ recruiter }))
    };

    handleDelete = () => {
        backendService.deleteRecruiter(this.state.recruiter._id);
        this.props.history.push('/home');
    };

    render() {
        return (
            <div>
                <div>Recruiter</div>
                <div>
                    {this.state.recruiter && (
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type={'text'}
                                        value={this.state.recruiter.name}
                                        onChange={(event) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { name: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input
                                        type={'text'}
                                        value={this.state.recruiter.email}
                                        onChange={(event) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { email: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Telephone:
                                    <input
                                        type={'text'}
                                        value={this.state.recruiter.telephone}
                                        onChange={(event) => this.setState({
                                            recruiter: Object.assign({}, this.state.recruiter, { telephone: event.target.value })
                                        })}/>
                                </label>
                            </div>
                            <div>
                                <input type={'submit'} value={'Submit'}/>
                            </div>
                        </form>
                    )}
                    <div>
                        <button onClick={this.handleDelete}>delete this recruiter</button>
                    </div>
                    <div>
                        <button onClick={() => this.props.history.push('/recruiters')}>
                            back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recruiter;
