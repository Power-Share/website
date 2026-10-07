export const translations: Record<'en' | 'de', Record<string, string>> = {
  en: {
    // Navigation
    'nav.howItWorks': 'How it works',
    'nav.savings': 'Savings',
    'nav.community': 'Community',
    'nav.utilities': 'Utilities',
    'nav.about': 'About',
    'nav.getStarted': 'Get started',

    // Hero
    'hero.badge': 'For energy communities',
    'hero.title1': 'See your',
    'hero.titleHighlight': 'energy',
    'hero.title2': 'Share the savings.',
    'hero.subtitle':
      'Power Share connects your solar panels, battery, and heat pump to your neighborhood. Together, you use more of what you generate \u2014 and earn from the flexibility you share.',
    'hero.cta1': 'Join your community',
    'hero.cta2': 'See how it works',
    'hero.dashboard.yourHome': 'Your Home',
    'hero.dashboard.live': 'Live',
    'hero.dashboard.energyToday': 'ENERGY TODAY',
    'hero.dashboard.production': 'Production',
    'hero.dashboard.consumption': 'Consumption',
    'hero.dashboard.generated': 'Generated',
    'hero.dashboard.battery': 'Battery',
    'hero.dashboard.shared': 'Shared',
    'hero.dashboard.communityRank': 'Community rank:',
    'hero.partners': 'Partnered with',

    // Pillars
    'pillars.title': 'Energy that works for you',
    'pillars.see.title': 'See Your Energy',
    'pillars.see.desc':
      'Real-time visualization of what your home generates, stores, and shares. No jargon, no hidden complexity.',
    'pillars.share.title': 'Share Flexibility',
    'pillars.share.desc':
      'Your battery, heat pump, and EV charger are assets. Offer their flexibility to the grid and earn from it.',
    'pillars.together.title': 'Stronger Together',
    'pillars.together.desc':
      "Energy communities pool resources. When your neighbor's solar peaks while your battery has room, everyone benefits.",

    // Savings
    'savings.title': 'See the difference',
    'savings.subtitle': 'How Power Share changes your monthly energy picture',
    'savings.without': 'Without Power Share',
    'savings.with': 'With Power Share',
    'savings.gridImport': 'Grid import',
    'savings.solarWasted': 'Solar wasted',
    'savings.selfConsumption': 'Self-consumption',
    'savings.flexRevenue': 'Flexibility revenue',
    'savings.savePerYear': 'Save \u20ac1,116/year',
    'savings.disclaimer':
      'Based on average household with 8kWp PV and home battery in Vienna.',

    // How it works
    'howItWorks.title': 'Up and running in 15 minutes',
    'howItWorks.subtitle':
      'No electrician needed. No Wi-Fi dependency. Just plug in and go.',
    'howItWorks.step1.title': 'Pair your devices',
    'howItWorks.step1.desc':
      'Plug in the Power Share gateway. It connects to your solar inverter, battery, and heat pump over Zigbee \u2014 no Wi-Fi needed.',
    'howItWorks.step2.title': 'Watch your energy flow',
    'howItWorks.step2.desc':
      "Open the app and see your home's energy story in real time. Generation, storage, consumption \u2014 all in one clear dashboard.",
    'howItWorks.step3.title': 'Earn automatically',
    'howItWorks.step3.desc':
      'Your flexibility is pooled with your community. Revenue from grid services flows back to you \u2014 tracked daily in the app.',
    'howItWorks.cta': 'See it in action',

    // Stats
    'stats.homes': 'Homes Connected',
    'stats.setupTime': 'Setup Time',
    'stats.shared': 'Shared Today',
    'stats.co2': 'CO\u2082 Avoided',
    'stats.earnings': 'Community Earnings',

    // Community
    'community.title': 'Built for energy communities',
    'community.subtitle':
      'Pool your neighborhood\u2019s energy. Share surplus. Earn together.',
    'community.feature1': 'Pool solar generation across members',
    'community.feature2': 'Fair allocation of shared energy',
    'community.feature3': 'Community-wide flexibility calendar',
    'community.feature4': 'Transparent earnings distribution',
    'community.feature5': 'Real-time community dashboard',
    'community.feature6': 'Automated regulatory compliance',
    'community.cta': 'Start your community',

    // Utilities
    'utilities.title': 'For Utilities & Aggregators',
    'utilities.subtitle': 'Confirmed flexibility, not promises.',
    'utilities.forecast.title': '24h Rolling Forecasts',
    'utilities.forecast.desc':
      'Asset-level and portfolio-level flexibility forecasts, continuously updated with weather and load pattern data.',
    'utilities.dispatch.title': 'Autonomous Dispatch',
    'utilities.dispatch.desc':
      'KERN selects assets, executes dispatch, and autonomously rebalances before deviations become critical.',
    'utilities.confirm.title': 'Real-Time Confirmation',
    'utilities.confirm.desc':
      'Every dispatch confirmed at asset level. Continuous comparison of actual state against bid commitments.',
    'utilities.fleet.title': 'Fleet Management',
    'utilities.fleet.desc':
      'Mixed portfolios of PV, batteries, heat pumps, and EV chargers \u2014 managed as one coherent fleet.',
    'utilities.cta': 'Schedule a technical demo',

    // CTA
    'cta.title': 'Your neighborhood is already sharing power.',
    'cta.subtitle':
      'Join households across Austria saving on energy and earning from flexibility.',
    'cta.name': 'Your name',
    'cta.email': 'Your email',
    'cta.role': 'I am a...',
    'cta.role1': 'Homeowner with solar',
    'cta.role2': 'Renter interested in community energy',
    'cta.role3': 'Community organizer',
    'cta.role4': 'Utility / Aggregator',
    'cta.role5': 'Just curious',
    'cta.submit': 'Request an offer',
    'cta.disclaimer': "We'll get back to you within one business day.",
    'cta.questions': 'Questions? Write to',
    'cta.successTitle': 'Thank you for your inquiry!',
    'cta.errorMsg': 'Something went wrong. Please try again or write to hello@power-share.io.',

    // About
    'about.title': 'About Power Share FlexCo',
    'about.desc':
      'We believe the energy transition happens at home. Power Share FlexCo builds the infrastructure that turns every household into an active participant \u2014 visible, connected, and fairly compensated.',
    'about.data.title': 'Your data, your control',
    'about.data.desc':
      'Transparent, auditable energy data. You decide what is shared, with whom, and on what terms.',
    'about.climate.title': 'Climate action at home',
    'about.climate.desc':
      'Every kilowatt-hour optimized is a step toward decarbonization. Your home becomes part of the solution.',
    'about.open.title': 'Open infrastructure',
    'about.open.desc':
      'Built on open standards (IEC, Zigbee). No vendor lock-in, no walled gardens.',

    // Aliases for component key patterns
    'stats.homesConnected': 'Homes Connected',
    'stats.sharedToday': 'Shared Today',
    'stats.co2Avoided': 'CO₂ Avoided',
    'stats.communityEarnings': 'Community Earnings',
    'utilities.cap1.title': '24h Rolling Forecasts',
    'utilities.cap1.desc': 'Asset-level and portfolio-level flexibility forecasts, continuously updated with weather and load pattern data.',
    'utilities.cap2.title': 'Autonomous Dispatch',
    'utilities.cap2.desc': 'KERN selects assets, executes dispatch, and autonomously rebalances before deviations become critical.',
    'utilities.cap3.title': 'Real-Time Confirmation',
    'utilities.cap3.desc': 'Every dispatch confirmed at asset level. Continuous comparison of actual state against bid commitments.',
    'utilities.cap4.title': 'Fleet Management',
    'utilities.cap4.desc': 'Mixed portfolios of PV, batteries, heat pumps, and EV chargers — managed as one coherent fleet.',
    'about.subtitle': 'We believe the energy transition happens at home. Power Share FlexCo builds the infrastructure that turns every household into an active participant — visible, connected, and fairly compensated.',
    'about.value1.title': 'Your data, your control',
    'about.value1.desc': 'Transparent, auditable energy data. You decide what is shared, with whom, and on what terms.',
    'about.value2.title': 'Climate action at home',
    'about.value2.desc': 'Every kilowatt-hour optimized is a step toward decarbonization. Your home becomes part of the solution.',
    'about.value3.title': 'Open infrastructure',
    'about.value3.desc': 'Built on open standards (IEC, Zigbee). No vendor lock-in, no walled gardens.',
    'savings.without.title': 'Without Power Share',
    'savings.without.monthlyBill': '€187',
    'savings.without.gridImport': 'Grid import: 420 kWh',
    'savings.without.solarWasted': 'Solar wasted: 38%',
    'savings.without.flexRevenue': 'Flexibility revenue: €0',
    'savings.with.title': 'With Power Share',
    'savings.with.monthlyBill': '€94',
    'savings.with.gridImport': 'Grid import: 185 kWh',
    'savings.with.selfConsumption': 'Self-consumption: 89%',
    'savings.with.flexRevenue': 'Flexibility revenue: +€32',
    'savings.badge': 'Save €1,116/year',
    'cta.form.name': 'Your name',
    'cta.form.email': 'Your email',
    'cta.form.role': 'I am a...',
    'cta.form.homeowner': 'Homeowner with solar',
    'cta.form.renter': 'Renter interested in community energy',
    'cta.form.organizer': 'Community organizer',
    'cta.form.utility': 'Utility / Aggregator',
    'cta.form.curious': 'Just curious',
    'cta.form.submit': "Request an offer",
    'cta.form.disclaimer': "We'll get back to you within one business day.",
    'cta.contact': 'Questions? Write to',
    'footer.howItWorks': 'How It Works',
    'footer.forCommunities': 'For Communities',
    'footer.forUtilities': 'For Utilities',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.emailPlaceholder': 'your@email.com',
    'footer.copyright': '© 2026 Power Share FlexCo. All rights reserved.',
    'footer.nlSuccess': 'You\'re subscribed!',

    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Stay updated on energy community news.',
    'footer.join': 'Join',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.imprint': 'Imprint',
    'footer.rights': 'All rights reserved.',
    'footer.tagline':
      'Turning homes into active participants in the energy transition.',
  },

  de: {
    // Navigation
    'nav.howItWorks': 'So funktioniert\u2019s',
    'nav.savings': 'Ersparnis',
    'nav.community': 'Gemeinschaft',
    'nav.utilities': 'Energieversorger',
    'nav.about': 'Über uns',
    'nav.getStarted': 'Jetzt starten',

    // Hero
    'hero.badge': 'F\u00fcr Energiegemeinschaften',
    'hero.title1': 'Deine',
    'hero.titleHighlight': 'Energie',
    'hero.title2': 'Sichtbar. Geteilt. Wertvoll.',
    'hero.subtitle':
      'Power Share verbindet deine Solaranlage, deinen Speicher und deine W\u00e4rmepumpe mit deiner Nachbarschaft. Gemeinsam nutzt ihr mehr von dem, was ihr erzeugt \u2014 und verdient an der Flexibilit\u00e4t, die ihr teilt.',
    'hero.cta1': 'Gemeinschaft beitreten',
    'hero.cta2': 'So funktioniert\u2019s',
    'hero.dashboard.yourHome': 'Dein Zuhause',
    'hero.dashboard.live': 'Live',
    'hero.dashboard.energyToday': 'ENERGIE HEUTE',
    'hero.dashboard.production': 'Erzeugung',
    'hero.dashboard.consumption': 'Verbrauch',
    'hero.dashboard.generated': 'Erzeugt',
    'hero.dashboard.battery': 'Batterie',
    'hero.dashboard.shared': 'Geteilt',
    'hero.dashboard.communityRank': 'Gemeinschaftsrang:',
    'hero.partners': 'Partner',

    // Pillars
    'pillars.title': 'Energie, die f\u00fcr dich arbeitet',
    'pillars.see.title': 'Deine Energie im Blick',
    'pillars.see.desc':
      'Echtzeit-Visualisierung, was dein Zuhause erzeugt, speichert und teilt. Kein Fachjargon, keine versteckte Komplexit\u00e4t.',
    'pillars.share.title': 'Flexibilit\u00e4t teilen',
    'pillars.share.desc':
      'Dein Speicher, deine W\u00e4rmepumpe und deine Wallbox sind wertvolle Assets. Biete ihre Flexibilit\u00e4t dem Netz an und verdiene damit.',
    'pillars.together.title': 'Gemeinsam st\u00e4rker',
    'pillars.together.desc':
      'Energiegemeinschaften b\u00fcndeln Ressourcen. Wenn die Solaranlage deines Nachbarn Spitzen liefert und dein Speicher noch Platz hat, profitieren alle.',

    // Savings
    'savings.title': 'Sieh den Unterschied',
    'savings.subtitle':
      'So ver\u00e4ndert Power Share dein monatliches Energiebild',
    'savings.without': 'Ohne Power Share',
    'savings.with': 'Mit Power Share',
    'savings.gridImport': 'Netzbezug',
    'savings.solarWasted': 'Solar verschwendet',
    'savings.selfConsumption': 'Eigenverbrauch',
    'savings.flexRevenue': 'Flexibilit\u00e4tserl\u00f6se',
    'savings.savePerYear': 'Spare \u20ac1.116/Jahr',
    'savings.disclaimer':
      'Basierend auf einem durchschnittlichen Haushalt mit 8kWp PV und Heimspeicher in Wien.',

    // How it works
    'howItWorks.title': 'In 15 Minuten startklar',
    'howItWorks.subtitle':
      'Kein Elektriker n\u00f6tig. Keine WLAN-Abh\u00e4ngigkeit. Einfach einstecken und los.',
    'howItWorks.step1.title': 'Ger\u00e4te verbinden',
    'howItWorks.step1.desc':
      'Schlie\u00df das Power Share Gateway an. Es verbindet sich \u00fcber Zigbee mit deinem Wechselrichter, Speicher und deiner W\u00e4rmepumpe \u2014 ganz ohne WLAN.',
    'howItWorks.step2.title': 'Energiefluss beobachten',
    'howItWorks.step2.desc':
      '\u00d6ffne die App und sieh die Energiegeschichte deines Zuhauses in Echtzeit. Erzeugung, Speicherung, Verbrauch \u2014 alles in einem \u00fcbersichtlichen Dashboard.',
    'howItWorks.step3.title': 'Automatisch verdienen',
    'howItWorks.step3.desc':
      'Deine Flexibilit\u00e4t wird mit deiner Gemeinschaft geb\u00fcndelt. Erl\u00f6se aus Netzdienstleistungen flie\u00dfen direkt an dich zur\u00fcck \u2014 t\u00e4glich in der App nachverfolgbar.',
    'howItWorks.cta': 'In Aktion sehen',

    // Stats
    'stats.homes': 'Verbundene Haushalte',
    'stats.setupTime': 'Einrichtungszeit',
    'stats.shared': 'Heute geteilt',
    'stats.co2': 'CO\u2082 vermieden',
    'stats.earnings': 'Gemeinschaftserl\u00f6se',

    // Community
    'community.title': 'F\u00fcr Energiegemeinschaften gebaut',
    'community.subtitle':
      'B\u00fcndle die Energie deiner Nachbarschaft. Teile \u00dcbersch\u00fcsse. Verdient gemeinsam.',
    'community.feature1': 'Solarproduktion unter Mitgliedern b\u00fcndeln',
    'community.feature2': 'Faire Aufteilung geteilter Energie',
    'community.feature3': 'Gemeinschaftsweiter Flexibilit\u00e4tskalender',
    'community.feature4': 'Transparente Erl\u00f6sverteilung',
    'community.feature5': 'Echtzeit-Community-Dashboard',
    'community.feature6': 'Automatische regulatorische Konformit\u00e4t',
    'community.cta': 'Starte deine Gemeinschaft',

    // Utilities
    'utilities.title': 'F\u00fcr Energieversorger & Aggregatoren',
    'utilities.subtitle': 'Best\u00e4tigte Flexibilit\u00e4t, keine Versprechen.',
    'utilities.forecast.title': '24h rollierende Prognosen',
    'utilities.forecast.desc':
      'Flexibilit\u00e4tsprognosen auf Asset- und Portfolioebene, laufend aktualisiert mit Wetter- und Lastprofildaten.',
    'utilities.dispatch.title': 'Autonomer Dispatch',
    'utilities.dispatch.desc':
      'KERN w\u00e4hlt Assets aus, f\u00fchrt den Dispatch durch und balanciert autonom nach, bevor Abweichungen kritisch werden.',
    'utilities.confirm.title': 'Echtzeit-Best\u00e4tigung',
    'utilities.confirm.desc':
      'Jeder Dispatch wird auf Asset-Ebene best\u00e4tigt. Kontinuierlicher Abgleich des Ist-Zustands mit den Gebotsverpflichtungen.',
    'utilities.fleet.title': 'Flottenmanagement',
    'utilities.fleet.desc':
      'Gemischte Portfolios aus PV, Speichern, W\u00e4rmepumpen und Wallboxen \u2014 verwaltet als eine koh\u00e4rente Flotte.',
    'utilities.cta': 'Technische Demo vereinbaren',

    // CTA
    'cta.title': 'Deine Nachbarschaft teilt bereits Energie.',
    'cta.subtitle':
      'Werde Teil der wachsenden Gemeinschaft, die Energie spart und mit Flexibilit\u00e4t verdient.',
    'cta.name': 'Dein Name',
    'cta.email': 'Deine E-Mail',
    'cta.role': 'Ich bin...',
    'cta.role1': 'Hausbesitzer mit Solaranlage',
    'cta.role2': 'Mieter mit Interesse an Gemeinschaftsenergie',
    'cta.role3': 'Gemeinschaftsorganisator',
    'cta.role4': 'Energieversorger / Aggregator',
    'cta.role5': 'Einfach neugierig',
    'cta.submit': 'Angebot anfragen',
    'cta.disclaimer': 'Wir melden uns innerhalb eines Werktages bei dir.',
    'cta.questions': 'Fragen? Schreib an',
    'cta.successTitle': 'Danke für deine Anfrage!',
    'cta.errorMsg': 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib an hello@power-share.io.',

    // About
    'about.title': '\u00dcber Power Share FlexCo',
    'about.desc':
      'Wir glauben, dass die Energiewende zu Hause beginnt. Power Share FlexCo baut die Infrastruktur, die jeden Haushalt zum aktiven Teilnehmer macht \u2014 sichtbar, vernetzt und fair verg\u00fctet.',
    'about.data.title': 'Deine Daten, deine Kontrolle',
    'about.data.desc':
      'Transparente, pr\u00fcfbare Energiedaten. Du entscheidest, was geteilt wird, mit wem und zu welchen Bedingungen.',
    'about.climate.title': 'Klimaschutz zu Hause',
    'about.climate.desc':
      'Jede optimierte Kilowattstunde ist ein Schritt in Richtung Dekarbonisierung. Dein Zuhause wird Teil der L\u00f6sung.',
    'about.open.title': 'Offene Infrastruktur',
    'about.open.desc':
      'Gebaut auf offenen Standards (IEC, Zigbee). Kein Vendor Lock-in, keine geschlossenen Systeme.',

    // Aliases for component key patterns
    'stats.homesConnected': 'Verbundene Haushalte',
    'stats.sharedToday': 'Heute geteilt',
    'stats.co2Avoided': 'CO₂ vermieden',
    'stats.communityEarnings': 'Gemeinschaftserlöse',
    'utilities.cap1.title': '24h rollierende Prognosen',
    'utilities.cap1.desc': 'Flexibilitätsprognosen auf Asset- und Portfolioebene, laufend aktualisiert mit Wetter- und Lastprofildaten.',
    'utilities.cap2.title': 'Autonomer Dispatch',
    'utilities.cap2.desc': 'KERN wählt Assets aus, führt den Dispatch durch und balanciert autonom nach, bevor Abweichungen kritisch werden.',
    'utilities.cap3.title': 'Echtzeit-Bestätigung',
    'utilities.cap3.desc': 'Jeder Dispatch wird auf Asset-Ebene bestätigt. Kontinuierlicher Abgleich des Ist-Zustands mit den Gebotsverpflichtungen.',
    'utilities.cap4.title': 'Flottenmanagement',
    'utilities.cap4.desc': 'Gemischte Portfolios aus PV, Speichern, Wärmepumpen und Wallboxen — verwaltet als eine kohärente Flotte.',
    'about.subtitle': 'Wir glauben, dass die Energiewende zu Hause beginnt. Power Share FlexCo baut die Infrastruktur, die jeden Haushalt zum aktiven Teilnehmer macht — sichtbar, vernetzt und fair vergütet.',
    'about.value1.title': 'Deine Daten, deine Kontrolle',
    'about.value1.desc': 'Transparente, prüfbare Energiedaten. Du entscheidest, was geteilt wird, mit wem und zu welchen Bedingungen.',
    'about.value2.title': 'Klimaschutz zu Hause',
    'about.value2.desc': 'Jede optimierte Kilowattstunde ist ein Schritt in Richtung Dekarbonisierung. Dein Zuhause wird Teil der Lösung.',
    'about.value3.title': 'Offene Infrastruktur',
    'about.value3.desc': 'Gebaut auf offenen Standards (IEC, Zigbee). Kein Vendor Lock-in, keine geschlossenen Systeme.',
    'savings.without.title': 'Ohne Power Share',
    'savings.without.monthlyBill': '€187',
    'savings.without.gridImport': 'Netzbezug: 420 kWh',
    'savings.without.solarWasted': 'Solar verschwendet: 38%',
    'savings.without.flexRevenue': 'Flexibilitätserlöse: €0',
    'savings.with.title': 'Mit Power Share',
    'savings.with.monthlyBill': '€94',
    'savings.with.gridImport': 'Netzbezug: 185 kWh',
    'savings.with.selfConsumption': 'Eigenverbrauch: 89%',
    'savings.with.flexRevenue': 'Flexibilitätserlöse: +€32',
    'savings.badge': 'Spare €1.116/Jahr',
    'cta.form.name': 'Dein Name',
    'cta.form.email': 'Deine E-Mail',
    'cta.form.role': 'Ich bin...',
    'cta.form.homeowner': 'Hausbesitzer mit Solaranlage',
    'cta.form.renter': 'Mieter mit Interesse an Gemeinschaftsenergie',
    'cta.form.organizer': 'Gemeinschaftsorganisator',
    'cta.form.utility': 'Energieversorger / Aggregator',
    'cta.form.curious': 'Einfach neugierig',
    'cta.form.submit': 'Angebot anfragen',
    'cta.form.disclaimer': 'Wir melden uns innerhalb eines Werktages bei dir.',
    'cta.contact': 'Fragen? Schreib an',
    'footer.howItWorks': 'So funktioniert\'s',
    'footer.forCommunities': 'Für Gemeinschaften',
    'footer.forUtilities': 'Für Versorger',
    'footer.about': 'Über uns',
    'footer.contact': 'Kontakt',
    'footer.careers': 'Karriere',
    'footer.emailPlaceholder': 'deine@email.at',
    'footer.copyright': '© 2026 Power Share FlexCo. Alle Rechte vorbehalten.',
    'footer.nlSuccess': 'Du bist angemeldet!',

    // Footer
    'footer.product': 'Produkt',
    'footer.company': 'Unternehmen',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc':
      'Bleib \u00fcber Neuigkeiten zu Energiegemeinschaften informiert.',
    'footer.join': 'Anmelden',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.imprint': 'Impressum',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.tagline':
      'Wir machen Haushalte zu aktiven Teilnehmern der Energiewende.',
  },
};
