import React, { Component } from 'react';
import Header from '../student_account/Header';

class Impressum extends Component {
    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className={'container'}>
                    <div className={'headline'}>
                        <h1>Impressum</h1>
                        <br/>
                        <h2>KONTAKT:</h2>

                        <p>Internet Business Cluster e.V.<br/>
                            c/o Ludwig-Maximilians-Universität München<br/>
                            Institut für Wirtschaftsinformatik und Neue Medien<br/>
                            Ludwigstraße 28 D-80539 München<br/>
                            Tel.: +49 (0)89 2180-6390<br/>
                            Email: info@ibc-muenchen.com</p>


                        <br/>

                        <h2>HAFTUNG FÜR INHALTE</h2>
                        <p>Die auf den Web-Seiten abrufbaren Beiträge dienen nur der allgemeinen Information und nicht
                            der Beratung in konkreten Fällen. Wir sind bemüht, für die Richtigkeit und Aktualität aller
                            auf der Website enthaltenen Informationen und Daten gemäß § 7 Abs.1 TMG zu sorgen. Für die
                            Korrektheit, Vollständigkeit, Aktualität oder Qualität der bereitgestellten Informationen
                            und Daten wird jedoch keine Gewähr nach §§ 8 bis 10 TMG übernommen. Die Haftung für den
                            Inhalt der abrufbaren Informationen wird ausgeschlossen, soweit es sich nicht um
                            vorsätzliche oder grob fahrlässige Falschinformation handelt. Verpflichtungen zur Entfernung
                            oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
                            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                            werden wir diese Inhalte umgehend entfernen.</p>
                        <br/>
                        <h2>HAFTUNG FÜR LINKS</h2>
                        <p>Wir sind für den Inhalt von Webseiten, die über einen Hyperlink erreicht werden, nicht
                            verantwortlich. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
                            verantwortlich. Wir machen uns die Inhalte dieser Internetseiten ausdrücklich nicht zu eigen
                            und können deshalb für die inhaltliche Korrektheit, Vollständigkeit und Verfügbarkeit keine
                            Gewähr leisten. Wir haben bei der erstmaligen Verknüpfung zwar den fremden Inhalt daraufhin
                            überprüft, ob durch ihn eine mögliche zivilrechtliche oder strafrechtliche
                            Verantwortlichkeit ausgelöst wird. Wir sind aber nicht dazu verpflichtet, die Inhalte, auf
                            die wir unserem Angebot verweisen, ständig auf Veränderungen zu überprüfen, die eine
                            Verantwortlichkeit neu begründen könnten. Erst wenn wir feststellen oder von anderen darauf
                            hingewiesen werden, dass ein konkretes Angebot, zu dem wir einen Link bereitgestellt haben,
                            eine zivil- oder strafrechtliche Verantwortlichkeit auslöst, werden wir den Verweis auf
                            dieses Angebot aufheben, soweit uns dies technisch möglich und zumutbar ist.</p>
                        <br/>
                        <h2>URHEBERRECHT</h2>
                        <p>Die durch den Betreiber dieser Seite erstellten Inhalte und Werke auf diesen Webseiten
                            unterliegen dem deutschen Urheberrecht. Sämtliche Beiträge Dritter sind als solche
                            gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                            außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen
                            Autors bzw. Erstellers. Kopien von diesen Seiten sind nur für den privaten Bereich
                            gestattet, nicht jedoch für kommerzielle Zwecke.</p>
                        <br/>
                        <p>Quelle: <a href={'http://www.anwaltinfos.de/rechtsanwalt/stuttgart/'}>Rechtsanwalt
                            Stuttgart</a>, <a
                            href={'http://www.anwaltinfos.de/rechtsanwalt/berlin/Baurecht-Architektenrecht.html'}>Baurecht
                            Berlin</a> von <a href={'http://www.disclaimer.de/'}>www.disclaimer.de</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Impressum;
