import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import defaultRecruiter from '../../commons/defaultRecruiter';
import UploadFileModal from "../../commons/UploadFileModal";
import Header from "../Header";

class Recruiter extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.create) {
            let updatedRecruiter = this.state.recruiter;
            delete(updatedRecruiter.created_at);
            delete(updatedRecruiter.updated_at);
            if (!this.state.photoChanged) {
                delete(updatedRecruiter.photo);
            }
            backendService.updateRecruiter(this.props.match.params.id, updatedRecruiter)
            // call confirmation alert
            // .then(() => confirmationAlert())
            // .catch(() => failureAlert());
        } else {
            backendService.createRecruiter(this.state.recruiter)
                .then(() => this.props.history.push(`/recruiters`));
        }

    };
    handleDelete = () => {
        event.preventDefault();
        backendService.deleteRecruiter(this.props.match.params.id)
        // call confirmation alert
        // .then(() => confirmationAlert())
            .then(() => this.props.history.push('/recruiters'))
        // .catch(() => failureAlert());
    };

    constructor(props) {
        super(props);
        this.state = {
            recruiter: undefined,
            photoChanged: false,
            create: this.props.match.params.id === 'create'
        };
    }

    componentDidMount() {
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

                <div className={'headline'}>
                    <h1>Neuen Recruiter erstellen</h1>
                </div>
                <div className={'container'}>
                    {this.state.recruiter && (
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
                                    <img src={this.state.recruiter.photo} style={{ marginLeft: 12 }} height={38}
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
                            <div>
                                <input type={'submit'} className={'btn btn-primary float-right buttons-form'}
                                       value={'Speichern'}/>
                            </div>
                        </form>
                    )}
                </div>
                {!this.state.create && (
                    <div>
                        <button onClick={this.handleDelete}>Löschen</button>
                    </div>
                )}
                <div>
                    <button className={'btn btn-danger float-right buttons-form'}
                            onClick={() => this.props.history.push('/recruiters')}>Abbrechen
                    </button>
                </div>
            </div>
        );
    }
}

export default Recruiter;
