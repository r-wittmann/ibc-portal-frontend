import React, { Component } from 'react';
import backendService from '../../backendService';
import image from '../../../resources/ibc_logo.png';
import companies from '../../../resources/companies.jpeg';
import recruiters from '../../../resources/recruiters.jpeg';
import jobs from '../../../resources/jobs.jpeg'

class HomePage extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        backendService.logout();
        this.props.history.push('/login');
    };


    render() {
        return (
            <div>
             <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
                  <a className={'navbar-brand'} href="#"><img className={'logo'} src={image} alt={'blub'}/></a>
                  <button className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={'navbar-toggler-icon'}></span>
                  </button>
                  <div className={'collapse navbar-collapse'} id="navbarNav">
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                      <li className={'nav-item active'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/')}>Home</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/companies')}>Ihr Unternehmen</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/recruiters')}>Ihre Recruiter</a>
                      </li>
                      <li className={'nav-item'}>
                        <a className={'nav-link'} onClick={() => this.props.history.push('/postings')}>Ihre Stellenanzeigen</a>
                      </li>
                    </ul>

                    <ul className={'navbar-nav my-2 my-lg-0'}>
                        <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={() => this.props.history.push('/profile')}>Ihr Profil</a>
                        </li>
                      <li className={'nav-item'}>
                            <a className={'nav-link'} onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>

                  </div>
                </nav>
                <div className={'headline'}>
                    <h1>Dashboard</h1>
                </div>
                <div className={"container"}>
                    <div className={"row"} style={{cursor:'pointer'}}>
                        <div className={"col-lg"} id={'picture-companies'} onClick={() => this.props.history.push('/companies')}>
                                <div className={"column-headline"}>
                                    <p>Unternehmen managen</p>
                                </div>
                                <img className={'dashboard-picture'}  src={companies} alt={'blub'}/>
                                <div className={'dashboard-hover'} id={'hover-companies'}>
                                    <p>Legen Sie Ihre Tochterunternehmen an und erstellen Sie Stellenanzeigen für Ihre Tochterunternehmen.</p>
                                </div>
                        </div>
                        <div className={"col-lg"} id={'picture-recruiters'} onClick={() => this.props.history.push('/recruiters')}>
                            <div className={"column-headline"}>
                                <p>Recruiter managen</p>
                            </div>
                            <img className={'dashboard-picture'}   src={recruiters} alt={'blub'}/>
                            <div className={'dashboard-hover'} id={'hover-recruiters'}>
                                <p>Legen Sie Recruiter-Profile an, fügen Sie diese Ihren Stellenanzeigen hinzu und verwalten Sie diese. </p>
                            </div>
                        </div>
                        <div className={"col-lg"} id={'picture-postings'} onClick={() => this.props.history.push('/postings')}>
                            <div className={"column-headline"}>
                                <p>Stellenanzeigen managen</p>
                            </div>
                            <img className={'dashboard-picture'}  src={jobs} alt={'blub'}/>
                            <div className={'dashboard-hover'} id={'hover-postings'}>
                                <p>Legen Sie neue Stellenanzeigen an, fügen Sie diesen einem Unternehmen bzw. Recruiter hinzu und verwalten Sie diese.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
