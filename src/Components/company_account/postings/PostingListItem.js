import React, { Component } from 'react';
import ConfirmModal from '../../commons/ConfirmModal';
import translate from '../../../translationService';
import { Link } from 'react-router-dom';

class PostingListItem extends Component {

    render() {
    	let today = new Date();
    	today.setDate(today.getDate() + 7);

    	let expiry = '';

    	if (this.props.posting.expiry_date){
	    	let expiry_date = this.props.posting.expiry_date;
	    	let ex = expiry_date.split("-");
	    	let exx= ex[2];
	    	let ex2 = exx.split("T");
	    	let year = ex[0];
	    	let month = ex[1];
	    	let day = ex2[0];

	    	expiry = new Date(year + '-' + month + '-' + day);

	    }

        return (
				<tr className={this.props.posting.status === 'deactivated' ? 'row_deactivated' : expiry < today  ? 'row_expiry' : null}>
	                <td>
	                    <Link to={`/company/postings/${this.props.posting.id}`}>
	                        {this.props.posting.title}
	                    </Link>
	                </td>
	                <td>{this.props.posting.expiry_date
	                    ? new Date(this.props.posting.expiry_date).toLocaleDateString('de-DE')
	                    : '-'}</td>
	                <td>{this.props.posting.contract_type}</td>
	                <td>
	                    <Link to={'/company/companies/' + this.props.posting.company_id + '/preview'}>
	                        {this.props.posting.company_name}
	                    </Link>
	                </td>
	                <td>
	                    <Link to={'/company/recruiters/' + this.props.posting.recruiter_id + '/preview'}>
	                        {this.props.posting.recruiter_name}
	                    </Link>
	                </td>
	                <td>{translate.postingStatus(this.props.posting.status)}</td>
	                <td>
	                    <div className={'btn-group'}>
	                        <button className={'btn btn-outline-dark'} data-toggle={'tooltip'} data-placement={'top'}
	                                title={'Vorschau'}
	                                onClick={() => this.props.history.push(`/company/postings/${this.props.posting.id}/preview`)}>
	                            <span className={'fa fa-eye'}/>
	                        </button>
	                        <button className={'btn btn-outline-dark'} data-toggle={'tooltip'} data-placement={'top'}
	                                title={'Bearbeiten'}
	                                onClick={() => this.props.history.push(`/company/postings/${this.props.posting.id}`)}>
	                            <span className={'fa fa-pencil-alt'}/>
	                        </button>
	                        <button className={'btn btn-outline-dark'}
	                                data-toggle={'tooltip'} data-toggle='modal' // eslint-disable-line react/jsx-no-duplicate-props
	                                data-placement={'top'}
	                                title={'Löschen'}
	                                data-target={`#confirm-modal-${this.props.posting.id}`}>
	                            <span className={'fa fa-trash'}/>
	                        </button>
	                        <button className={'btn btn-outline-dark'} data-toggle={'tooltip'} data-placement={'top'}
	                                title={'Aktivieren/Deaktivieren'}
	                                onClick={() => this.props.save(this.props.posting.id,
	                                    this.props.posting.status === 'active' ? 'deactivated' : 'active')}>
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
