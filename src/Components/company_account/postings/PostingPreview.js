import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import backendService from "../../../backendService";
import translate from "../../../translationService";

class PostingPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
            recruiter: undefined
        };
    }

    componentDidMount() {
        backendService.getCompanyById(this.props.posting.company_id).then(company => this.setState({ company }));
        backendService.getRecruiterById(this.props.posting.recruiter_id).then(recruiter => this.setState({ recruiter }));
    }

    componentWillReceiveProps(nextProps) {
        backendService.getCompanyById(nextProps.posting.company_id).then(company => this.setState({ company }));
        backendService.getRecruiterById(nextProps.posting.recruiter_id).then(recruiter => this.setState({ recruiter }));
    }

    render() {
        return (
            <div>
                <div className={'headline'}>
                    <h1>Vorschau</h1>
                </div>
                {this.props.posting && this.state.company && this.state.recruiter && (

                    <div>
                        <div className={'table-responsive'}>
                        <table className={'table table-borderless'}>
                                    <tbody>
                                        <tr>
                                            <td>
                                            <div className={'preview-headline'}><h2>{this.props.posting.title.toUpperCase()}</h2></div>
                                            </td>
                                            <td>
                                            <div className={'preview-logo'}>{this.state.company.logo &&
                                            <img src={this.state.company.logo} alt={'logo'}/>}</div>
                                            </td>
                                     </tr>
                                    </tbody>
                        </table>
                        </div>
                        <div className={'table-responsive'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-home'}/> {this.state.company.company_name}</td>
                                    <td><span className={'fa fa-map-marker'}/> <span
                                        dangerouslySetInnerHTML={{ __html: this.state.company.munich_address.replace('\n', '<br>') }}/>
                                    </td>
                                    <td><span className={'fa fa-calendar'}/>&nbsp;
                                        {this.props.posting.start_of_employment !== 'Ab Sofort' && this.props.posting.start_of_employment !== 'Nach Vereinbarung'
                                            ? 'Ab ' + new Date(this.props.posting.start_of_employment).toLocaleDateString('de-DE')
                                            : this.props.posting.start_of_employment
                                        }
                                    </td>
                                    <td><span className={'fa fa-desktop'}/> {translate.fieldOfEmployment(this.props.posting.field_of_employment)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {this.props.posting.pdf
                            ? <div style={{ width: '100%', textAlign: 'center' }}>
                                <embed style={{ width: '100%', maxWidth: 820, height: 1024}} src={this.props.posting.description} type={'application/pdf'}/>
                            </div>
                            : <p><span
                                dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.posting.description)) }}/>
                            </p>
                        }
                        <div className={'table-responsive'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td className={'logo-table'}>
                                        <div className={'recruiter-logo'}>{this.state.recruiter.photo &&
                                        <img src={this.state.recruiter.photo} alt={'recruiter'}/>}</div>
                                    </td>
                                    <td>
                                        <p><b>{this.state.recruiter.recruiter_name}</b></p>
                                        <div className={'recruiter-info'}>
                                        { this.state.recruiter.location ?
                                            <p>{this.state.recruiter.position}, {this.state.recruiter.location}</p> : <p>{this.state.recruiter.position}</p>
                                        }
                                        { this.state.recruiter.recruiter_email ?
                                            <p>E-Mail: {this.state.recruiter.recruiter_email}</p> : <p></p>
                                        }
                                        { this.state.recruiter.phone ?
                                            <p>Festnetz: {this.state.recruiter.phone}</p> : <p></p>
                                        }
                                        { this.state.recruiter.mobile ?
                                            <p>Mobil: {this.state.recruiter.mobile}</p> : <p></p>
                                        }
                                        { this.state.recruiter.xing ? 
                                            <p>Xing: {this.state.recruiter.xing}</p> : <p></p>
                                        }
                                        { this.state.recruiter.linked_in ? 
                                            <p>LinkedIn: {this.state.recruiter.linked_in}</p> : <p></p>
                                        }
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'table-responsive'} style={{marginTop: -15}}>
                            <table className={'table table-borderless preview-table-posting'}>
                                <tbody>
                                <tr>
                                    <td><span
                                        className={'fa fa-arrow-right'}/> {translate.contractDuration(this.props.posting.contract_duration)}
                                    </td>
                                    <td><span className={'fa fa-clock'}/> {this.props.posting.working_hours}</td>
                                    <td><span className={'fa fa-edit'}/> {translate.contractType(this.props.posting.contract_type)}</td>
                                    <td><span className={'fa fa-user'}/> {translate.entryLevel(this.props.posting.entry_level)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className='float-right'>
                    <button type={'button'} className={'btn btn-warning buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>

                    <button type={'button'} className={'btn btn-success buttons-form'}
                            onClick={this.props.primaryAction}>
                        {this.props.primaryActionText}
                    </button>
                </div>
            </div>
        );
    }
}

export default PostingPreview;
