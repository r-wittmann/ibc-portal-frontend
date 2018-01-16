import React, { Component } from 'react';
import Header from "../student_account/Header";

class FAQ extends Component {
    render() {
        return (
	        <div>
				<Header history={this.props.history}/>
	            <div className={'container'}>
		            <div className={'headline'}>
	                    <h1>FAQs</h1>
	            	</div>

	            	<div id="accordion" role="tablist">
					  <div className="card">
					    <div className="card-header" role="tab" id="headingOne">
					      <h5 className="mb-0">
					        <a data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true" aria-controls="collapseOne">
					          Was ist das IBC Job Portal?
					        </a>
					      </h5>
					    </div>

					    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					      <div className="card-body">
					      Das IBC Job Portal ist eine <b>Stellenbörse für digitale Jobs in München für Studenten und Absolventen</b> digitaler Studiengänge. Wir unterstützen neben IBC-Mitglieds-Unternehmen vor allem <b>Startups und NGOs</b>. Damit wollen wir junge Unternehmen und Unternehmen mit geringen finanziellen Mitteln bei der Suche nach geeigneten neuen Talenten unterstützen.
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header" role="tab" id="headingTwo">
					      <h5 className="mb-0">
					        <a className="collapsed" data-toggle="collapse" href="#collapseTwo" role="button" aria-expanded="false" aria-controls="collapseTwo">
					          FAQs für Studenten
					        </a>
					      </h5>
					    </div>
					    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
					      <div className="card-body">
					        <h5>Frage 1</h5>
					        <p>Antwort 1</p>
					        <h5>Frage 2</h5>
					        <p>Antwort 2</p>
					        <h5>Frage 3</h5>
					        <p>Antwort 3</p>
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header" role="tab" id="headingThree">
					      <h5 className="mb-0">
					        <a className="collapsed" data-toggle="collapse" href="#collapseThree" role="button" aria-expanded="false" aria-controls="collapseThree">
					          FAQs für Unternehmen
					        </a>
					      </h5>
					    </div>
					    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
					      <div className="card-body">
					       <h5>Wer darf sich als Unternehmen registrieren?</h5>
					        <p>Antwort 1</p>
					        <h5>Was ist wenn ich ein Konzern mit mehreren Marken und Unternehmen bin?</h5>
					        <p>Antwort 2</p>
					        <h5>Welche Daten muss ich bei der Registrierung angeben?</h5>
					        <p>Antwort 3</p>
					        <h5>Was passiert nachdem ich die Registrieung abgeschlossen habe?</h5>
					        <p>Antwort 4</p>
					        <h5>Ich habe mein Passwort vergessen - was muss ich tun?</h5>
					        <p>Antwort 5</p>
					        <h5>Was bedeutet die Dreiteilung zwischen Unternehmen, Recruiter & Stellenanzeigen?</h5>
					        <p>Antwort 6</p>
					        <h5>Wie erstelle ich ein neues Unternehmen?</h5>
					        <p>Antwort 7</p>
					        <h5>Wie erstelle ich einen neuen Recruiter?</h5>
					        <p>Antwort 8</p>
					        <h5>Wie erstelle ich eine neue Stellenanzeige?</h5>
					        <p>Antwort 9</p>
					        <h5>Ich möchte den Status meines Unternehmens ändern - was muss ich tun?</h5>
					        <p>Antwort 10</p>
					        <h5>Wie ändere ich mein Passwort, meine Email Adresse oder meinen Account Ansprechpartner?</h5>
					        <p>Antwort 11</p>
					      </div>
					    </div>
					  </div>
					</div>
					<div className="card">
					    <div className="card-header" role="tab" id="headingFour">
					      <h5 className="mb-0">
					        <a className="collapsed" data-toggle="collapse" href="#collapseFour" role="button" aria-expanded="false" aria-controls="collapseFour">
					         Noch mehr Fragen? 
					        </a>
					      </h5>
					    </div>
					    <div id="collapseFour" className="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
					      <div className="card-body">
					      	Schreiben Sie uns eine E-Mail and info@ibc-muenchen.com. Wir helfen Ihnen gerne weiter!
					      </div>
					    </div>
					  </div>
				

	        	</div>
	       	</div>
        );
    }
}

export default FAQ;
