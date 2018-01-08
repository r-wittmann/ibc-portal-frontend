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

    getDurationString(key) {
        let value = '';
        switch (key) {
            case 'to3':
                value = 'Befristet, bis zu 3 Monate';
                break;
            case '3to6':
                value = 'Befristet, 3 bis 6 Monate';
                break;
            case '6':
                value = 'Befristet, 6 Monate';
                break;
            case '12':
                value = 'Befristet, 12 Monate';
                break;
            case 'indefinite':
                value = 'Unbefristet';
                break;
            default:
                value = 'Ohne Vertragslaufzeit';
                break;
        }
        return value;
    }

    componentDidMount() {
        if (this.props.posting) {
            backendService.getCompanyById(this.props.posting.company_id).then(company => this.setState({ company }));
            backendService.getRecruiterById(this.props.posting.recruiter_id).then(recruiter => this.setState({ recruiter }));
        }
    }

    componentWillReceiveProps(nextProps) {
        backendService.getCompanyById(nextProps.posting.company_id).then(company => this.setState({ company }));
        backendService.getRecruiterById(nextProps.posting.recruiter_id).then(recruiter => this.setState({ recruiter }));
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'headline'}>
                    <h1>Vorschau</h1>
                </div>
                {this.props.posting && this.state.company && this.state.recruiter && (

                    <div>
                        <div className={'preview-headline'}><h2>{this.props.posting.title.toUpperCase()}</h2></div>
                        <div className={'preview-logo'}>{this.state.company.logo &&
                        <img src={this.state.company.logo} alt={'logo'}/>}</div>
                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-home'}/> {this.state.company.company_name}</td>
                                    <td><span className={'fa fa-map-marker'}/> <span
                                        dangerouslySetInnerHTML={{ __html: this.state.company.munich_address.replace('\n', '<br>') }}/>
                                    </td>
                                    <td><span className={'fa fa-calendar'}/> {this.props.posting.start_of_employment}
                                    </td>
                                    <td><span className={'fa fa-desktop'}/> {this.state.company.field_of_activity}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <p><span
                            dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.posting.description)) }}/>
                        </p>
                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table'}>
                                <tbody>
                                <tr>
                                    <td className={'logo-table'}>
                                        <div className={'recruiter-logo'}>{this.state.recruiter.photo &&
                                        <img src={this.state.recruiter.photo} alt={'recruiter'}/>}</div>
                                    </td>
                                    <td>
                                        <p><b>{this.state.recruiter.recruiter_name}</b></p>
                                        <p>{this.state.recruiter.position}, {this.state.recruiter.location}</p>
                                        <p>Festnetz: {this.state.recruiter.phone}</p>
                                        <p>Mobil: {this.state.recruiter.mobile}</p>
                                        <p>Xing: {this.state.recruiter.xing}</p>
                                        <p>LinkedIn: {this.state.recruiter.linked_in}</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'attributes'}>
                            <table className={'table table-borderless preview-table-posting'}>
                                <tbody>
                                <tr>
                                    <td><span className={'fa fa-arrow-right'}/> {this.getDurationString(this.props.posting.contract_duration)}
                                    </td>
                                    <td><span className={'fa fa-clock'}/> {this.props.posting.working_hours}</td>
                                    <td><span className={'fa fa-edit'}/> {this.props.posting.contract_type}</td>
                                    <td><span className={'fa fa-info-circle'}/> {this.props.posting.entry_level}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className='float-right'>
                    <button className={'btn btn-warning buttons-form'}
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
                        <button className={'btn btn-success buttons-form'}
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
