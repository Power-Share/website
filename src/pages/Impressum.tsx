import { useLanguage } from '../i18n/LanguageContext';

export function Impressum() {
  const { lang } = useLanguage();

  if (lang === 'de') {
    return (
      <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-8">Impressum</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold text-navy dark:text-white">Angaben gemäß § 5 E-Commerce-Gesetz (ECG)</h2>

            <div>
              <p className="font-semibold text-navy dark:text-white">Power Share FlexCo</p>
              <p>Berggasse 5<br />1090 Wien<br />Österreich</p>
            </div>

            <div>
              <p><strong>Firmenbuchnummer:</strong> FN 688982 i</p>
              <p><strong>Firmenbuchgericht:</strong> Handelsgericht Wien</p>
              <p><strong>UID-Nummer:</strong> ATU83693647</p>
            </div>

            <div>
              <p><strong>Geschäftsführer:</strong> Jürgen Eckel</p>
            </div>

            <div>
              <p><strong>Kontakt:</strong></p>
              <p>E-Mail: <a href="mailto:hello@power-share.io" className="text-teal hover:underline">hello@power-share.io</a></p>
              <p>Web: <a href="https://power-share.io" className="text-teal hover:underline">power-share.io</a></p>
            </div>

            <div>
              <p><strong>Unternehmensgegenstand:</strong> Energietelemetrie und Steuerungssysteme, Software für Energiegemeinschaften</p>
            </div>

            <div>
              <p><strong>Anwendbare Rechtsvorschriften:</strong> Gewerbeordnung (GewO), E-Commerce-Gesetz (ECG), Datenschutzgrundverordnung (DSGVO)</p>
              <p><strong>Aufsichtsbehörde:</strong> Magistratisches Bezirksamt des IX. Bezirks</p>
            </div>

            <h2 className="text-xl font-semibold text-navy dark:text-white mt-8">Haftungsausschluss</h2>

            <h3 className="font-semibold text-navy dark:text-white">Haftung für Inhalte</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="font-semibold text-navy dark:text-white">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="font-semibold text-navy dark:text-white">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white mt-8">Streitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-8">Legal Notice (Impressum)</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold text-navy dark:text-white">Information according to § 5 E-Commerce Act (ECG)</h2>

          <div>
            <p className="font-semibold text-navy dark:text-white">Power Share FlexCo</p>
            <p>Berggasse 5<br />1090 Vienna<br />Austria</p>
          </div>

          <div>
            <p><strong>Commercial register number:</strong> FN 688982 i</p>
            <p><strong>Commercial register court:</strong> Handelsgericht Wien (Commercial Court of Vienna)</p>
            <p><strong>VAT ID:</strong> ATU83693647</p>
          </div>

          <div>
            <p><strong>Managing Director:</strong> Jürgen Eckel</p>
          </div>

          <div>
            <p><strong>Contact:</strong></p>
            <p>Email: <a href="mailto:hello@power-share.io" className="text-teal hover:underline">hello@power-share.io</a></p>
            <p>Web: <a href="https://power-share.io" className="text-teal hover:underline">power-share.io</a></p>
          </div>

          <div>
            <p><strong>Business activity:</strong> Energy telemetry and control systems, software for energy communities</p>
          </div>

          <h2 className="text-xl font-semibold text-navy dark:text-white mt-8">Disclaimer</h2>

          <h3 className="font-semibold text-navy dark:text-white">Liability for content</h3>
          <p>
            The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages under general law in accordance with § 7 (1) ECG. However, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
          </p>

          <h3 className="font-semibold text-navy dark:text-white">Liability for links</h3>
          <p>
            Our website contains links to external third-party websites, the content of which we have no influence over. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.
          </p>

          <h3 className="font-semibold text-navy dark:text-white">Copyright</h3>
          <p>
            The content and works created by the site operators on these pages are subject to Austrian copyright law. Reproduction, processing, distribution, and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white mt-8">Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR):{' '}
            <a href="https://ec.europa.eu/consumers/odr" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
            You can find our email address in the legal notice above. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </div>
      </div>
    </div>
  );
}
