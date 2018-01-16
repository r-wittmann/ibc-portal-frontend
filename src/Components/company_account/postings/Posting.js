import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import TextEditor from "../../commons/TextEditor";
import defaultPosting from '../../commons/defaultPosting';
import Header from "../Header";
import { toast } from "react-toastify";
import ConfirmModal from "../../commons/ConfirmModal";
import PostingPreview from "./PostingPreview";
import translate from "../../../translationService";

class Posting extends Component {
    handleSubmit = (event) => {
        if (event.target.getAttribute('id') === 'preview') {
            if (this.inputForm.checkValidity()) {
                this.setState({
                    posting: Object.assign({}, this.state.posting,
                        {
                            company_id: this.state.posting.company_id === ''
                                ? this.state.companies[0].id
                                : this.state.posting.company_id,
                            recruiter_id: this.state.posting.recruiter_id === ''
                                ? this.state.recruiters[0].id
                                : this.state.posting.recruiter_id
                        })
                });
                this.setState({ preview: true });
            } else {
                return false;
            }
        } else {
            event.preventDefault();
            if (!this.state.create) {
                let updatedPosting = this.state.posting;
                delete(updatedPosting.created_at);
                delete(updatedPosting.updated_at);
                backendService.updatePosting(this.props.match.params.id, updatedPosting)
                    .then(() => this.props.history.push(`/company/postings`))
                    .then(() => toast('Anzeige aktualisiert', { type: 'success' }))
                    .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
            } else {
                let posting = this.state.posting;
                if (posting.company_id === '') posting.company_id = this.state.companies[0].id;
                if (posting.recruiter_id === '') posting.recruiter_id = this.state.recruiters[0].id;
                backendService.createPosting(posting)
                    .then(() => this.props.history.push(`/company/postings`))
                    .then(() => toast('Anzeige erstellt', { type: 'success' }))
                    .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
            }
        }
    };
    handleDelete = (event) => {
        event.preventDefault();
        backendService.deletePosting(this.state.posting.id)
            .then(() => this.props.history.push('/company/postings'))
            .then(() => toast('Anzeige erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            posting: undefined,
            create: this.props.match.params.id === 'create',
            companies: [],
            recruiters: []
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({ preview: true })
        }
        if (!this.state.create) {
            backendService.getPostingById(this.props.match.params.id)
                .then(posting => this.setState({ posting }))
        } else {
            this.setState({ posting: defaultPosting });
        }
        backendService.getCompanies().then(companies => this.setState({ companies }));
        backendService.getRecruiters().then(recruiters => this.setState({ recruiters }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  ref={(form) => { this.inputForm = form; }}>
                <Header history={this.props.history}/>
                {this.state.posting &&
                <div className={'container'}>
                    {this.state.preview ? (
                        <PostingPreview
                            posting={this.state.posting}
                            endPreview={this.props.preview
                                ? () => this.props.history.goBack()
                                : () => this.setState({ preview: false })
                            }
                            primaryAction={this.props.preview
                                ? () => {
                                    this.props.history.push(`/company/postings/${this.state.posting.id}`);
                                    this.setState({ preview: false })
                                }
                                : this.handleSubmit
                            }
                            primaryActionText={this.props.preview ? 'Editieren' : 'Speichern'}
                        />
                    ) : (
                        <div>
                            <div className={'headline'}>
                                <h1>{this.state.create ? 'Neue Stellenanzeige erstellen' : 'Stellenanzeige bearbeiten'}</h1>
                            </div>
                            {this.state.posting && (
                                <div>
                                    <div>
                                        <InputLabel
                                            label={'Title'}
                                            required
                                            value={this.state.posting.title}
                                            onChange={(title) => this.setState({
                                                posting: Object.assign({}, this.state.posting, { title })
                                            })}
                                        />
                                        {this.state.companies.length > 0 &&
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Unternehmen:
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.company_id !== ''
                                                            ? this.state.posting.company_id
                                                            : this.state.companies[0].id}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { company_id: event.target.value })
                                                        })}>
                                                    {this.state.companies.map(company => (
                                                        <option key={company.id}
                                                                value={company.id}>
                                                            {company.company_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        }
                                        <InputLabel
                                            label={'Standort'}
                                            required
                                            value={this.state.posting.place_of_employment}
                                            onChange={(place_of_employment) => this.setState({
                                                posting: Object.assign({}, this.state.posting, { place_of_employment })
                                            })}
                                        />
                                        <InputLabel
                                            label={'Startdatum'}
                                            required
                                            value={this.state.posting.start_of_employment}
                                            onChange={(start_of_employment) => this.setState({
                                                posting: Object.assign({}, this.state.posting, { start_of_employment })
                                            })}
                                        />
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Vertragslaufzeit
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.contract_duration}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { contract_duration: event.target.value })
                                                        })}>
                                                    {Object.keys(translate.contractDuration()).map(key =>
                                                        <option key={key} value={key}>{translate.contractDuration(key)}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <InputLabel
                                            label={'Wochenstunden'}
                                            required
                                            value={this.state.posting.working_hours}
                                            onChange={(working_hours) => this.setState({
                                                posting: Object.assign({}, this.state.posting, { working_hours })
                                            })}
                                        />
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Vertragstyp
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.contract_type}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { contract_type: event.target.value })
                                                        })}>
                                                    {Object.keys(translate.contractType()).map(key =>
                                                        <option key={key} value={key}>{translate.contractType(key)}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Zielgruppe
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.entry_level}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { entry_level: event.target.value })
                                                        })}>
                                                    {Object.keys(translate.entryLevel()).map(key =>
                                                        <option key={key} value={key}>{translate.entryLevel(key)}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <InputLabel
                                            label={'Bewerbungslink'}
                                            type={"text"}
                                            required={true}
                                            value={this.state.posting.application_link}
                                            onChange={(application_link) => this.setState({
                                                posting: Object.assign({}, this.state.posting, { application_link })
                                            })}
                                        />
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Recruiter
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={"form-control"}
                                                        value={this.state.posting.recruiter_id}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { recruiter_id: event.target.value })
                                                        })}>
                                                    {this.state.recruiters.map(recruiter => (
                                                        <option key={recruiter.id}
                                                                value={recruiter.id}>{recruiter.recruiter_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Tätigkeitsbereich
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.field_of_employment}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { field_of_employment: event.target.value })
                                                        })}>
                                                    {Object.keys(translate.fieldOfEmployment()).map(key =>
                                                        <option key={key} value={key}>{translate.fieldOfEmployment(key)}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            Beschreibung
                                            <TextEditor
                                                value={this.state.posting.description}
                                                onChange={(description) => this.setState({
                                                    posting: Object.assign({}, this.state.posting, { description })
                                                })}/>
                                        </div>
                                        <div className={"form-group row"}>
                                            <label className={'col-4 col-form-label'}>
                                                Erstellen im Status
                                            </label>
                                            <div className={'col-8'}>
                                                <select className={'form-control'}
                                                        value={this.state.posting.status}
                                                        onChange={(event) => this.setState({
                                                            posting: Object.assign({}, this.state.posting, { status: event.target.value })
                                                        })}>
                                                    {Object.keys(translate.postingStatus()).map(key =>
                                                        <option key={key} value={key}>{translate.postingStatus(key)}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='float-right'>
                                        {!this.state.create && (
                                            <span>
                                                <button className={'btn btn-danger buttons-form'}
                                                        type={'button'}
                                                        data-toggle={'modal'}
                                                        data-target={'#confirm-modal'}>
                                                    Anzeige löschen
                                                </button>
                                                <ConfirmModal
                                                    id={'confirm-modal'}
                                                    message={`Wollen Sie die Anzeige mit dem Titel ${this.state.posting.title} wirklich löschen?`}
                                                    positiveAction={this.handleDelete}
                                                    positiveText={'Löschen'}
                                                    negativeAction={() => {/*closes the modal*/
                                                    }}
                                                    negativeText={'Abbrechen'}/>
                                            </span>
                                        )}
                                        <button type={'button'} className={'btn btn-warning buttons-form'}
                                                onClick={() => this.props.history.goBack()}>
                                            {this.state.create ? 'Abbrechen' : 'Zurück'}
                                        </button>
                                        <button id={'preview'} className={'btn btn-primary button-form'}
                                                onClick={this.handleSubmit}>
                                            Vorschau
                                        </button>
                                        <button className={'btn btn-success buttons-form'}>
                                            {this.state.create ? 'Speichern' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                }
            </form>
        );
    }
}

export default Posting;
