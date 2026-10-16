import { useLanguage } from '../i18n/LanguageContext';

export function Privacy() {
  const { lang } = useLanguage();

  if (lang === 'de') {
    return (
      <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Datenschutzerklärung</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Stand: Oktober 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">

            <h2 className="text-xl font-semibold text-navy dark:text-white">1. Verantwortlicher</h2>
            <p>
              Power Share FlexCo<br />
              Berggasse 5, 1090 Wien, Österreich<br />
              E-Mail: <a href="mailto:privacy@power-share.io" className="text-teal hover:underline">privacy@power-share.io</a><br />
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">2. Erhobene Daten</h2>
            <p>
              Beim Besuch unserer Website werden automatisch folgende Daten erfasst:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP-Adresse (anonymisiert)</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Aufgerufene Seite und Referrer-URL</li>
              <li>Browser-Typ und Betriebssystem</li>
            </ul>
            <p>
              Bei Nutzung unseres Kontaktformulars werden zusätzlich erhoben: Name, E-Mail-Adresse und die von Ihnen gewählte Rolle.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bereitstellung und Optimierung der Website (Art. 6 Abs. 1 lit. f DSGVO)</li>
              <li>Beantwortung von Kontaktanfragen (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>Newsletter-Versand bei ausdrücklicher Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy dark:text-white">4. Hosting und Drittanbieter</h2>
            <p>
              Diese Website wird über <strong>GitHub Pages</strong> (GitHub, Inc., San Francisco, USA) gehostet. GitHub kann beim Zugriff auf die Website Server-Logdaten erheben. Weitere Informationen finden Sie in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von GitHub</a>.
            </p>
            <p>
              Wir verwenden <strong>Google Fonts</strong>, die beim Seitenaufruf von Google-Servern geladen werden. Dabei kann Ihre IP-Adresse an Google übermittelt werden. Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">5. Cookies</h2>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige Cookies bzw. localStorage-Einträge für die Speicherung Ihrer Sprachpräferenz und Ihres Theme-Einstellungen (hell/dunkel). Es werden keine Tracking-Cookies oder Analyse-Tools eingesetzt.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">6. Ihre Rechte</h2>
            <p>Sie haben gemäß DSGVO folgende Rechte:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an <a href="mailto:privacy@power-share.io" className="text-teal hover:underline">privacy@power-share.io</a>.
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">7. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen:<br />
              Österreichische Datenschutzbehörde<br />
              Barichgasse 40–42, 1030 Wien<br />
              <a href="https://www.dsb.gv.at" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>
            </p>

            <h2 className="text-xl font-semibold text-navy dark:text-white">8. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslage oder Änderungen unserer Dienste anzupassen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-bg-primary pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: October 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">

          <h2 className="text-xl font-semibold text-navy dark:text-white">1. Data Controller</h2>
          <p>
            Power Share FlexCo<br />
            Berggasse 5, 1090 Vienna, Austria<br />
            Email: <a href="mailto:privacy@power-share.io" className="text-teal hover:underline">privacy@power-share.io</a><br />
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">2. Data Collected</h2>
          <p>When you visit our website, the following data is automatically collected:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address (anonymized)</li>
            <li>Date and time of the request</li>
            <li>Page accessed and referrer URL</li>
            <li>Browser type and operating system</li>
          </ul>
          <p>When you use our contact form, we additionally collect: name, email address, and your selected role.</p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">3. Purpose of Data Processing</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provision and optimization of the website (Art. 6(1)(f) GDPR)</li>
            <li>Responding to contact inquiries (Art. 6(1)(b) GDPR)</li>
            <li>Newsletter distribution with explicit consent (Art. 6(1)(a) GDPR)</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy dark:text-white">4. Hosting and Third Parties</h2>
          <p>
            This website is hosted on <strong>GitHub Pages</strong> (GitHub, Inc., San Francisco, USA). GitHub may collect server log data when you access the website. For more information, see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">GitHub's privacy statement</a>.
          </p>
          <p>
            We use <strong>Google Fonts</strong>, which are loaded from Google servers when you visit the page. Your IP address may be transmitted to Google. For more information, see <a href="https://policies.google.com/privacy" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">5. Cookies</h2>
          <p>
            This website only uses technically necessary cookies and localStorage entries to save your language preference and theme setting (light/dark). No tracking cookies or analytics tools are used.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">6. Your Rights</h2>
          <p>Under the GDPR, you have the following rights:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Right of access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to data portability (Art. 20 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
          </ul>
          <p>
            To exercise your rights, please contact <a href="mailto:privacy@power-share.io" className="text-teal hover:underline">privacy@power-share.io</a>.
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">7. Right to Lodge a Complaint</h2>
          <p>
            You have the right to lodge a complaint with the competent data protection authority:<br />
            Austrian Data Protection Authority (Datenschutzbehörde)<br />
            Barichgasse 40–42, 1030 Vienna<br />
            <a href="https://www.dsb.gv.at" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>
          </p>

          <h2 className="text-xl font-semibold text-navy dark:text-white">8. Changes</h2>
          <p>
            We reserve the right to update this privacy policy as needed to reflect changes in legal requirements or our services.
          </p>
        </div>
      </div>
    </div>
  );
}
