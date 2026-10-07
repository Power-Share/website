import { useLanguage } from '../i18n/LanguageContext';

export function Terms() {
  const { lang } = useLanguage();

  if (lang === 'de') {
    return (
      <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Stand: Oktober 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">

            <h2 className="text-xl font-semibold text-navy dark:text-white">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Website power-share.io, betrieben von Power Share FlexCo, Berggasse 5, 1090 Wien, Österreich (im Folgenden „Betreiber"). Durch die Nutzung dieser Website erklären Sie sich mit diesen AGB sowie unserer Datenschutzerklärung einverstanden.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">2. Geistiges Eigentum</h2>
            <p>
              Sämtliche Inhalte dieser Website — einschließlich Texte, Grafiken, Logos, Icons, Bilder, Datensammlungen, Seitenlayout und zugrunde liegender Software — sind Eigentum des Betreibers und durch das österreichische Urheberrecht geschützt. Sie dürfen Inhalte nur für den persönlichen, nicht-kommerziellen Gebrauch einsehen und herunterladen. Jede Vervielfältigung, Verbreitung, Veröffentlichung oder kommerzielle Nutzung ohne schriftliche Zustimmung des Betreibers ist untersagt.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">3. Nutzungsbedingungen</h2>
            <p>Sie verpflichten sich, die Website nicht in einer Weise zu nutzen, die:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>die Website beschädigt oder deren Verfügbarkeit beeinträchtigt;</li>
              <li>rechtswidrigen, betrügerischen oder schädlichen Zwecken dient;</li>
              <li>andere Nutzer in ihrer Nutzung einschränkt.</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy dark:text-white">4. Haftungsausschluss</h2>
            <p>
              Die Website und ihre Inhalte werden „wie besehen" bereitgestellt. Der Betreiber übernimmt keine Gewährleistung für die Richtigkeit, Vollständigkeit oder Aktualität der Inhalte. Der Betreiber haftet nicht für Schäden, die aus der Nutzung oder Unmöglichkeit der Nutzung dieser Website entstehen, soweit gesetzlich zulässig.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">5. Änderungen</h2>
            <p>
              Der Betreiber behält sich das Recht vor, Inhalte der Website sowie diese AGB jederzeit ohne Vorankündigung zu ändern oder zurückzuziehen.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">6. Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Bei Streitigkeiten ist eine gütliche Einigung anzustreben. Kommt keine Einigung zustande, ist das sachlich zuständige Gericht in Wien zuständig.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">7. Kontakt</h2>
            <p>
              Bei Fragen zu diesen AGB wenden Sie sich bitte an:<br />
              <a href="mailto:hello@power-share.io" className="text-teal hover:underline">hello@power-share.io</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: October 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">

          <h2 className="text-xl font-semibold text-navy dark:text-white">1. Scope</h2>
          <p>
            These Terms of Service govern the use of the website power-share.io, operated by Power Share FlexCo, Berggasse 5, 1090 Vienna, Austria (hereinafter "Operator"). By using this website, you agree to these terms and our privacy policy. If you do not agree, please do not use this website.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">2. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, icons, images, data compilations, page layout, and underlying software — is the property of the Operator and is protected by Austrian copyright law. You may view and download content for personal, non-commercial use only. Any reproduction, distribution, publication, or commercial exploitation without the written consent of the Operator is prohibited.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">3. Acceptable Use</h2>
          <p>You agree not to use the website in any way that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>damages or impairs the availability of the website;</li>
            <li>is unlawful, fraudulent, or harmful;</li>
            <li>restricts other users' use of the website.</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy dark:text-white">4. Disclaimer</h2>
          <p>
            The website and its content are provided "as is." The Operator makes no warranties regarding the accuracy, completeness, or timeliness of the content. To the extent permitted by law, the Operator shall not be liable for any damages arising from the use or inability to use this website.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">5. Changes</h2>
          <p>
            The Operator reserves the right to modify or withdraw website content and these terms at any time without prior notice.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">6. Governing Law and Jurisdiction</h2>
          <p>
            Austrian law applies, excluding the UN Convention on Contracts for the International Sale of Goods. In the event of disputes, the parties shall seek amicable resolution. If no agreement is reached, the competent court in Vienna shall have jurisdiction.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">7. Contact</h2>
          <p>
            For questions about these terms, please contact:<br />
            <a href="mailto:hello@power-share.io" className="text-teal hover:underline">hello@power-share.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
