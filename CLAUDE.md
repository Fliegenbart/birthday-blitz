# Geschenke-Finder

Quiz-basierte Last-Minute Geschenke-App mit KI-Vorschlägen.

## Stack
- React + Vite
- Anthropic API (Claude) für Geschenkgenerierung
- Affiliate-Monetarisierung (Amazon, Etsy, Thomann, Douglas, Zalando)

## Projektstruktur
- `gift-finder.jsx` - Hauptkomponente mit Quiz, UI und API-Integration
- `affiliate-config.js` - Konfiguration für Affiliate-Links verschiedener Shops

## Features
- 5 Quiz-Fragen (Snack, Aktivität, Satz, Superkraft, Traumurlaub)
- Beziehungsauswahl (Partner, Eltern, Freund, Kollege)
- KI-generierte personalisierte Geschenkvorschläge
- Affiliate-Links zu Partner-Shops

## API
Die App nutzt die Anthropic Messages API mit Claude Sonnet. Der Prompt wird aus den Quiz-Antworten und der Beziehungsauswahl generiert.

## Affiliate Setup
Ersetze die Platzhalter in `affiliate-config.js`:
- `DEIN-AMAZON-TAG-21` - Amazon PartnerNet Tag
- `DEIN-ETSY-REF` - Etsy Affiliate Referenz
- `DEIN-THOMANN-ID` - Thomann Partner-ID
- `DEIN-DOUGLAS-ID` - Douglas Affiliate-ID
- `DEIN-ZALANDO-ID` - Zalando Partner-ID

## Kommende Features
- Budget-Slider
- Mehr Quiz-Fragen
- Favoritenliste
- Teilen-Funktion
