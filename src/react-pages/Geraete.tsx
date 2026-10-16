import { motion } from 'framer-motion';
import {
  Sun,
  Battery,
  Car,
  Plug,
  Wifi,
  Radio,
  Cable,
  Zap,
  ChevronDown,
  Gauge,
  MonitorCog,
} from 'lucide-react';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

interface Device {
  name: string;
  description?: string;
  status: 'supported' | 'planned';
}

interface DeviceCategory {
  title: string;
  icon: typeof Sun;
  protocol: string;
  protocolIcon: typeof Wifi;
  protocolLabel: string;
  devices: Device[];
}

const categories: DeviceCategory[] = [
  {
    title: 'PV-Wechselrichter',
    icon: Sun,
    protocol: 'api',
    protocolIcon: Wifi,
    protocolLabel: 'Solar API / Modbus TCP',
    devices: [
      { name: 'Fronius Symo', description: 'via Fronius Solar API (lokal)', status: 'supported' },
      { name: 'Fronius Gen24 / Primo', description: 'via Fronius Solar API (lokal)', status: 'supported' },
      { name: 'Fronius (SunSpec Modbus)', description: 'via Modbus TCP, Port 502, SunSpec Model 113', status: 'supported' },
      { name: 'Solinteg MHT 25–50K', description: 'Hybrid-Wechselrichter via Modbus TCP', status: 'supported' },
      { name: 'Huawei SUN2000', description: 'via Modbus TCP', status: 'planned' },
      { name: 'SMA Sunny Boy / Tripower', description: 'via Modbus TCP', status: 'planned' },
    ],
  },
  {
    title: 'Batteriespeicher',
    icon: Battery,
    protocol: 'modbus',
    protocolIcon: Cable,
    protocolLabel: 'Solar API / Modbus TCP',
    devices: [
      { name: 'Fronius BYD Battery-Box', description: 'via Fronius Solar API (Spannung, Strom, Ladestand)', status: 'supported' },
      { name: 'Solinteg (integriert)', description: 'im Hybrid-Wechselrichter, via Modbus TCP', status: 'supported' },
      { name: 'Marstek Venus-E 3', description: 'via Modbus TCP', status: 'supported' },
      { name: 'Huawei LUNA2000', description: 'via Modbus TCP', status: 'planned' },
    ],
  },
  {
    title: 'Wallboxen & E-Auto-Ladestationen',
    icon: Car,
    protocol: 'ocpp',
    protocolIcon: Zap,
    protocolLabel: 'OCPP 1.6J / 2.0.1',
    devices: [
      { name: 'go-e Charger', description: 'OCPP 1.6J', status: 'supported' },
      { name: 'KEBA KeContact P30', description: 'OCPP 1.6J', status: 'supported' },
      { name: 'Easee Home / Charge', description: 'OCPP 1.6J', status: 'supported' },
      { name: 'Alle OCPP-1.6J-kompatiblen Wallboxen', description: 'Universelle Anbindung', status: 'supported' },
      { name: 'OCPP 2.0.1-kompatible Wallboxen', description: 'Erweiterte Funktionen', status: 'supported' },
    ],
  },
  {
    title: 'Smarte Steckdosen & Schalter',
    icon: Plug,
    protocol: 'zigbee',
    protocolIcon: Radio,
    protocolLabel: 'Zigbee / WLAN',
    devices: [
      { name: 'Zigbee-Steckdosen mit Energiemessung', description: 'via Zigbee2MQTT, z.B. NOUS A1Z, Blitzwolf', status: 'supported' },
      { name: 'Zigbee-Schalter', description: 'via Zigbee2MQTT', status: 'supported' },
      { name: 'IKEA TRADFRI Steckdosen & Schalter', description: 'via IKEA Dirigera Hub oder Zigbee2MQTT', status: 'supported' },
      { name: 'Tasmota-kompatible WLAN-Steckdosen', description: 'via MQTT (Shelly, Sonoff etc.)', status: 'supported' },
    ],
  },
  {
    title: 'Energiemonitoring & Smart Meter',
    icon: Gauge,
    protocol: 'mixed',
    protocolIcon: Wifi,
    protocolLabel: 'WLAN / M-Bus / Zigbee',
    devices: [
      { name: 'Shelly Pro 3EM', description: '3-Phasen-Netzmonitor via HTTP REST API', status: 'supported' },
      { name: 'Kaifa Smart Meter', description: 'via Smart-Meter-Adapter (DLMS/COSEM, M-Bus)', status: 'supported' },
      { name: 'Landis+Gyr E450 / E360 / E570', description: 'via M-Bus, AES-GCM verschlüsselt', status: 'supported' },
      { name: 'Iskra AM550', description: 'via DLMS/COSEM, AES-GCM verschlüsselt', status: 'supported' },
      { name: 'Kamstrup HAN', description: 'via HAN-Schnittstelle (DLMS/COSEM)', status: 'supported' },
      { name: 'Siemens TD3511', description: 'via DLMS/COSEM', status: 'supported' },
    ],
  },
  {
    title: 'Energiemanagementsysteme (Integration)',
    icon: MonitorCog,
    protocol: 'api',
    protocolIcon: Wifi,
    protocolLabel: 'MQTT / HTTP REST',
    devices: [
      { name: 'Victron Cerbo GX', description: 'Integration via MQTT — PV, Speicher und Verbrauchsdaten', status: 'supported' },
      { name: 'SmartFox', description: 'Integration via HTTP REST API (bis zu 5 Wechselrichter)', status: 'supported' },
    ],
  },
];

const protocols = [
  {
    icon: Wifi,
    name: 'Fronius Solar API',
    desc: 'Lokale HTTP-Abfrage von Wechselrichter, Speicher und Zählerdaten über das Heimnetzwerk',
  },
  {
    icon: Cable,
    name: 'Modbus TCP',
    desc: 'Industriestandard für Wechselrichter und Speichersysteme (SunSpec-kompatibel)',
  },
  {
    icon: Zap,
    name: 'OCPP 1.6J / 2.0.1',
    desc: 'Open Charge Point Protocol — offener Standard für Wallbox-Kommunikation',
  },
  {
    icon: Radio,
    name: 'Zigbee 802.15.4',
    desc: 'Energiesparendes Mesh-Protokoll für smarte Steckdosen, Schalter und Sensoren',
  },
];

function DeviceCategoryCard({ category }: { category: DeviceCategory }) {
  const [open, setOpen] = useState(true);
  const Icon = category.icon;
  const ProtocolIcon = category.protocolIcon;

  return (
    <motion.div {...fadeIn} className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-teal" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">{category.title}</h3>
            <span className="flex items-center gap-1.5 text-text-muted text-sm mt-0.5">
              <ProtocolIcon className="w-3.5 h-3.5" />
              {category.protocolLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted hidden sm:inline">
            {category.devices.filter(d => d.status === 'supported').length} Geräte
          </span>
          <ChevronDown
            className={`w-5 h-5 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      {open && (
        <div className="border-t border-border">
          <table className="w-full">
            <tbody>
              {category.devices.map((device) => (
                <tr key={device.name} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-3">
                    <span className="font-medium text-text-primary">{device.name}</span>
                    {device.description && (
                      <span className="block text-sm text-text-muted mt-0.5">{device.description}</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right whitespace-nowrap">
                    {device.status === 'supported' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green/10 text-green text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green" />
                        Unterstützt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                        Geplant
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export function Geraete() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-dark rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <p className="inline-block px-4 py-1.5 rounded-full bg-teal/15 text-teal text-sm font-medium mb-6">
              Kompatibilität
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Kompatible <span className="text-teal">Geräte</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Übersicht aller Geräte, die mit dem PowerShareHome Energy Management System verbunden werden können.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protokolle */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Unterstützte Protokolle
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {protocols.map(({ icon: Icon, name, desc }) => (
              <motion.div
                key={name}
                {...fadeIn}
                className="bg-bg-surface border border-border rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{name}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geräteliste */}
      <section className="py-16 md:py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">
              Geräteliste
            </h2>
            <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
              Alle Geräte, die derzeit unterstützt oder in Planung sind. Die Liste wird laufend erweitert.
            </p>
          </motion.div>
          <div className="space-y-4">
            {categories.map((cat) => (
              <DeviceCategoryCard key={cat.title} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Hinweis */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ihr Gerät ist nicht dabei?
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              Wir erweitern die Kompatibilität laufend. Kontaktieren Sie uns, wenn Sie ein bestimmtes
              Gerät einbinden möchten — wir prüfen die Anbindung gerne.
            </p>
            <a
              href="mailto:powersharehome-support@evn.at"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-dark transition-colors"
            >
              powersharehome-support@evn.at
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
