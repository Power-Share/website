import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Download,
  Mail,
  Zap,
  Monitor,
  Battery,
  Car,
  Gift,
  ChevronDown,
  ExternalLink,
  Cpu,
  Radio,
  Smartphone,
} from 'lucide-react';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-bg-surface hover:bg-bg-secondary transition-colors"
      >
        <span className="font-semibold text-text-primary pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-text-secondary leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

const timeline = [
  { date: '20.10.2026', label: 'Kundenevent', detail: 'Infoveranstaltung in Altpölla' },
  { date: 'bis 30.11.2026', label: 'Anmeldung', detail: 'zur Projektteilnahme' },
  { date: '12/2026–01/2027', label: 'Versand', detail: 'Inbetriebnahme der Geräte' },
  { date: '02/2027', label: 'Optimierung', detail: 'Start in der EEG' },
  { date: '05–07/2027', label: '2. Event', detail: 'Informationen folgen' },
  { date: '31.10.2027', label: 'Projektende', detail: '' },
];

const faqs = [
  {
    q: 'Muss ich eine PV-Anlage haben?',
    a: 'Nein. Auch Haushalte ohne PV-Anlage oder flexible Verbraucher können teilnehmen.',
  },
  {
    q: 'Bleibt mein Stromlieferant?',
    a: 'Ja. Die Energiegemeinschaft ergänzt die normale Versorgung. Ihr bestehender Stromvertrag bleibt unberührt.',
  },
  {
    q: 'Kostet die Projekt-Hardware etwas?',
    a: 'Nein. Die benötigten Geräte werden im Rahmen des Projekts kostenlos zur Verfügung gestellt.',
  },
  {
    q: 'Sind Einsparungen garantiert?',
    a: 'Nein. Finanzielle Vorteile hängen von individuellen und äußeren Rahmenbedingungen ab.',
  },
  {
    q: 'Kann ich wieder aussteigen?',
    a: 'Ja, eine Vertragskündigung ist jederzeit möglich.',
  },
  {
    q: 'Was passiert mit meinen Daten?',
    a: 'Die Daten werden am Energy-Agent vor Ort grundverarbeitet. Nur die für die Optimierung relevanten Daten werden übermittelt. Details stehen in den Datenschutz- und Vertragsunterlagen.',
  },
];

export function Poella() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-dark rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <p className="inline-block px-4 py-1.5 rounded-full bg-teal/15 text-teal text-sm font-medium mb-6">
              Infoveranstaltung
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              PowerShare<span className="text-teal">Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Gemeinsam Energie intelligent nutzen
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal" />
                20. Oktober 2026
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal" />
                Altpölla, Niederösterreich
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Worum geht es */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Worum geht es?</h2>
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                Mit <strong className="text-text-primary">PowerShareHome</strong> haben Sie die
                Möglichkeit, Ihren selbst erzeugten erneuerbaren Strom oder den Strom aus der
                Energiegemeinschaft noch besser zu nutzen und aktiv an der Energiewende in Ihrer
                Region mitzuwirken.
              </p>
              <p>
                Als Mitglied der Energiegemeinschaft Pölla erhalten Sie ein{' '}
                <strong className="text-text-primary">
                  kostenloses Home Energy Management System (HEMS)
                </strong>
                . Dieses intelligente System stimmt Stromerzeugung und Stromverbrauch optimal
                aufeinander ab. Geräte wie Batteriespeicher oder Elektroautos werden dabei
                automatisch berücksichtigt.
              </p>
              <p>
                Zusätzlich wird beim Umspannwerk Ottenstein ein{' '}
                <strong className="text-text-primary">Großbatteriespeicher</strong> errichtet —
                der erste in einer Energiegemeinschaft in Österreich. So kann noch mehr lokal
                erzeugter Strom direkt vor Ort genutzt werden.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Ihre Vorteile als Teilnehmer
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: 'Kostenloses Energiemanagementsystem',
                desc: 'HEMS inklusive App, das Ihre Energieflüsse sichtbar macht und Geräte intelligent verbindet.',
              },
              {
                icon: Monitor,
                title: 'Optimierung Ihres Haushalts',
                desc: 'PV-Anlage, Heimspeicher, E-Auto und flexible Verbraucher werden auf Ihre gewählte Strategie abgestimmt.',
              },
              {
                icon: Battery,
                title: 'Mehr Strom aus der Energiegemeinschaft',
                desc: 'Ob mit oder ohne PV-Anlage — nutzen Sie durch Live-Daten mehr Strom aus der EEG.',
              },
              {
                icon: Car,
                title: 'Mitgestaltung & keine Bindung',
                desc: 'Bringen Sie Feedback und Ideen ein. Keine Kosten im Projektzeitraum, Kündigung jederzeit möglich.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                {...fadeIn}
                className="bg-bg-surface border border-border rounded-2xl p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter-Kit */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Ihr kostenloses Starter-Kit
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cpu,
                name: 'Energy-Agent',
                desc: 'Mini-PC als Herzstück des Systems',
              },
              {
                icon: Radio,
                name: 'Smart-Meter-Adapter',
                desc: 'Liest Ihre Verbrauchsdaten am Zähler',
              },
              {
                icon: Smartphone,
                name: 'PowerShare App',
                desc: 'Web & Mobile — Ihre Energieflüsse im Blick',
              },
              {
                icon: Zap,
                name: 'egon App',
                desc: 'Ihre Energiegemeinschaft verwalten',
              },
            ].map(({ icon: Icon, name, desc }) => (
              <motion.div
                key={name}
                {...fadeIn}
                className="bg-bg-surface border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">{name}</h3>
                <p className="text-text-secondary text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schritte & Downloads */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Schritte zur Teilnahme
            </h2>
          </motion.div>
          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div {...fadeIn} className="bg-bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary text-lg mb-2">
                    Beitritt zur Energiegemeinschaft Pölla
                  </h3>
                  <p className="text-text-secondary mb-3">
                    Falls Sie noch kein Mitglied sind, geben Sie Ihr Interesse unverbindlich bekannt:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://app.egon.energy/poella"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      app.egon.energy/poella
                    </a>
                    <a
                      href="/docs/vollmacht-smart-meter-schluessel.pdf"
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-teal text-teal rounded-lg font-medium hover:bg-teal/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Vollmacht Smart-Meter-Schlüssel (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div {...fadeIn} className="bg-bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary text-lg mb-2">
                    Teilnahmevertrag unterzeichnen
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Der Teilnahmevertrag wird bei der Infoveranstaltung zur Verfügung gestellt
                    oder kann per E-Mail angefordert werden. Bitte senden Sie den unterzeichneten
                    Vertrag bis spätestens <strong className="text-text-primary">30.11.2026</strong>{' '}
                    retour.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/docs/teilnahmevertrag-poella.pdf"
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy dark:bg-teal text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" />
                      Teilnahmevertrag (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div {...fadeIn} className="bg-bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary text-lg mb-2">
                    Geräte in Betrieb nehmen
                  </h3>
                  <p className="text-text-secondary">
                    Nach Erhalt der Geräte: Energy-Agent an die Steckdose anschließen, mit dem
                    WLAN verbinden und den Smart-Meter-Adapter am Zähler anbringen. Eine
                    Gebrauchsanleitung liegt der Sendung bei. Alternativ können Sie sich für die
                    Installationstage im Jänner anmelden.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Goodies */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <div className="bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/20 rounded-2xl p-8 md:p-10 text-center">
              <Gift className="w-12 h-12 text-teal mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                Goodies bei Teilnahme
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                <div className="bg-bg-surface rounded-xl p-5 border border-border">
                  <p className="font-semibold text-text-primary mb-1">Verlosung</p>
                  <p className="text-text-secondary text-sm">
                    Unter allen Anmeldungen bis 30.11.2026 werden{' '}
                    <strong className="text-text-primary">zwei Heimspeicher mit 5 kWh</strong>{' '}
                    Kapazität verlost.
                  </p>
                </div>
                <div className="bg-bg-surface rounded-xl p-5 border border-border">
                  <p className="font-semibold text-text-primary mb-1">Erste 50 Anmeldungen</p>
                  <p className="text-text-secondary text-sm">
                    Die ersten 50 unterzeichneten Teilnehmerverträge erhalten eine{' '}
                    <strong className="text-text-primary">smarte Steckdose</strong> zusätzlich zum
                    Starter-Kit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zeitplan */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">Zeitplan</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeline.map((item, i) => (
              <motion.div
                key={item.date}
                {...fadeIn}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-xl p-5 border ${
                  i === 0
                    ? 'bg-teal/10 border-teal/30'
                    : 'bg-bg-surface border-border'
                }`}
              >
                <p className="text-sm font-mono text-teal mb-1">{item.date}</p>
                <p className="font-semibold text-text-primary">{item.label}</p>
                {item.detail && (
                  <p className="text-text-secondary text-sm mt-1">{item.detail}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Häufige Fragen
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Fragen zum Projekt?</h2>
            <p className="text-white/70 mb-8 text-lg">
              Wir sind für Sie da — schreiben Sie uns einfach.
            </p>
            <a
              href="mailto:powersharehome-support@evn.at"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors text-lg"
            >
              <Mail className="w-5 h-5" />
              powersharehome-support@evn.at
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
