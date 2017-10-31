import React, { Component } from 'react';
import backendService from '../../backendService';
import InputLabel from "../commons/InputLabel";
import TextEditor from "../TextEditor";
import defaultPosting from '../commons/defaultPosting';

class Posting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posting: undefined,
            create: this.props.match.params.id === 'create',
            companies: [],
            recruiters: []
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        if (!this.state.create) {
            backendService.getPostingById(this.props.match.params.id)
                .then(posting => this.setState({ posting }))
        } else {
            this.setState({
                posting: defaultPosting
            });
        }
        backendService.getCompanies().then(companies => this.setState({ companies }));
        backendService.getRecruiters().then(recruiters => this.setState({ recruiters }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            backendService.updatePosting(this.props.match.params.id, this.state.posting)
                .then(posting => this.setState({ posting }))
        } else {
            let posting = this.state.posting;
            if (!posting.company) posting.company = this.state.companies[0]._id;
            if (!posting.recruiter) posting.recruiter = this.state.recruiters[0]._id;
            backendService.createPosting(this.state.posting)
                .then((response) => {
                    this.props.history.push(`/postings/${response.id}`)
                });
        }
    };

    handleDelete = () => {
        if (!this.state.create) {
            backendService.deletePosting(this.state.posting._id);
            this.props.history.push('/home');
        } else {
            this.props.history.push('/postings');
        }
    };

    render() {
        return (
            <div>
                <div>Posting</div>
                <div>
                    {this.state.posting && (
                        <form onSubmit={this.handleSubmit}>
                            <InputLabel
                                label={'Title'}
                                value={this.state.posting.title}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { title: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Start of Employment'}
                                value={this.state.posting.startDate}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { startDate: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Contract Type'}
                                value={this.state.posting.contractType}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { contractType: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Contract Duration'}
                                value={this.state.posting.contractDuration}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { contractDuration: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Working Hours'}
                                value={this.state.posting.workingHours}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { workingHours: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Entry Level'}
                                value={this.state.posting.entryLevel}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { entryLevel: newValue })
                                })}
                            />
                            <InputLabel
                                label={'Place of Employment'}
                                value={this.state.posting.placeOfEmployment}
                                onChange={(newValue) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { placeOfEmployment: newValue })
                                })}
                            />
                            <div>
                                <label>
                                    Company:
                                    <select
                                        value={this.state.selectedCompany}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { selectedCompany: event.target.value })
                                        })}>
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
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { selectedRecruiter: event.target.value })
                                        })}>
                                        {this.state.recruiters.map(recruiter => (
                                            <option key={recruiter._id} value={recruiter._id}>{recruiter.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div>
                                Content:
                                {this.state.posting && (
                                    <TextEditor
                                        value={this.state.posting.content}
                                        onChange={(newValue) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { content: newValue })
                                        })}/>
                                )}
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
