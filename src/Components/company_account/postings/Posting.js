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
import UploadFileModal from "../../commons/UploadFileModal";
import DatePicker from 'react-datepicker'
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Posting extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.inputForm.hasAttribute('novalidate') && !this.inputForm.checkValidity()) {
            event.stopPropagation();
            this.inputForm.classList.add('was-validated')
        } else if (event.target.getAttribute('id') === 'preview') {
            this.startPreview();
        } else {
            this.savePosting();
        }
    };

    startPreview = () => {
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
    };

    savePosting = () => {
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 60);

        if (!this.state.create) {
            let updatedPosting = this.state.posting;
            delete(updatedPosting.created_at);
            delete(updatedPosting.updated_at);
            if (this.state.originalPostingStatus !== updatedPosting.status) {
                updatedPosting.expiry_date = updatedPosting.status === 'active'
                    ? expiryDate
                    : '';
            }
            backendService.updatePosting(this.props.match.params.id, updatedPosting)
                .then(() => this.props.history.push(`/company/postings`))
                .then(() => toast('Anzeige aktualisiert', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        } else {
            let posting = this.state.posting;
            if (posting.company_id === '') posting.company_id = this.state.companies[0].id;
            if (posting.recruiter_id === '') posting.recruiter_id = this.state.recruiters[0].id;
            posting.expiry_date = posting.status === 'active'
                ? expiryDate
                : '';
            backendService.createPosting(posting)
                .then(() => this.props.history.push(`/company/postings`))
                .then(() => toast('Anzeige erstellt', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
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
            recruiters: [],
            originalPostingStatus: '',
            loading: false,
            dateSelected: false
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({ preview: true })
        }
        if (!this.state.create) {
            this.setState({ loading: true });
            backendService.getPostingById(this.props.match.params.id)
                .then(posting => this.setState({
                    posting,
                    originalPostingStatus: posting.status,
                    loading: false,
                    dateSelected: posting.start_of_employment !== 'Ab Sofort' && posting.start_of_employment !== 'Nach Vereinbarung'
                }))
        } else {
            this.setState({ posting: defaultPosting, originalPostingStatus: defaultPosting.status });
        }
        backendService.getCompanies().then(companies => this.setState({ companies }));
        backendService.getRecruiters().then(recruiters => this.setState({ recruiters }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  ref={(form) => this.inputForm = form}
                  noValidate>
                <Header history={this.props.history}/>
                {this.state.loading
                    ? <div className={'loader'}/>
                    : <div className={'container'}>
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
                                                label={'Titel'}
                                                required
                                                value={this.state.posting.title}
                                                onChange={(title) => this.setState({
                                                    posting: Object.assign({}, this.state.posting, { title })
                                                })}
                                                errorMessage={'Titel ist ein Pflichtfeld'}/>
                                            {this.state.companies.length > 0 &&
                                            <div className={"form-group row"}>
                                                <label className={'col-4 col-form-label'} data-toggle="tooltip" data-placement="top" title="Ihre angelegten Unternehmen">
                                                    Unternehmen: <span className={'fa fa-info-circle'}/>
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
                                                errorMessage={'Standort ist ein Pflichtfeld'}/>
                                            <div className={"form-group row"}>
                                                <label className={'col-4 col-form-label'}>
                                                    Startdatum
                                                </label>
                                                <div className={'col-8'}>
                                                    <div className={'form-check form-check-inline'}
                                                         style={{ marginLeft: 30 }}>
                                                        <input id={'abSofort'}
                                                               className={'form-check-input'}
                                                               type={'radio'}
                                                               name={'startingDate'}
                                                               checked={this.state.posting.start_of_employment === 'Ab Sofort'}
                                                               onChange={() => this.setState({
                                                                   dateSelected: false,
                                                                   posting: Object.assign({}, this.state.posting, {
                                                                       start_of_employment: 'Ab Sofort'
                                                                   })
                                                               })}/>
                                                        <label htmlFor={'abSofort'}
                                                               className={'form-check-label'}>Ab Sofort</label>
                                                    </div>
                                                    <div className={'form-check form-check-inline'}
                                                         style={{ marginLeft: 30 }}>
                                                        <input id={'nachAbsprache'}
                                                               className={'form-check-input'}
                                                               type={'radio'}
                                                               name={'startingDate'}
                                                               checked={this.state.posting.start_of_employment === 'Nach Vereinbarung'}
                                                               onChange={() => this.setState({
                                                                   dateSelected: false,
                                                                   posting: Object.assign({}, this.state.posting, {
                                                                       start_of_employment: 'Nach Vereinbarung'
                                                                   })
                                                               })}/>
                                                        <label htmlFor={'nachAbsprache'} className={'form-check-label'}>Nach
                                                            Vereinbarung</label>
                                                    </div>
                                                    <div className={'form-check form-check-inline'}
                                                         style={{ marginLeft: 30 }}>
                                                        <label htmlFor={'custom'}
                                                               className={'form-check-label'}>
                                                                <DatePicker
                                                                    className={'form-control text-right'}
                                                                    dateFormat={'DD.MM.YYYY'}
                                                                    minDate={moment()}
                                                                    selected={this.state.dateSelected ? moment(new Date(this.state.posting.start_of_employment)) : moment()}
                                                                    onChange={(date) => this.setState({
                                                                        dateSelected: true,
                                                                        posting: Object.assign({}, this.state.posting, {
                                                                            start_of_employment: date
                                                                        })
                                                                    })}
                                                                />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
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
                                                            <option key={key}
                                                                    value={key}>{translate.contractDuration(key)}</option>
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
                                                errorMessage={'Wochenstunden ist ein Pflichtfeld'}/>
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
                                                            <option key={key}
                                                                    value={key}>{translate.contractType(key)}</option>
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
                                                            <option key={key}
                                                                    value={key}>{translate.entryLevel(key)}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <InputLabel
                                                label={'Bewerbungslink'}
                                                type={"url"}
                                                required={true}
                                                value={this.state.posting.application_link}
                                                onChange={(application_link) => this.setState({
                                                    posting: Object.assign({}, this.state.posting, { application_link })
                                                })}
                                                errorMessage={'Bitte eine valide URL eingeben'}/>
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
                                                            <option key={key}
                                                                    value={key}>{translate.fieldOfEmployment(key)}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"form-group row"}>
                                                <label className={'col-4 col-form-label'}>
                                                    Stelle gleich im Portal veröffentlichen?
                                                </label>
                                                <div className={'col-8'}>
                                                    <select className={'form-control'}
                                                            value={this.state.posting.status}
                                                            onChange={(event) => this.setState({
                                                                posting: Object.assign({}, this.state.posting, { status: event.target.value })
                                                            })}>
                                                        <option value={'active'}>Ja (Ist sofort sichtbar für Studenten)
                                                        </option>
                                                        <option value={'deactivated'}>Nein (Wird Studenten noch nicht
                                                            angezeigt)
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={'from-group row'}>
                                                <label className={'col-4 col-form-label'}>
                                                    Beschreibung
                                                </label>
                                                <div className={'col-8'}>
                                                    <div className={'form-check form-check-inline'}
                                                         style={{ marginLeft: 30 }}>
                                                        <input id={'free-text'}
                                                               className={'form-check-input'}
                                                               type={'radio'}
                                                               name={'pdf-radios'}
                                                               checked={!this.state.posting.pdf}
                                                               onChange={() => this.setState({
                                                                   posting: Object.assign({}, this.state.posting, {
                                                                       pdf: false,
                                                                       description: defaultPosting.description
                                                                   })
                                                               })}/>
                                                        <label htmlFor={'free-text'}
                                                               className={'form-check-label'}>Freitext</label>
                                                    </div>
                                                    <div className={'form-check form-check-inline'}
                                                         style={{ marginLeft: 30 }}>
                                                        <input id={'pdf'}
                                                               className={'form-check-input'}
                                                               type={'radio'}
                                                               name={'pdf-radios'}
                                                               checked={this.state.posting.pdf}
                                                               onChange={() => this.setState({
                                                                   posting: Object.assign({}, this.state.posting, {
                                                                       pdf: true,
                                                                       description: ''
                                                                   })
                                                               })}/>
                                                        <label htmlFor={'pdf'} className={'form-check-label'}>PDF
                                                            Upload</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {this.state.posting.pdf
                                                    ? <div className='form-group row'>
                                                        <label htmlFor={'pdf'} className='col-4 col-form-label'>
                                                        </label>
                                                        <div className='col-8'>
                                                            <button type={'button'} className='btn btn-primary'
                                                                    data-toggle="modal"
                                                                    data-target="#uploadFile">
                                                                Beschreibung als PDF hochladen
                                                            </button>
                                                            <span style={this.state.posting.description
                                                                ? { marginLeft: 12, fontSize: 32, color: '#28a745' }
                                                                : { marginLeft: 12, fontSize: 32, color: '#dc3545' }}
                                                                  className={this.state.posting.description
                                                                      ? 'far fa-check-circle align-middle is-valid'
                                                                      : 'far fa-times-circle align-middle is-invalid'}/>
                                                        </div>
                                                        <UploadFileModal
                                                            title={'Beschreibung als PDF hochladen'}
                                                            accept={'application/pdf'}
                                                            returnFile={(description) => this.setState({
                                                                posting: Object.assign({}, this.state.posting, { description })
                                                            })}/>
                                                    </div>
                                                    : <TextEditor value={this.state.posting.description}
                                                                  onChange={(description) => this.setState({
                                                                      posting: Object.assign({}, this.state.posting, { description })
                                                                  })}/>
                                                }
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
