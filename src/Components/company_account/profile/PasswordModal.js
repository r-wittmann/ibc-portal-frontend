import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";
import { toast } from "react-toastify";

class PasswordModal extends Component {
    resetState = () => {
        this.setState({
            old: '',
            new: '',
            confirm: ''
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.resetState();
        if (this.state.old === this.state.new) {
            toast('Altes und neues Passwort dürfen nicht übereinstimmen', { type: 'error' })
        } else if (this.state.new === this.state.confirm) {
            backendService.updatePassword(this.state.old, this.state.new)
                .then(() => toast('Passwort aktualisiert', { type: 'success' }))
                .then(() => {
                    let modal = document.getElementById('changePassword');
                    modal.classList.remove('show');
                    modal.style.display = 'none';
                    document.body.classList.remove('modal-open');
                    let backdrop = document.getElementsByClassName('modal-backdrop')[0];
                    backdrop.parentNode.removeChild(backdrop);
                })
            .catch(() => toast('Das alte Passwort stimmt nicht mit dem von uns gespeicherten Passwort überein', { type: 'error' }));
        } else {
            toast('Neues Password und Bestätigung stimmen nicht überein', { type: 'error' })
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            old: '',
            new: '',
            confirm: ''
        };
    }

    render() {
        return (
            <div className="modal fade" id="changePassword">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Passwort ändern</h5>
                        </div>
                        <div className="modal-body">
                            <InputLabel
                                label={'Altes Passwort'}
                                type={'password'}
                                value={this.state.old}
                                onChange={(old) => this.setState({ old })}/>
                            <InputLabel
                                label={'Neues Passwort'}
                                type={'password'}
                                value={this.state.new}
                                onChange={(newPW) => this.setState({ new: newPW })}/>
                            <InputLabel
                                label={'Bestätigen'}
                                type={'password'}
                                value={this.state.confirm}
                                onChange={(confirm) => this.setState({ confirm })}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    onClick={this.resetState}
                                    className="btn btn-secondary"
                                    data-dismiss="modal">
                                Abbrechen
                            </button>
                            <button type="button"
                                    onClick={this.handleSubmit}
                                    className="btn btn-primary">
                                Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PasswordModal;
