import React, { Component } from 'react';
import backendService from '../../backendService';

class PostingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: '',
            content: '',
            selectedCompany: undefined,
            selectedRecruiter: undefined,
            companies: [],
            recruiters: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        backendService.getCompanies().then(companies => this.setState({ companies }));
        backendService.getRecruiters().then(recruiters => this.setState({ recruiters }));
    }

    handleSubmit = (event) => {
        backendService.createPosting(
            this.state.title,
            this.state.subtitle,
            this.state.content,
            this.state.selectedCompany ? this.state.selectedCompany : this.state.companies[0],
            this.state.selectedRecruiter ? this.state.selectedRecruiter : this.state.recruiters[0]
        )
            .then((response) => this.props.history.push(`/postings/${response.id}`));
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <div>Create a new Posting</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Title:
                            <input
                                type={'text'}
                                value={this.state.title}
                                onChange={(event) => this.setState({ title: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Subtitle:
                            <input
                                type={'text'}
                                value={this.state.subtitle}
                                onChange={(event) => this.setState({ subtitle: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Content:
                            <input
                                type={'text'}
                                value={this.state.content}
                                onChange={(event) => this.setState({ content: event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Company:
                            <select
                                value={this.state.selectedCompany}
                                onChange={(event) => this.setState({ selectedCompany: event.target.value })}>
                                {this.state.companies.map(company => (
                                    <option key={company._id} value={company._id}>{company.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Recruiter:
                            <select
                                value={this.state.selectedRecruiter}
                                onChange={(event) => this.setState({ selectedRecruiter: event.target.value })}>
                                {this.state.recruiters.map(recruiter => (
                                    <option key={recruiter._id} value={recruiter._id}>{recruiter.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <input type={'submit'} value={'Submit'}/>
                    </div>
                </form>
                <div>
                    <button onClick={() => this.props.history.push('/postings')}>
                        back
                    </button>
                </div>
            </div>
        );
    }
}

export default PostingCreate;
