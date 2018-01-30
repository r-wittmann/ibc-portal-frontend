import React, { Component } from 'react';
import backendService from '../../../backendService';
import draftToHtml from 'draftjs-to-html';
import Header from '../Header';
import translate from '../../../translationService';
import { Link } from 'react-router-dom';

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
                <div className={'student-background'}>
                    {this.state.loading
                        ? <div className={'loader mt-5'}/>
                        : <div className={'container mt-0 mt-sm-4 mb-0 mb-sm-4 p-5'}
                               style={{ backgroundColor: 'white' }}>
                            <div>
                                <div className={'row'}>
                                    <div className={'d-none d-sm-none d-md-block col-md-8 my-auto'}>
                                        <h2>{this.state.posting.title.toUpperCase()}</h2>
                                    </div>
                                    <div className={'col-4'}>
                                        {this.state.posting.logo &&
                                        <Link className={'navbar-brand'}
                                              to={'/companies/' + this.state.posting.company_id}>
                                            <img src={this.state.posting.logo} alt={'logo'} className={'img-responsive'}
                                                 style={{ maxHeight: 100, maxWidth: 200 }}/>
                                        </Link>}
                                    </div>
                                    <div className={'d-block d-sm-block d-md-none col-sm-12 my-auto'}>
                                        <h2 style={{ fontSize: '120%' }}>
                                            {this.state.posting.title.toUpperCase()}
                                        </h2>
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
                                              to={this.state.posting.application_link} target={'_blank'}>
                                            Bewerben
                                        </Link>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-home'}/>
                                        </div>
                                        <div className={'col-10'}>
                                            <Link to={'/companies/' + this.state.posting.company_id}>
                                                {this.state.posting.company_name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-desktop'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            {translate.fieldOfEmployment(this.state.posting.field_of_employment)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-calendar'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            {translate.startOfEmployment(this.state.posting.start_of_employment)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-arrow-right'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            {translate.contractDuration(this.state.posting.contract_duration)}
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
                                        {this.state.posting.pdf
                                            ? <div style={{ width: '100%', textAlign: 'center' }}>
                                                <embed style={{ width: '100%', maxWidth: 820, height: 1024 }}
                                                       src={this.state.posting.description} type={'application/pdf'}/>
                                            </div>
                                            : <span dangerouslySetInnerHTML={{
                                                __html: draftToHtml(JSON.parse(this.state.posting.description))
                                            }}
                                            />
                                        }
                                    </div>
                                    <div className={'col-md-5 col-lg-4 d-none d-sm-none d-md-block row'}>
                                        <div className={'col-10 offset-1'}>
                                            <Link className={'btn btn-block btn-primary'} style={{ marginBottom: 20 }}
                                                  to={this.state.posting.application_link} target={'_blank'}>
                                                Bewerben
                                            </Link>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-home'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                <Link to={'/companies/' + this.state.posting.company_id}>
                                                    {this.state.posting.company_name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-map-marker'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: this.state.posting.munich_address.replace('\n', '<br>')
                                                }}
                                                />
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-calendar'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {translate.startOfEmployment(this.state.posting.start_of_employment)}
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-desktop'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {translate.fieldOfEmployment(this.state.posting.field_of_employment)}
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-arrow-right'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {translate.contractDuration(this.state.posting.contract_duration)}
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-clock'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {this.state.posting.working_hours}
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-edit'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {translate.contractType(this.state.posting.contract_type)}
                                            </div>
                                        </div>
                                        <div className={'row mb-2 ml-2'}>
                                            <div className={'col-md-2 col-lg-2 col-xl-2 text-center'}>
                                                <span className={'fa fa-user'}/>
                                            </div>
                                            <div className={'col-md-10 col-lg-10 col-xl-10'}>
                                                {translate.entryLevel(this.state.posting.entry_level)}
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
                                            {this.state.posting.working_hours}
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-edit'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            {translate.contractType(this.state.posting.contract_type)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-user'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            {translate.entryLevel(this.state.posting.entry_level)}
                                        </div>
                                    </div>
                                    <div className={'row mb-2'}>
                                        <div className={'col-2 text-center'}>
                                            <span className={'fa fa-map-marker'}/>
                                        </div>
                                        <div className={'col-9'}>
                                            <span dangerouslySetInnerHTML={{
                                                __html: this.state.posting.munich_address.replace('\n', '<br>')
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <div className={'col-8 offset-2 mt-4'}>
                                        <Link className={'btn btn-block btn-primary'} style={{ marginBottom: 20 }}
                                              to={this.state.posting.application_link} target={'_blank'}>
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
                                        {this.state.posting.photo &&
                                        <img src={this.state.posting.photo} className={'rounded-circle img-fluid'}
                                             alt={'recruiter'}/>}
                                    </div>
                                    <div className={'col-8 col-sm-8 col-md-9 offset-2 offset-sm-0'}>
                                        <p><b>{this.state.posting.recruiter_name}</b></p>
                                        {this.state.posting.position}{this.state.posting.location && ', ' + this.state.posting.location}<br/>

                                        {this.state.posting.recruiter_email &&
                                        <span>{this.state.posting.recruiter_email}<br/></span>}
                                        {this.state.posting.phone && <span>Tel: {this.state.posting.phone}<br/></span>}
                                        {this.state.posting.mobile &&
                                        <span>Mobil: {this.state.posting.mobile}<br/></span>}
                                        <div className={'mt-2'}>
                                            {this.state.posting.xing &&
                                            <Link to={this.state.posting.xing} target={'_blank'}>
                                                <span className={'fab fa-xing-square mx-2'}
                                                      style={{ fontSize: '150%', color: '#007575' }}/>
                                            </Link>}
                                            {this.state.posting.linked_in &&
                                            <Link to={this.state.posting.linked_in} target={'_blank'}>
                                                <span className={'fab fa-linkedin mx-2'}
                                                      style={{ fontSize: '150%', color: '#0084bf' }}/>
                                            </Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default PublicPosting;
