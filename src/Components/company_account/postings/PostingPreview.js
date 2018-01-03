import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import backendService from "../../../backendService";

class PostingPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
            recruiter: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        backendService.getCompanyById(nextProps.posting.company_id).then(company => this.setState({ company }));
        backendService.getRecruiterById(nextProps.posting.recruiter_id).then(recruiter => this.setState({ recruiter }));
    }

    render() {
        return (
            <div className={'container'}>
                {this.props.posting && (
                    <div>
                        <p>Company:</p>
                        {this.state.company &&
                        <div>
                            <p>Company Name: {this.state.company.company_name}</p>
                            <p>Contact Name: {this.state.company.contact_name}</p>
                            <p>Contact Email: {this.state.company.contact_email}</p>
                            <p>Contact Phone: {this.state.company.contact_phone}</p>
                            <p>Munich Address:
                                <span
                                    dangerouslySetInnerHTML={{ __html: this.state.company.munich_address.replace('\n', '<br>') }}/>
                            </p>
                            <p>Locations: {this.state.company.locations}</p>
                            <p>Employees: {this.state.company.employees}</p>
                            <p>Website: {this.state.company.website}</p>
                            <p>kununu: {this.state.company.kununu}</p>
                            <p>Field of Activity: {this.state.company.field_of_activity}</p>

                        </div>
                        }
                        <p>Recruiter:</p>
                        {this.state.recruiter &&
                        <div>
                            <p>Recruiter Name: {this.state.recruiter.recruiter_name}</p>
                            <p>Recruiter Email: {this.state.recruiter.recruiter_email}</p>
                            <p>Recruiter Phone: {this.state.recruiter.phone}</p>
                            <p>Recruiter Mobile: {this.state.recruiter.mobile}</p>
                            <p>Recruiter Position: {this.state.recruiter.position}</p>
                            <p>Recruiter Location: {this.state.recruiter.location}</p>
                            <p>Recruiter Xing: {this.state.recruiter.xing}</p>
                            <p>Recruiter LinkedIn: {this.state.recruiter.linked_in}</p>
                            {this.state.recruiter.photo && <p><img src={this.state.recruiter.photo} alt={'recruiter'}/></p>}
                        </div>
                        }
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
