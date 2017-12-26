import React, { Component } from 'react';
import backendService from '../../../backendService';
import InputLabel from "../../commons/InputLabel";

class PasswordModal extends Component {
    handleClose = () => {
        this.setState({
            old: '',
            new: '',
            confirm: ''
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose();
        backendService.updatePassword(this.state.old, this.state.new)
        // call confirmation alert
        // .then(() => confirmationAlert())
        // .catch(() => failureAlert());
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
            <div className="modal fade"
                 id="changePassword">
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
                                    onClick={this.handleClose}
                                    className="btn btn-secondary"
                                    data-dismiss="modal">Abbrechen
                            </button>
                            <button type="button"
                                    onClick={this.handleSubmit}
                                    className="btn btn-primary"
                                    data-dismiss="modal">Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PasswordModal;
