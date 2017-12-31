import React, { Component } from 'react';
import companies from '../../../resources/companies.jpeg';
import recruiters from '../../../resources/recruiters.jpeg';
import jobs from '../../../resources/jobs.jpeg'
import Header from "./Header";
import backendService from "../../backendService";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        backendService.getProfile()
            .then(() => this.setState({ loggedIn: true }));
    }

    render() {
        return (
            <div>
                {this.state.loggedIn &&
                <div>
                    <Header history={this.props.history}/>

                    <div className={'headline'}>
                        <h1>Dashboard</h1>
                    </div>
                    <div className={"container"}>
                        <div className={"row"} style={{ cursor: 'pointer' }}>
                            <div className={"col-lg"} id={'picture-companies'}
                                 onClick={() => this.props.history.push('/companies')}>
                                <div className={"column-headline"}>
                                    <p>Unternehmen managen</p>
                                </div>
                                <img className={'dashboard-picture'} src={companies} alt={'blub'}/>
                                <div className={'dashboard-hover'} id={'hover-companies'}>
                                    <p>Legen Sie Ihre Tochterunternehmen an und erstellen Sie Stellenanzeigen für Ihre
                                        Tochterunternehmen.</p>
                                </div>
                            </div>
                            <div className={"col-lg"} id={'picture-recruiters'}
                                 onClick={() => this.props.history.push('/recruiters')}>
                                <div className={"column-headline"}>
                                    <p>Recruiter managen</p>
                                </div>
                                <img className={'dashboard-picture'} src={recruiters} alt={'blub'}/>
                                <div className={'dashboard-hover'} id={'hover-recruiters'}>
                                    <p>Legen Sie Recruiter-Profile an, fügen Sie diese Ihren Stellenanzeigen hinzu und
                                        verwalten Sie diese. </p>
                                </div>
                            </div>
                            <div className={"col-lg"} id={'picture-postings'}
                                 onClick={() => this.props.history.push('/postings')}>
                                <div className={"column-headline"}>
                                    <p>Stellenanzeigen managen</p>
                                </div>
                                <img className={'dashboard-picture'} src={jobs} alt={'blub'}/>
                                <div className={'dashboard-hover'} id={'hover-postings'}>
                                    <p>Legen Sie neue Stellenanzeigen an, fügen Sie diesen einem Unternehmen bzw.
                                        Recruiter
                                        hinzu und verwalten Sie diese.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default HomePage;
