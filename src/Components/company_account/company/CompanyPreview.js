import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import translate from '../../../translationService';

class CompanyPreview extends Component {

    render() {
        return (
            <div>
                {this.props.company &&
                <div>
                    <div className={'row'}>
                        <div className={'d-none d-sm-none d-md-block col-md-8 my-auto'}>
                            <h2>{this.props.company.company_name.toUpperCase()}</h2>
                        </div>
                        <div className={'col-4'}>
                            {this.props.company.logo &&
                            <img src={this.props.company.logo} alt={'logo'} className={'img-responsive'}
                                 style={{ maxHeight: 100, maxWidth: 200 }}/>
                            }
                        </div>
                        <div className={'d-block d-sm-block d-md-none col-sm-12 my-auto'}>
                            <h2 style={{ fontSize: '120%' }}>{this.props.company.company_name.toUpperCase()}</h2>
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
                        <div className={'col-sm-12 col-md-5 col-lg-4 order-1 order-sm-1 order-md-2'}>
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-info-circle'}/>
                                </div>
                                <div className={'col-10'}>
                                    <a href={this.props.company.website}>{this.props.company.website.split('//')[1]}</a>
                                </div>
                            </div>
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-users'}/>
                                </div>
                                <div className={'col-9'}>
                                    {translate.numberOfEmployees(this.props.company.employees)} Mitarbeiter
                                </div>
                            </div>
                            {this.props.company.field_of_activity &&
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-search'}/>
                                </div>
                                <div className={'col-9'}>
                                    Haupttätigkeitsbereich: {this.props.company.field_of_activity}
                                </div>
                            </div>
                            }
                            {this.props.company.kununu &&
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-star'}/>
                                </div>
                                <div className={'col-9'}>
                                    <a href={this.props.company.kununu}>Bewertung auf kununu</a>
                                </div>
                            </div>
                            }
                            {this.props.company.locations &&
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-globe'}/>
                                </div>
                                <div className={'col-9'}>
                                    {this.props.company.locations}
                                </div>
                            </div>
                            }
                            <div className={'row mb-2'}>
                                <div className={'col-2 text-center'}>
                                    <span className={'fa fa-map-marker'}/>
                                </div>
                                <div className={'col-9'}>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: this.props.company.munich_address.replace('\n', '<br>') }}/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div
                                    className={'col-12 d-block d-sm-block d-md-none d-lg-none d-xl-none my-5'}
                                    style={{
                                        height: 1,
                                        backgroundColor: '#9a9a9a'
                                    }}/>
                            </div>
                        </div>
                        <div className={'col-sm-12 col-md-7 col-lg-8 order-2 order-sm-2 order-md-1'}>
                            <p dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.props.company.company_description)) }}/>
                        </div>
                    </div>
                </div>
                }
                <div className='float-right'>
                    <button type={'button'} className={'btn btn-warning buttons-form'}
                            onClick={this.props.endPreview}>
                        Zurück
                    </button>
                    <button className={'btn btn-success buttons-form'}
                            onClick={this.props.primaryAction}>
                        {this.props.primaryActionText}
                    </button>
                </div>
            </div>
        );
    }
}

export default CompanyPreview;
