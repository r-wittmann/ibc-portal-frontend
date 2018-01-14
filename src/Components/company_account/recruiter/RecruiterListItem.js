import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from "../../commons/ConfirmModal";

class RecruiterListItem extends Component {

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/company/recruiters/${this.props.recruiter.id}`}>{this.props.recruiter.recruiter_name}</Link>
                </td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/company/recruiters/${this.props.recruiter.id}/preview`)}>
                            <span className={'fa fa-eye'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/company/recruiters/${this.props.recruiter.id}`)}>
                            <span className={'fa fa-pencil-alt'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                data-toggle='modal'
                                data-target={`#confirm-modal-${this.props.recruiter.id}`}>
                            <span className={'fa fa-trash'}/>
                        </button>
                    </div>
                    <ConfirmModal
                        id={`confirm-modal-${this.props.recruiter.id}`}
                        message={`Wollen Sie den Recruiter ${this.props.recruiter.recruiter_name} wirklich löschen?`}
                        positiveAction={() => this.props.delete(this.props.recruiter.id)}
                        positiveText={'Löschen'}
                        negativeAction={() => {/*closes the modal*/}}
                        negativeText={'Abbrechen'}
                    />
                </td>
                <td>
                    <Link to={'/company/postings#status=active&recruiter_id=' + this.props.recruiter.id}>{this.props.recruiter.activeCount}</Link>
                </td>
                <td>
                    <Link to={'/company/postings#recruiter_id=' + this.props.recruiter.id}>{this.props.recruiter.totalCount}</Link>
                </td>

            </tr>
        );
    }
}

export default RecruiterListItem;
