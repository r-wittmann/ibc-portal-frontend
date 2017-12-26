import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import TextEditor from "../../commons/TextEditor";
import defaultPosting from '../../commons/defaultPosting';
import image from '../../../../resources/ibc_logo.png';

class Posting extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            backendService.updatePosting(this.props.match.params.id, this.state.posting)
                .then(response => this.setState({ posting: response.posting }))
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
        backendService.deletePosting(this.state.posting._id);
        this.props.history.push('/home');
    };

    constructor(props) {
        super(props);
        this.state = {
            posting: undefined,
            create: this.props.match.params.id === 'create',
            companies: [],
            recruiters: []
        };
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

    render() {
        return (
            <div>
                <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                    <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                    <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}></span>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNav">
                        <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Home</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/companies')}>Ihr
                                    Unternehmen</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/recruiters')}>Ihre
                                    Recruiter</a>
                            </li>
                            <li className={'nav-item active'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/postings')}>Ihre
                                    Stellenanzeigen</a>
                            </li>
                        </ul>

                        <ul className={'navbar-nav my-2 my-lg-0'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr
                                    Profil</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                            </li>
                        </ul>

                    </div>
                </nav>
                <div className={'headline'}>
                    <h1>Neue Stellenanzeige erstellen</h1>
                </div>
                <div className={'container'}>
                    {this.state.posting && (
                        <form onSubmit={this.handleSubmit}>
                            <InputLabel
                                label={'Title'}
                                value={this.state.posting.title}
                                onChange={(title) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { title })
                                })}
                            />
                            <InputLabel
                                label={'Startdatum'}
                                value={this.state.posting.startDate}
                                onChange={(startDate) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { startDate })
                                })}
                            />
                            <InputLabel
                                label={'Vertragstyp'}
                                value={this.state.posting.contractType}
                                onChange={(contractType) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { contractType })
                                })}
                            />
                            <InputLabel
                                label={'Vertragsdauer'}
                                value={this.state.posting.contractDuration}
                                onChange={(contractDuration) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { contractDuration })
                                })}
                            />
                            <InputLabel
                                label={'Wochenstunden'}
                                value={this.state.posting.workingHours}
                                onChange={(workingHours) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { workingHours })
                                })}
                            />
                            <InputLabel
                                label={'Einstiegslevel'}
                                value={this.state.posting.entryLevel}
                                onChange={(entryLevel) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { entryLevel })
                                })}
                            />
                            <InputLabel
                                label={'Standort'}
                                value={this.state.posting.placeOfEmployment}
                                onChange={(placeOfEmployment) => this.setState({
                                    posting: Object.assign({}, this.state.posting, { placeOfEmployment })
                                })}
                            />
                            <div className={"form-group"}>
                                <label>
                                    Unternehmen:
                                </label>
                                <select className={"form-control"}
                                        value={this.state.selectedCompany}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { selectedCompany: event.target.value })
                                        })}>
                                    {this.state.companies.map(company => (
                                        <option key={company._id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={"form-group"}>
                                <label>
                                    Recruiter
                                </label>
                                <select className={"form-control"}
                                        value={this.state.selectedRecruiter}
                                        onChange={(event) => this.setState({
                                            posting: Object.assign({}, this.state.posting, { selectedRecruiter: event.target.value })
                                        })}>
                                    {this.state.recruiters.map(recruiter => (
                                        <option key={recruiter._id} value={recruiter._id}>{recruiter.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                Beschreibung
                                <TextEditor
                                    value={this.state.posting.content}
                                    onChange={(content) => this.setState({
                                        posting: Object.assign({}, this.state.posting, { content })
                                    })}/>
                            </div>
                            <div>
                                <input type={'submit'} className={'btn btn-primary float-right buttons-form'}
                                       value={this.state.create ? 'Speichern' : 'Update'}/>
                            </div>
                        </form>
                    )}

                    {!this.state.create && (
                        <div>
                            <button onClick={this.handleDelete}>delete this posting</button>
                        </div>
                    )}
                    <div className={'float-right'}>
                        <button className={'btn btn-danger buttons-form'}
                                onClick={() => this.props.history.push('/postings')}>Abbrechen
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posting;
