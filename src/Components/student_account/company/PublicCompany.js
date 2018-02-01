import React, { Component } from 'react';
import backendService from '../../../backendService';
import draftToHtml from 'draftjs-to-html';
import Header from '../Header';
import translate from '../../../translationService';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class PublicCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: undefined,
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        backendService.getPublicCompanyById(this.props.match.params.id)
            .then(company => {
                this.setState({ company, loading: false });
                location.hash = queryString.stringify({ company: company.company_name.replace(/ /g, '_') });
            })
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className={'student-background'}>
                    <div className={'container mt-0 mt-sm-4 mb-0 mb-sm-4 p-5'} style={{ backgroundColor: 'white' }}>
                        {this.state.loading
                            ? <div className={'loader'}/>
                            : <div>
                                <div className={'row'}>
                                    <div className={'d-none d-sm-none d-md-block col-md-8 my-auto'}>
                                        <h2>{this.state.company.company_name.toUpperCase()}</h2>
                                    </div>
                                    <div className={'col-4'}>
                                        {this.state.company.logo &&
                                        <img src={this.state.company.logo} alt={'logo'} className={'img-responsive'}
                                             style={{ maxHeight: 100, maxWidth: 200 }}/>}
                                    </div>
                                    <div className={'d-block d-sm-block d-md-none col-sm-12 my-auto'}>
                                        <h2 style={{ fontSize: '120%' }}>
                                            {this.state.company.company_name.toUpperCase()}
                                        </h2>
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
                                                <Link to={this.state.company.website}>
                                                    {this.state.company.website.split('//')[1]}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={'row mb-2'}>
                                            <div className={'col-2 text-center'}>
                                                <span className={'fa fa-users'}/>
                                            </div>
                                            <div className={'col-9'}>
                                                {translate.numberOfEmployees(this.state.company.employees)} Mitarbeiter
                                            </div>
                                        </div>
                                        {this.state.company.field_of_activity &&
                                        <div className={'row mb-2'}>
                                            <div className={'col-2 text-center'}>
                                                <span className={'fa fa-search'}/>
                                            </div>
                                            <div className={'col-9'}>
                                                Haupttätigkeitsbereich: {this.state.company.field_of_activity}
                                            </div>
                                        </div>}
                                        {this.state.company.kununu &&
                                        <div className={'row mb-2'}>
                                            <div className={'col-2 text-center'}>
                                                <span className={'fa fa-star'}/>
                                            </div>
                                            <div className={'col-9'}>
                                                <Link to={this.state.company.kununu}>Bewertung auf kununu</Link>
                                            </div>
                                        </div>}
                                        {this.state.company.locations &&
                                        <div className={'row mb-2'}>
                                            <div className={'col-2 text-center'}>
                                                <span className={'fa fa-globe'}/>
                                            </div>
                                            <div className={'col-9'}>
                                                {this.state.company.locations}
                                            </div>
                                        </div>}
                                        <div className={'row mb-2'}>
                                            <div className={'col-2 text-center'}>
                                                <span className={'fa fa-map-marker'}/>
                                            </div>
                                            <div className={'col-9'}>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: this.state.company.munich_address.replace('\n', '<br>')
                                                }}
                                                />
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
                                        <p dangerouslySetInnerHTML={{
                                            __html: draftToHtml(JSON.parse(this.state.company.company_description))
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicCompany;
