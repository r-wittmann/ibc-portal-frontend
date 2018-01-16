import React, { Component } from 'react';
import translate from "../../../translationService";

class RegistrationListItem extends Component {
    render() {
        return (
            <tr key={this.props.account.id}>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.contact_name}</td>
                <td>{this.props.account.email}</td>
                <td>{this.props.account.contact_phone}</td>
                <td>{this.props.account.website}</td>
                <td>
                    <select id={'company_type'}
                            value={this.props.account.company_type}
                            className="form-control"
                            onChange={(event) => this.props.handleChangeType(event, this.props.account.id)}>
                        {Object.keys(translate.companyType()).map(key =>
                            <option key={key} value={key}>{translate.companyType(key)}</option>
                        )}
                    </select>
                </td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.handleAccept(this.props.account.id, this.props.account.company_type)}>
                            <span className={'fa fa-check'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.handleDecline(this.props.account.id)}>
                            <span className={'fa fa-times'}/>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default RegistrationListItem;
