import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from "../../commons/ConfirmModal";

class CompanyListItem extends Component {

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/companies/${this.props.company.id}`}>{this.props.company.company_name}</Link>
                </td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/companies/${this.props.company.id}/preview`)}>
                            <span className={'fa fa-eye'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/companies/${this.props.company.id}`)}>
                            <span className={'fa fa-pencil-alt'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                data-toggle='modal'
                                data-target={`#confirm-modal-${this.props.company.id}`}>
                            <span className={'fa fa-trash'}/>
                        </button>
                    </div>
                    <ConfirmModal
                        id={`confirm-modal-${this.props.company.id}`}
                        message={`Wollen Sie das Unternehmen ${this.props.company.company_name} wirklich löschen?`}
                        positiveAction={() => this.props.delete(this.props.company.id)}
                        positiveText={'Löschen'}
                        negativeAction={() => {/*closes the modal*/}}
                        negativeText={'Abbrechen'}
                    />
                </td>
                <td>{this.props.company.count}</td>

            </tr>
        );
    }
}

export default CompanyListItem;
