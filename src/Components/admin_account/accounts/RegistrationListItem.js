import React, { Component } from 'react';
import translationService from "../../../translationService";

class RegistrationListItem extends Component {

    render() {
        return (
            <tr key={this.props.account.id}>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.contact_name}</td>
                <td>{this.props.account.email}</td>
                <td>{this.props.account.contact_phone}</td>
                <td>{this.props.account.website}</td>
                <td>{translationService.translateCompanyType(this.props.account.company_type)}</td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'}
                                data-toggle='modal'
                                data-target={'#' + this.props.account.id}>
                            <span className={'fa fa-check'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.handleDecline(this.props.account.id)}>
                            <span className={'fa fa-times'}/>
                        </button>
                    </div>
                    <div className="modal fade"
                         id={this.props.account.id}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    Stimmt die Unternehmensart?
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="ibc"
                                                   checked={this.props.account.company_type === 'ibc'}
                                                   onChange={(event) => this.props.handleChangeType(event, this.props.account.id)}/>
                                            IBC-Unternehmen
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="startup"
                                                   checked={this.props.account.company_type === 'startup'}
                                                   onChange={(event) => this.props.handleChangeType(event, this.props.account.id)}/>
                                            Startup
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   type="radio"
                                                   name="gridRadios"
                                                   value="ngo"
                                                   checked={this.props.account.company_type === 'ngo'}
                                                   onChange={(event) => this.props.handleChangeType(event, this.props.account.id)}/>
                                            Gemeinnütziger Verein
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button"
                                            onClick={() => {
                                            }}
                                            className="btn btn-secondary"
                                            data-dismiss="modal">Abbrechen
                                    </button>
                                    <button type="button"
                                            onClick={() => {
                                                this.props.handleAccept(this.props.account.id,
                                                    this.props.account.company_type);
                                            }}
                                            className="btn btn-primary"
                                            data-dismiss="modal">Speichern
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default RegistrationListItem;
