import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from "../../commons/ConfirmModal";

class PostingListItem extends Component {

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/company/postings/${this.props.posting.id}`}>{this.props.posting.title}</Link>
                </td>
                {/* no expiry date yet */}
                {/*<td>{this.props.posting.expiry_date}</td>*/}
                <td>{this.props.posting.contract_type}</td>
                <td>
                    <Link to={'/company/companies/' + this.props.posting.company_id + '/preview'}>{this.props.posting.company_name}</Link>
                </td>
                <td>
                    <Link to={'/company/recruiters/' + this.props.posting.recruiter_id + '/preview'}>{this.props.posting.recruiter_name}</Link>
                </td>
                <td>{this.props.posting.status}</td>
                <td>
                    <div className={'btn-group'}>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/company/postings/${this.props.posting.id}/preview`)}>
                            <span className={'fa fa-eye'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.history.push(`/company/postings/${this.props.posting.id}`)}>
                            <span className={'fa fa-pencil-alt'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                data-toggle='modal'
                                data-target={`#confirm-modal-${this.props.posting.id}`}>
                            <span className={'fa fa-trash'}/>
                        </button>
                        <button className={'btn btn-outline-dark'}
                                onClick={() => this.props.save(this.props.posting.id,this.props.posting.status === 'active' ? 'deactivated' : 'active')}>
                            <span className={this.props.posting.status === 'active' ? 'fa fa-pause' : 'fa fa-play'}/>
                        </button>
                    </div>
                    <ConfirmModal
                        id={`confirm-modal-${this.props.posting.id}`}
                        message={`Wollen Sie die Anzeige mit dem Titel ${this.props.posting.title} wirklich löschen?`}
                        positiveAction={() => this.props.delete(this.props.posting.id)}
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

export default PostingListItem;
