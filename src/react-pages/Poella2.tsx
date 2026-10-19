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
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';

const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT || '';

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

const equipmentOptions = [
  { id: 'pv', label: 'PV-Anlage' },
  { id: 'battery', label: 'Batteriespeicher' },
  { id: 'wallbox', label: 'Wallbox / E-Auto-Ladestation' },
  { id: 'heatpump', label: 'Wärmepumpe' },
  { id: 'smartplug', label: 'Smarte Steckdosen' },
] as const;

const brandOptions: Record<string, string[]> = {
  pv: ['Fronius', 'Huawei', 'SMA', 'Kostal', 'GoodWe', 'Solaredge', 'Enphase', 'Victron', 'Solinteg', 'Andere', 'Weiß ich nicht'],
  battery: ['BYD', 'Huawei LUNA2000', 'Tesla Powerwall', 'sonnen', 'Fronius / BYD', 'Marstek', 'CATL', 'Pylontech', 'Andere', 'Weiß ich nicht'],
  wallbox: ['go-e', 'KEBA', 'Fronius Wattpilot', 'Easee', 'ABL', 'Webasto', 'Juice Technology', 'Andere', 'Weiß ich nicht'],
  heatpump: ['Vaillant', 'Viessmann', 'Daikin', 'Mitsubishi', 'Panasonic', 'Bosch', 'Wolf', 'Nibe', 'Andere', 'Weiß ich nicht'],
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [equipment, setEquipment] = useState<Set<string>>(new Set());
  const [brands, setBrands] = useState<Record<string, string>>({});
  const [smartMeter, setSmartMeter] = useState('');
  const [wlan, setWlan] = useState('');
  const [acceptContract, setAcceptContract] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  const toggleEquipment = (id: string) => {
    setEquipment((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setBrands((b) => { const { [id]: _, ...rest } = b; return rest; });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptContract || !acceptPrivacy) return;

    setStatus('submitting');
    try {
      if (FORM_ENDPOINT) {
        const payload = JSON.stringify({
          type: 'poella-registration',
          name,
          address,
          plz,
          ort,
          email,
          phone,
          equipment: [...equipment],
          brands,
          smartMeter,
          wlan,
          acceptContract,
          acceptPrivacy,
          source: 'poella-landing',
          timestamp: new Date().toISOString(),
        });

        // Try with cors first to read response (duplicate detection), fallback to no-cors
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            redirect: 'follow',
          });
          const result = await res.json();
          if (result.status === 'duplicate') {
            setStatus('duplicate');
            return;
          }
        } catch {
          // CORS blocked — fire-and-forget with no-cors
          await fetch(FORM_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
          });
        }
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-border bg-bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors';

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <Mail className="text-teal mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Fast geschafft!
        </h3>
        <p className="text-text-secondary mb-2">
          Wir haben Ihnen eine Bestätigungs-E-Mail an <strong className="text-text-primary">{email}</strong> gesendet.
        </p>
        <p className="text-text-secondary">
          Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung abzuschließen.
        </p>
      </div>
    );
  }

  if (status === 'duplicate') {
    return (
      <div className="text-center py-10">
        <CheckCircle className="text-teal mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Bereits angemeldet
        </h3>
        <p className="text-text-secondary">
          Diese E-Mail-Adresse ist bereits registriert. Prüfen Sie Ihren Posteingang für die Bestätigungs-E-Mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Kontaktdaten */}
      <div>
        <h4 className="font-semibold text-text-primary mb-3">Kontaktdaten</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname *"
            className={inputClass}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse *"
            className={inputClass}
          />
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Straße und Hausnummer *"
            className={inputClass}
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              placeholder="PLZ *"
              className={inputClass}
            />
            <input
              type="text"
              required
              value={ort}
              onChange={(e) => setOrt(e.target.value)}
              placeholder="Ort *"
              className={`${inputClass} col-span-2`}
            />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon (optional)"
            className={inputClass}
          />
        </div>
      </div>

      {/* Anlagen */}
      <div>
        <h4 className="font-semibold text-text-primary mb-1">Was haben Sie zuhause?</h4>
        <p className="text-text-muted text-sm mb-3">Mehrfachauswahl möglich. Auch ohne Anlagen können Sie teilnehmen.</p>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleEquipment(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                equipment.has(id)
                  ? 'bg-teal text-white border-teal'
                  : 'bg-bg-surface text-text-secondary border-border hover:border-teal'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Conditional brand dropdowns */}
        {[...equipment].filter((id) => brandOptions[id]).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[...equipment]
              .filter((id) => brandOptions[id])
              .map((id) => (
                <select
                  key={id}
                  value={brands[id] || ''}
                  onChange={(e) =>
                    setBrands((prev) => ({ ...prev, [id]: e.target.value }))
                  }
                  className={`${inputClass} appearance-none ${
                    brands[id] ? 'text-text-primary' : 'text-text-muted'
                  }`}
                >
                  <option value="">
                    {equipmentOptions.find((o) => o.id === id)?.label}: Marke?
                  </option>
                  {brandOptions[id].map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              ))}
          </div>
        )}
      </div>

      {/* Smart Meter & WLAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-text-primary mb-2">Smart Meter vorhanden?</h4>
          <div className="flex gap-2">
            {['Ja', 'Nein', 'Weiß nicht'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSmartMeter(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  smartMeter === opt
                    ? 'bg-teal text-white border-teal'
                    : 'bg-bg-surface text-text-secondary border-border hover:border-teal'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary mb-2">WLAN beim Zählerkasten?</h4>
          <div className="flex gap-2">
            {['Ja', 'Nein', 'Unsicher'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setWlan(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  wlan === opt
                    ? 'bg-teal text-white border-teal'
                    : 'bg-bg-surface text-text-secondary border-border hover:border-teal'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vertragsübersicht */}
      <div className="bg-bg-secondary border border-border rounded-xl p-5 space-y-2.5">
        <h4 className="font-semibold text-text-primary">Vertragsübersicht</h4>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-text-muted">Kosten:</dt>
          <dd className="text-text-primary">Kostenlos (gesamte Projektdauer)</dd>
          <dt className="text-text-muted">Laufzeit:</dt>
          <dd className="text-text-primary">Befristet bis 28.02.2028</dd>
          <dt className="text-text-muted">Kündigung:</dt>
          <dd className="text-text-primary">Jederzeit, 1 Monat Frist zum Monatsende</dd>
          <dt className="text-text-muted">Geräte:</dt>
          <dd className="text-text-primary">Leihgabe während der Laufzeit; kostenloser Eigentumsübergang am 28.02.2028 bei aufrechtem Vertrag</dd>
          <dt className="text-text-muted">Voraussetzung:</dt>
          <dd className="text-text-primary">Mitgliedschaft in der EEG Pölla</dd>
        </dl>
        <div className="pt-2 border-t border-border text-xs text-text-muted">
          Vertragspartner: Power Share FlexCo · Berggasse 5, 1090 Wien · FN 688982 i · ATU83693647 ·{' '}
          <a href="mailto:hello@power-share.io" className="text-teal">hello@power-share.io</a>
        </div>
      </div>

      {/* Zustimmungen */}
      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={acceptContract}
            onChange={(e) => setAcceptContract(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border text-teal focus:ring-teal accent-teal shrink-0"
          />
          <span className="text-text-secondary text-sm leading-relaxed">
            Ich stimme dem{' '}
            <a
              href="/docs/teilnahmevertrag-poella.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline underline-offset-2"
            >
              Teilnahmevertrag
            </a>{' '}
            zu und möchte am Projekt PowerShareHome teilnehmen. *
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={acceptPrivacy}
            onChange={(e) => setAcceptPrivacy(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border text-teal focus:ring-teal accent-teal shrink-0"
          />
          <span className="text-text-secondary text-sm leading-relaxed">
            Ich habe die{' '}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline underline-offset-2"
            >
              Datenschutzinformation
            </a>{' '}
            gelesen. *
          </span>
        </label>
        <div className="bg-bg-secondary border border-border rounded-lg p-4 mt-1">
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            Für die Aktivierung der Smart-Meter-Kundenschnittstelle benötigen wir Ihre unterschriebene Vollmacht.
            Bitte laden Sie diese herunter, unterschreiben Sie sie und senden Sie sie per E-Mail an{' '}
            <a href="mailto:powersharehome-support@evn.at" className="text-teal">powersharehome-support@evn.at</a>.
          </p>
          <a
            href="/docs/vollmacht-smart-meter-schluessel.pdf"
            download="Vollmacht_Smart-Meter-Schluessel.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 border border-teal text-teal rounded-lg text-sm font-medium hover:bg-teal/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Vollmacht herunterladen (PDF)
          </a>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting' || !acceptContract || !acceptPrivacy}
        className="w-full bg-teal text-white font-semibold py-4 rounded-xl hover:bg-teal-dark transition-colors text-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === 'submitting' && <Loader2 className="animate-spin" size={20} />}
        Verbindlich anmelden
      </button>

      {status === 'error' && (
        <p className="text-coral text-sm text-center">
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.
        </p>
      )}

      <p className="text-text-muted text-xs text-center">
        * Pflichtfeld. Anmeldeschluss: 30.11.2026
      </p>
    </form>
  );
}

function ConfirmationBanner() {
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('confirmed');
      if (c) {
        setConfirmed(c);
        // Clean URL without reload
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  });

  if (!confirmed) return null;

  if (confirmed === '1') {
    return (
      <div className="bg-green/10 border border-green/30 rounded-xl p-6 text-center max-w-2xl mx-auto mb-8">
        <CheckCircle className="text-green mx-auto mb-3" size={40} />
        <h3 className="text-lg font-bold text-text-primary mb-1">Anmeldung bestätigt!</h3>
        <p className="text-text-secondary text-sm">
          Vielen Dank — Ihre Teilnahme am Projekt PowerShareHome ist nun bestätigt.
          Wir melden uns in Kürze mit den nächsten Schritten.
        </p>
      </div>
    );
  }

  if (confirmed === 'already') {
    return (
      <div className="bg-teal/10 border border-teal/30 rounded-xl p-6 text-center max-w-2xl mx-auto mb-8">
        <CheckCircle className="text-teal mx-auto mb-3" size={40} />
        <h3 className="text-lg font-bold text-text-primary mb-1">Bereits bestätigt</h3>
        <p className="text-text-secondary text-sm">Ihre Anmeldung wurde bereits bestätigt.</p>
      </div>
    );
  }

  return (
    <div className="bg-coral/10 border border-coral/30 rounded-xl p-6 text-center max-w-2xl mx-auto mb-8">
      <p className="text-text-primary font-medium">Ungültiger Bestätigungslink. Bitte prüfen Sie Ihre E-Mail oder kontaktieren Sie uns.</p>
    </div>
  );
}

export function Poella2() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20">
      {/* Confirmation Banner (shown after email link click) */}
      <div className="pt-24 px-6">
        <ConfirmationBanner />
      </div>
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
              { icon: Cpu, name: 'Energy-Agent', desc: 'Mini-PC als Herzstück des Systems' },
              { icon: Radio, name: 'Smart-Meter-Adapter', desc: 'Liest Ihre Verbrauchsdaten am Zähler' },
              { icon: Smartphone, name: 'PowerShare App', desc: 'Web & Mobile — Ihre Energieflüsse im Blick' },
              { icon: Zap, name: 'egon App', desc: 'Ihre Energiegemeinschaft verwalten' },
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

      {/* Schritte zur Teilnahme */}
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
                  <a
                    href="https://app.egon.energy/poella"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    app.egon.energy/poella
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Registration Form */}
            <motion.div {...fadeIn} className="bg-bg-surface border-2 border-teal/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary text-lg">
                    Online-Anmeldung & Vertragszustimmung
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">
                    Füllen Sie das Formular aus, um sich direkt anzumelden. Anmeldeschluss: 30.11.2026
                  </p>
                </div>
              </div>
              <RegistrationForm />
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-text-muted text-xs mb-2">
                  Sie können die Unterlagen auch direkt herunterladen:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/docs/teilnahmevertrag-poella.pdf"
                    download="PowerShareHome_Teilnahmevertrag.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted border border-border rounded-lg hover:border-teal hover:text-teal transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Teilnahmevertrag
                  </a>
                  <a
                    href="/docs/vollmacht-smart-meter-schluessel.pdf"
                    download="Vollmacht_Smart-Meter-Schluessel.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted border border-border rounded-lg hover:border-teal hover:text-teal transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Vollmacht
                  </a>
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
                  <p className="text-text-secondary mb-4">
                    Nach Erhalt der Geräte: Energy-Agent an die Steckdose anschließen, mit dem
                    WLAN verbinden und den Smart-Meter-Adapter am Zähler anbringen.
                    Alternativ können Sie sich für die Installationstage im Jänner anmelden.
                  </p>
                  <a
                    href="/docs/energy-agent-kurzanleitung.pdf"
                    download="Energy-Agent_Kurzanleitung.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-teal text-teal rounded-lg font-medium hover:bg-teal/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Kurzanleitung Energy-Agent (PDF)
                  </a>
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
