import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import translate from "../../../translationService";

class PublicPostingListItem extends Component {


    render() {
        return (

            <div className={'col-12 col-sm-10 col-md-6 col-lg-4 offset-0 offset-sm-1 offset-md-0'}>
                <div className={'card text-center'} style={{ height: 320, marginBottom: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 128 }}>
                        {this.props.posting.logo &&
                        <img src={this.props.posting.logo}
                             style={{ maxWidth: 200, maxHeight: 100 }}
                             alt={"Card image cap"}/>
                        }
                    </div>
                    <div className={"card-body"} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <h5 className={"card-title"}>
                            <Link to={`/postings/${this.props.posting.id}`}>
                                {this.props.posting.title}
                            </Link>
                        </h5>
                        <h6 className={"card-subtitle mb-2 text-muted"}><span
                            className={'fa fa-map-marker'}/> {this.props.posting.place_of_employment} &nbsp; <span
                            className={'fa fa-calendar-alt'}/> {translate.startOfEmployment(this.props.posting.start_of_employment)}
                        </h6>
                        <p className={"card-text"}>
                            <a href={`/postings/${this.props.posting.id}`} className={"btn btn-primary"}>Mehr
                                Details</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicPostingListItem;
