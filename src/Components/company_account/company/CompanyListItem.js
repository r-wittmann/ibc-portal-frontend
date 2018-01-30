import React, { Component } from 'react';
import ConfirmModal from '../../commons/ConfirmModal';
import { Link } from 'react-router-dom';

class CompanyListItem extends Component {

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/company/companies/${this.props.company.id}`}>{this.props.company.company_name}</Link>
                </td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'} data-toggle='tooltip' data-placement='top'
                                title='Vorschau'
                                onClick={() => this.props.history.push(`/company/companies/${this.props.company.id}/preview`)}>
                            <span className={'fa fa-eye'}/>
                        </button>
                        <button className={'btn btn-outline-dark'} data-toggle='tooltip' data-placement='top'
                                title='Bearbeiten'
                                onClick={() => this.props.history.push(`/company/companies/${this.props.company.id}`)}>
                            <span className={'fa fa-pencil-alt'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                // double prop 'data-toggle' is needed to allow both tooltip and the opening of a modal on click
                                data-toggle='tooltip' data-toggle='modal' // eslint-disable-line react/jsx-no-duplicate-props
                                data-placement='top'
                                title='Löschen'
                                data-target={`#confirm-modal-${this.props.company.id}`}>
                            <span className={'fa fa-trash'}/>
                        </button>
                    </div>
                    <ConfirmModal
                        id={`confirm-modal-${this.props.company.id}`}
                        message={`Wollen Sie das Unternehmen ${this.props.company.company_name} wirklich löschen?`}
                        positiveAction={() => this.props.delete(this.props.company.id)}
                        positiveText={'Löschen'}
                        negativeAction={() => {/*closes the modal*/
                        }}
                        negativeText={'Abbrechen'}
                    />
                </td>
                <td>
                    {this.props.company.activeCount
                        ? <Link to={'/company/postings#status=active&company_id=' + this.props.company.id}>
                            {this.props.company.activeCount}
                        </Link>
                        : 0
                    }
                </td>
                <td>
                    {this.props.company.totalCount !== 0
                        ? <Link to={'/company/postings#company_id=' + this.props.company.id}>
                            {this.props.company.totalCount}
                        </Link>
                        : 0
                    }
                </td>

            </tr>
        );
    }
}

export default CompanyListItem;
