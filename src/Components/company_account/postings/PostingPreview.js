import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import backendService from '../../../backendService';
import translate from '../../../translationService';
import { Link } from 'react-router-dom';

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
        console.log(this.state.company);
        return (
            <div>

                {!this.props.posting || !this.state.company || !this.state.recruiter
                    ? <div className={'loader'}/>
                    : <div>

                        <h1>Listenansicht</h1>

                        <div className={'col-12 col-sm-10 col-md-6 col-lg-4 offset-0 offset-sm-1 offset-md-0'}>
                            <div className={'card text-center'} style={{ height: 320, marginBottom: 15 }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 128
                                }}>
                                    {this.state.company.logo &&
                                    <Link to={'/companies/' + this.props.posting.company_id}>
                                        <img src={this.state.company.logo}
                                             style={{ maxWidth: 200, maxHeight: 100 }}
                                             alt={'Card cap'}/>
                                    </Link>
                                    }
                                </div>
                                <div className={'card-body'}
                                     style={{
                                         display: 'flex',
                                         flexDirection: 'column',
                                         justifyContent: 'space-around'
                                     }}>
                                    <h5 className={'card-title'}>
                                        <Link to={`/postings/${this.props.posting.id}`}>
                                            {this.props.posting.title}
                                        </Link>
                                    </h5>
                                    <h6 className={'card-subtitle mb-2 text-muted'}><span
                                        className={'fa fa-map-marker'}/> {this.props.posting.place_of_employment} &nbsp;
                                        <span
                                            className={'fa fa-calendar-alt'}/> {translate.startOfEmployment(this.props.posting.start_of_employment)}
                                    </h6>
                                    <p className={'card-text'}>
                                        <Link to={`/postings/${this.props.posting.id}`} className={'btn btn-primary'}>Mehr
                                            Details</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h1>Detailansicht</h1>


                        <div className={'container mt-0 mt-sm-4 mb-0 mb-sm-4 p-5'} style={{ backgroundColor: 'white' }}>
                            <div className={'row'}>
                                <div className={'d-none d-sm-none d-md-block col-md-8 my-auto'}>
                                    <h2>{this.props.posting.title.toUpperCase()}</h2>
                                </div>
                                <div className={'col-4'}>
                                    {this.state.company.logo &&
                                    <Link className={'navbar-brand'}
                                          to={'/companies/' + this.state.company.id}>
                                        <img src={this.state.company.logo} alt={'logo'} className={'img-responsive'}
                                             style={{ maxHeight: 100, maxWidth: 200 }}/>
                                    </Link>}
                                </div>
                                <div className={'d-block d-sm-block d-md-none col-sm-12 my-auto'}>
                                    <h2 style={{ fontSize: '120%' }}>{this.props.posting.title.toUpperCase()}</h2>
                                </div>
                            </div>
                            <div className={'row d-sm-block d-md-none'}>
                                <div className={'col-12 my-5'}
                                     style={{
                                         height: 1,
                                         backgroundColor: '#9a9a9a'
                                     }}/>
                            </div>
                            <div className={'d-sm-block d-md-none'}>
                                <div className={'col-8 offset-2 mb-4'}>
                                    <Link className={'btn btn-block btn-primary'} style={{ marginBottom: 20 }}
                                          to={this.props.posting.application_link} target={'_blank'}>
                                        Bewerben
                                    </Link>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-home'}/>
                                    </div>
                                    <div className={'col-10'}>
                                        <Link to={'/companies/' + this.state.company.id}>
                                            {this.state.company.company_name}
                                        </Link>
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-desktop'}/>
                                    </div>
                                    <div className={'col-9'}>
                                        {translate.fieldOfEmployment(this.props.posting.field_of_employment)}
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-calendar'}/>
                                    </div>
                                    <div className={'col-9'}>
                                        {translate.startOfEmployment(this.props.posting.start_of_employment)}
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-arrow-right'}/>
                                    </div>
                                    <div className={'col-9'}>
                                        {translate.contractDuration(this.props.posting.contract_duration)}
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-12 my-5'}
                                     style={{
                                         height: 1,
                                         backgroundColor: '#9a9a9a'
                                     }}/>
                            </div>
                            <div className={'row'}>
                                <div className={'col-sm-12 col-md-7 col-lg-8'}>
                                    {this.props.posting.pdf
                                        ? <div style={{ width: '100%', textAlign: 'center' }}>
                                            <embed style={{ width: '100%', maxWidth: 820, height: 1024 }}
                                                   src={this.props.posting.description} type={'application/pdf'}/>
                                        </div>
                                        : <span
                                            dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.posting.description)) }}/>
                                    }
                                </div>
                                <div className={'col-md-5 col-lg-4 d-none d-sm-none d-md-block row'}>
                                    <div className={'col-10 offset-1'}>
                                        <Link className={'btn btn-block btn-primary'} style={{ marginBottom: 20 }}
                                              to={this.props.posting.application_link} target={'_blank'}>
                                            Bewerben
                                        </Link>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-home'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            <Link to={'/companies/' + this.state.company.id}>
                                                {this.state.company.company_name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-map-marker'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                <span
                                                    dangerouslySetInnerHTML={{ __html: this.state.company.munich_address.replace('\n', '<br>') }}/>
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-calendar'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {translate.startOfEmployment(this.props.posting.start_of_employment)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-desktop'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {translate.fieldOfEmployment(this.props.posting.field_of_employment)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-arrow-right'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {translate.contractDuration(this.props.posting.contract_duration)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-clock'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {this.props.posting.working_hours}
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-edit'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {translate.contractType(this.props.posting.contract_type)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2 ml-2'}>
                                        <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                            <span className={'fa fa-user'}/>
                                        </div>
                                        <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                            {translate.entryLevel(this.props.posting.entry_level)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row d-sm-block d-md-none'}>
                                <div className={'col-12 my-5'}
                                     style={{
                                         height: 1,
                                         backgroundColor: '#9a9a9a'
                                     }}/>
                            </div>
                            <div className={'d-sm-block d-md-none'}>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-clock'}/>
                                    </div>
                                    <div className={'col-10'}>
                                        {this.props.posting.working_hours}
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-edit'}/>
                                    </div>
                                    <div className={'col-9'}>
                                        {translate.contractType(this.props.posting.contract_type)}
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-user'}/>
                                    </div>
                                    <div className={'col-9'}>
                                        {translate.entryLevel(this.props.posting.entry_level)}
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-2 text-center'}>
                                        <span className={'fa fa-map-marker'}/>
                                    </div>
                                    <div className={'col-9'}>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: this.state.company.munich_address.replace('\n', '<br>') }}/>
                                    </div>
                                </div>
                                <div className={'col-8 offset-2 mt-4'}>
                                    <Link className={'btn btn-block btn-primary'} style={{ marginBottom: 20 }}
                                          to={this.props.posting.application_link} target={'_blank'}>
                                        Bewerben
                                    </Link>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-12 my-5'}
                                     style={{
                                         height: 1,
                                         backgroundColor: '#9a9a9a',
                                     }}/>
                            </div>
                            <div className={'row'}>
                                <div className={'col-4 col-sm-4 col-md-3 offset-4 offset-sm-0 mb-3'}>
                                    {this.state.recruiter.photo &&
                                    <img src={this.state.recruiter.photo} className={'rounded-circle img-fluid'}
                                         alt={'recruiter'}/>
                                    }
                                </div>
                                <div className={'col-8 col-sm-8 col-md-9 offset-2 offset-sm-0'}>
                                    <p><b>{this.state.recruiter.recruiter_name}</b></p>
                                    {this.state.recruiter.position}{this.state.recruiter.location && ', ' + this.state.recruiter.location}<br/>

                                    {this.state.recruiter.recruiter_email &&
                                    <span>{this.state.recruiter.recruiter_email}<br/></span>}
                                    {this.state.recruiter.phone &&
                                    <span>Tel: {this.state.recruiter.phone}<br/></span>}
                                    {this.state.recruiter.mobile &&
                                    <span>Mobil: {this.state.recruiter.mobile}<br/></span>}
                                    <div className={'mt-2'}>
                                        {this.state.recruiter.xing &&
                                        <Link to={this.state.recruiter.xing} target={'_blank'}>
                                            <span className={'fab fa-xing-square mx-2'}
                                                  style={{ fontSize: '150%', color: '#007575' }}/>
                                        </Link>}
                                        {this.state.recruiter.linked_in &&
                                        <Link to={this.state.recruiter.linked_in} target={'_blank'}>
                                            <span className={'fab fa-linkedin mx-2'}
                                                  style={{ fontSize: '150%', color: '#0084bf' }}/>
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='float-right'>
                            <button type={'button'} className={'btn btn-secondary buttons-form'}
                                    onClick={this.props.endPreview}>
                                Zurück
                            </button>

                            <button type={'button'} className={'btn btn-primary buttons-form'}
                                    onClick={this.props.primaryAction}>
                                {this.props.primaryActionText}
                            </button>
                        </div>

                    </div>
                }

            </div>
        );
    }
}

export default PostingPreview;
