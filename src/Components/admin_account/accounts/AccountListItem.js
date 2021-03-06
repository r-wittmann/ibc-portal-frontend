import React, { Component } from 'react';
import ConfirmModal from '../../commons/ConfirmModal';
import translate from '../../../translationService';

class AccountListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    };

    render() {
        return (
            <tr key={this.props.account.id}>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.contact_name}</td>
                <td>
                    {this.state.editMode
                        ? <input type={'email'}
                                 onChange={(event) => this.props.updateEmail(event, this.props.account.id)}
                                 value={this.props.account.email}/>
                        : this.props.account.email
                    }
                </td>
                <td>{this.props.account.contact_phone}</td>
                <td>{this.props.account.website}</td>
                <td>
                    {this.state.editMode
                        ? <select id={'company_type'}
                                  value={this.props.account.company_type}
                                  className='form-control'
                                  onChange={(event) => this.props.updateType(event, this.props.account.id)}>
                            {Object.keys(translate.companyType()).map(key =>
                                <option key={key} value={key}>{translate.companyType(key)}</option>
                            )}
                        </select>
                        : translate.companyType(this.props.account.company_type)
                    }
                </td>
                <td>{translate.registrationStatus(this.props.account.status)}</td>
                <td>
                    {!this.state.editMode
                        ? <div className={'btn-group'}>
                            <button className={'btn btn-outline-dark'}
                                    onClick={() => this.setState({ editMode: true })}>
                                <span className={'fa fa-pencil-alt'}/>
                            </button>
                            <button className={'btn btn-outline-dark'}
                                    data-toggle='modal'
                                    data-target={`#confirm-modal-${this.props.account.id}`}>
                                <span className={'fa fa-trash'}/>
                            </button>
                        </div>
                        : <div className={'btn-group'}>
                            <button className={'btn btn-outline-dark'}
                                    onClick={() => {
                                        this.setState({ editMode: false });
                                        this.props.handleSave(this.props.account.id);
                                    }}>
                                <span className={'fa fa-check'}/>
                            </button>
                            <button className={'btn btn-outline-dark'}
                                    onClick={() => this.setState({ editMode: false })}>
                                <span className={'fa fa-times'}/>
                            </button>
                        </div>
                    }

                    <ConfirmModal
                        id={`confirm-modal-${this.props.account.id}`}
                        message={`Wollen Sie den Account ${this.props.account.name} wirklich löschen?`}
                        positiveAction={() => this.props.delete(this.props.account.id)}
                        positiveText={'Löschen'}
                        negativeAction={() => {/*closes the modal*/
                        }}
                        negativeText={'Abbrechen'}
                    />
                </td>
            </tr>
        );
    }
}

export default AccountListItem;
