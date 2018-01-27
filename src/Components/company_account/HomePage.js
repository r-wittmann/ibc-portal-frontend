import React, { Component } from 'react';
import companies from '../../../resources/companies.jpeg';
import recruiters from '../../../resources/recruiters.jpeg';
import jobs from '../../../resources/jobs.jpeg'
import Header from './Header';
import backendService from '../../backendService';
import { Link } from 'react-router-dom';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postings: undefined
        };
    }

    componentDidMount() {
        backendService.getPostings('#status=active')
            .then((postings) => this.setState({ postings }));
    }

    render() {
        return (
            <div>
                {!this.state.postings
                    ? <div className={'loader'}/>
                    : <div>
                        <Header history={this.props.history}/>

                        <div className={'headline'}>
                            <h1>Ihr persönlicher Bereich</h1>
                        </div>
                        <div className={'container'}>
                            <div className={'row'} style={{ cursor: 'pointer' }}>
                                <div className={'col-lg'} id={'picture-companies'}
                                     onClick={() => this.props.history.push('/company/companies')}>
                                    <div className={'column-headline'}>
                                        <p>Unternehmen managen</p>
                                    </div>
                                    <img className={'dashboard-picture'} src={companies} alt={'blub'}/>
                                    <div className={'dashboard-hover'} id={'hover-companies'}>
                                        <p>Legen Sie Ihre Tochterunternehmen an und erstellen Sie Stellenanzeigen für
                                            Ihre Tochterunternehmen.
                                        </p>
                                    </div>
                                </div>
                                <div className={'col-lg'} id={'picture-recruiters'}
                                     onClick={() => this.props.history.push('/company/recruiters')}>
                                    <div className={'column-headline'}>
                                        <p>Recruiter managen</p>
                                    </div>
                                    <img className={'dashboard-picture'} src={recruiters} alt={'blub'}/>
                                    <div className={'dashboard-hover'} id={'hover-recruiters'}>
                                        <p>Legen Sie Recruiter-Profile an, fügen Sie diese Ihren Stellenanzeigen hinzu
                                            und verwalten Sie diese.
                                        </p>
                                    </div>
                                </div>
                                <div className={'col-lg'} id={'picture-postings'}
                                     onClick={() => this.props.history.push('/company/postings')}>
                                    <div className={'column-headline'}>
                                        <p>Stellenanzeigen managen</p>
                                    </div>
                                    <img className={'dashboard-picture'} src={jobs} alt={'blub'}/>
                                    <div className={'dashboard-hover'} id={'hover-postings'}>
                                        <p>Legen Sie neue Stellenanzeigen an, fügen Sie diesen einem Unternehmen bzw.
                                            Recruiter hinzu und verwalten Sie diese.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className={'text-center mt-5 mb-4 align-baseline'}>
                                    Aktiv sind gerade <span className={'badge badge-primary mb-1'}>
                                    {this.state.postings.length}
                                    </span> Stellenanzeigen
                                </h4>
                                <table className={'table table-hover'}>
                                    <thead>
                                    <tr>
                                        <th>Titel</th>
                                        <th>Unternehmen</th>
                                        <th>Recruiter</th>
                                        <th>Gültig bis</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.postings.map(posting =>
                                        <tr key={posting.id}>
                                            <td><Link to={'/company/postings/' + posting.id}>
                                                {posting.title}
                                            </Link></td>
                                            <td><Link to={'/company/companies/' + posting.company_id}>
                                                {posting.company_name}
                                            </Link></td>
                                            <td><Link to={'/company/recruiters/' + posting.recruiter_id}>
                                                {posting.recruiter_name}
                                            </Link></td>
                                            <td>
                                                {new Date(posting.expiry_date).toLocaleDateString('de-DE')}
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default HomePage;
