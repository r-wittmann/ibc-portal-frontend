import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';

class PostingPreview extends Component {

    render() {
        return (
            <div className={'container'}>
                {this.props.posting && (
                    <div>
                        <p>company_id: {this.props.posting.company_id}</p>
                        <p>recruiter_id: {this.props.posting.recruiter_id}</p>
                        <p>title: {this.props.posting.title}</p>
                        <p>start_of_employment: {this.props.posting.start_of_employment}</p>
                        <p>contract_type: {this.props.posting.contract_type}</p>
                        <p>contract_duration: {this.props.posting.contract_duration}</p>
                        <p>working_hours: {this.props.posting.working_hours}</p>
                        <p>entry_level: {this.props.posting.entry_level}</p>
                        <p>place_of_employment: {this.props.posting.place_of_employment}</p>
                        <p>application_link: {this.props.posting.application_link}</p>
                        <p>field_of_employment: {this.props.posting.field_of_employment}</p>
                        <p>pdf: {this.props.posting.pdf}</p>
                        <p>status: {this.props.posting.status}</p>
                        <p>description: <span
                            dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.posting.description)) }}/>
                        </p>
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-danger buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>
                    {this.props.primaryActionText === 'Speichern' ? (
                        <button className={'btn btn-success buttons-form'}
                                data-toggle={'modal'}
                                data-target={'#save-with-status'}>
                            Speichern
                        </button>
                    ) : (
                        <button className={'btn btn-primary buttons-form'}
                                onClick={this.props.primaryAction}>
                            {this.props.primaryActionText}
                        </button>
                    )}

                </div>
            </div>
        );
    }
}

export default PostingPreview;
