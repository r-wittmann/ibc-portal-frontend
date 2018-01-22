import React, { Component } from 'react';
import backendService from '../../../backendService';
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
import Header from "../Header";
import translate from "../../../translationService";

class PublicPosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posting: undefined,
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        backendService.getPublicPostingById(this.props.match.params.id)
            .then(posting => this.setState({ posting, loading: false }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        :
                        <div>
                            <div className='float-right'>
                                <br/>
                                <a className={'btn btn-primary buttons-form'}
                                   href={this.state.posting.application_link} target={'_blank'}>
                                    Bewerben
                                </a>
                            </div>

                            <div className={'table-responsive'}>
                                <table className={'table table-borderless'}>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className={'preview-headline'}>
                                                <h2>{this.state.posting.title.toUpperCase()}</h2></div>
                                        </td>
                                        <td>
                                            <div className={'preview-logo'}>{this.state.posting.logo &&
                                            <img src={this.state.posting.logo} alt={'logo'}/>}</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={'table-responsive'}>
                                <table className={'table table-borderless preview-table'}>
                                    <tbody>
                                    <tr>
                                        <td><span className={'fa fa-home'}/>
                                            <Link to={'/companies/' + this.state.posting.company_id}>
                                                &nbsp;{this.state.posting.company_name}
                                            </Link>
                                        </td>
                                        <td><span className={'fa fa-map-marker'}/> <span
                                            dangerouslySetInnerHTML={{ __html: this.state.posting.munich_address.replace('\n', '<br>') }}/>
                                        </td>
                                        <td><span
                                            className={'fa fa-calendar'}/> {this.state.posting.start_of_employment}</td>
                                        <td><span className={'fa fa-desktop'}/> {this.state.posting.field_of_activity}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            {this.state.posting.pdf
                                ? <div style={{ width: '100%', textAlign: 'center' }}>
                                    <embed style={{ width: '100%', maxWidth: 820, height: 1024 }}
                                           src={this.state.posting.description} type={'application/pdf'}/>
                                </div>
                                : <p><span
                                    dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.state.posting.description)) }}/>
                                </p>
                            }

                            <div className={'table-responsive'}>
                                <table className={'table table-borderless preview-table'}>
                                    <tbody>
                                    <tr>
                                        <td className={'logo-table'}>
                                            <div className={'recruiter-logo'}>{this.state.posting.photo &&
                                            <img src={this.state.posting.photo} alt={'recruiter'}/>}</div>
                                        </td>
                                        <td>
                                            <p><b>{this.state.posting.recruiter_name}</b></p>
                                            <div className={'recruiter-info'}>
                                                {this.state.posting.location ?
                                                    <p>{this.state.posting.position}, {this.state.posting.location}</p> :
                                                    <p>{this.state.posting.position}</p>
                                                }
                                                {this.state.posting.recruiter_email ?
                                                    <p>E-Mail: {this.state.posting.recruiter_email}</p> : <p></p>
                                                }
                                                {this.state.posting.phone ?
                                                    <p>Festnetz: {this.state.posting.phone}</p> : <p></p>
                                                }
                                                {this.state.posting.mobile ?
                                                    <p>Mobil: {this.state.posting.mobile}</p> : <p></p>
                                                }
                                                {this.state.posting.xing ?
                                                    <p>Xing: {this.state.posting.xing}</p> : <p></p>
                                                }
                                                {this.state.posting.linked_in ?
                                                    <p>LinkedIn: {this.state.posting.linked_in}</p> : <p></p>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={'table-responsive'} style={{ marginTop: -15 }}>
                                <table className={'table table-borderless preview-table-posting'}>
                                    <tbody>
                                    <tr>
                                        <td><span
                                            className={'fa fa-arrow-right'}/> {translate.contractDuration(this.state.posting.contract_duration)}
                                        </td>
                                        <td><span className={'fa fa-clock'}/> {this.state.posting.working_hours}</td>
                                        <td><span
                                            className={'fa fa-edit'}/> {translate.contractType(this.state.posting.contract_type)}
                                        </td>
                                        <td><span
                                            className={'fa fa-user'}/> {translate.entryLevel(this.state.posting.entry_level)}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='float-right'>
                                <button className={'btn btn-primary buttons-form'}
                                        onClick={() => this.props.history.goBack()}>
                                    Zurück
                                </button>
                                <a className={'btn btn-primary buttons-form'}
                                   href={this.state.posting.application_link} target={'_blank'}>
                                    Bewerben
                                </a>
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default PublicPosting;
