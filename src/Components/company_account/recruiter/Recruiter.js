import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import defaultRecruiter from '../../commons/defaultRecruiter';
import UploadFileModal from "../../commons/UploadFileModal";
import Header from "../Header";
import { toast } from "react-toastify";
import RecruiterPreview from "./RecruiterPreview";
import ConfirmModal from "../../commons/ConfirmModal";

class Recruiter extends Component {
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            let updatedRecruiter = this.state.recruiter;
            delete(updatedRecruiter.created_at);
            delete(updatedRecruiter.updated_at);
            if (!this.state.photoChanged) {
                delete(updatedRecruiter.photo);
            }
            backendService.updateRecruiter(this.props.match.params.id, updatedRecruiter)
                .then(() => toast('Recruiter aktualisiert', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        } else {
            backendService.createRecruiter(this.state.recruiter)
                .then(() => this.props.history.push(`/recruiters`))
                .then(() => toast('Recruiter erstellt', { type: 'success' }))
                .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
        }

    };
    handleDelete = (event) => {
        event.preventDefault();
        backendService.deleteRecruiter(this.props.match.params.id)
            .then(() => this.props.history.push('/recruiters'))
            .then(() => toast('Recruiter erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            recruiter: undefined,
            photoChanged: false,
            create: this.props.match.params.id === 'create'
        };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({ preview: true })
        }
        if (!this.state.create) {
            backendService.getRecruiterById(this.props.match.params.id)
                .then(recruiter => this.setState({ recruiter }));
        } else {
            this.setState({ recruiter: defaultRecruiter });
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                {this.state.preview ? (
                    <RecruiterPreview
                        recruiter={this.state.recruiter}
                        endPreview={() => {
                            if (this.props.preview) {
                                this.props.history.push('/recruiters');
                            } else {
                                this.setState({ preview: false });
                            }
                        }}
                    />
                ) : (
                    <div>
                        <div className={'headline'}>
                            <h1>{this.state.create ? 'Neuen Recruiter erstellen' : 'Recruiter bearbeiten'}</h1>
                        </div>
                        <div className={'container'}>
                            {this.state.recruiter && (
                                <div>
                                    <form onSubmit={this.handleSubmit}>
                                        <InputLabel
                                            label={'Name'}
                                            value={this.state.recruiter.recruiter_name}
                                            onChange={(recruiter_name) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { recruiter_name })
                                            })}/>
                                        <InputLabel
                                            label={'Email'}
                                            value={this.state.recruiter.recruiter_email}
                                            onChange={(recruiter_email) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { recruiter_email })
                                            })}/>
                                        <InputLabel
                                            label={'Telefon Mobile'}
                                            value={this.state.recruiter.mobile}
                                            onChange={(mobile) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { mobile })
                                            })}/>
                                        <InputLabel
                                            label={'Telefon Festnetz'}
                                            value={this.state.recruiter.phone}
                                            onChange={(phone) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { phone })
                                            })}/>
                                        <InputLabel
                                            label={'Position'}
                                            value={this.state.recruiter.position}
                                            onChange={(position) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { position })
                                            })}/>
                                        <InputLabel
                                            label={'Standort'}
                                            value={this.state.recruiter.location}
                                            onChange={(location) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { location })
                                            })}/>
                                        <div className='form-group row'>
                                            <label htmlFor={'photo'} className='col-4 col-form-label'>
                                                Foto Upload
                                            </label>
                                            <div className='col-8'>
                                                <button type={'button'} className='btn btn-primary' data-toggle="modal"
                                                        data-target="#uploadFile">
                                                    Foto ändern/hochladen
                                                </button>
                                                {this.state.recruiter.photo &&
                                                <img src={this.state.recruiter.photo} style={{ marginLeft: 12 }}
                                                     height={38}
                                                     alt={'logo'}/>
                                                }
                                            </div>
                                            <UploadFileModal
                                                title={'Foto ändern/hochladen'}
                                                returnFile={(photo) => this.setState({
                                                    recruiter: Object.assign({}, this.state.recruiter, { photo }),
                                                    photoChanged: true
                                                })}/>
                                        </div>
                                        <InputLabel
                                            label={'XING-Profil'}
                                            value={this.state.recruiter.xing}
                                            onChange={(xing) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { xing })
                                            })}/>
                                        <InputLabel
                                            label={'LinkedIn-Profil'}
                                            value={this.state.recruiter.linked_in}
                                            onChange={(linked_in) => this.setState({
                                                recruiter: Object.assign({}, this.state.recruiter, { linked_in })
                                            })}/>
                                    </form>
                                    <div className='float-right'>
                                        {!this.state.create && (
                                            <span>
                                                <button className={'btn btn-danger buttons-form'}
                                                        data-toggle={'modal'}
                                                        data-target={'#confirm-modal'}>
                                                Recruiter löschen
                                                </button>
                                                <ConfirmModal
                                                    id={'confirm-modal'}
                                                    message={`Wollen Sie den Recruiter ${this.state.recruiter.recruiter_name} wirklich löschen?`}
                                                    positiveAction={this.handleDelete}
                                                    positiveText={'Löschen'}
                                                    negativeAction={() => {/*closes the modal*/}}
                                                    negativeText={'Abbrechen'}/>
                                            </span>
                                        )}
                                        <button className={'btn btn-warning buttons-form'}
                                                onClick={() => this.props.history.push('/recruiters')}>
                                            {this.state.create ? 'Abbrechen' : 'Zurück'}
                                        </button>
                                        <button className={'btn btn-primary button-form'}
                                                onClick={() => this.setState({ preview: true })}>
                                            Vorschau
                                        </button>
                                        <button className={'btn btn-success buttons-form'}
                                                onClick={this.handleFormSubmit}>
                                            {this.state.create ? 'Speichern' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Recruiter;
