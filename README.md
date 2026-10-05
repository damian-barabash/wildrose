# Wild Rose

Strona Fundacji Wild Rose. React 19 + Vite + TypeScript, hosting na GitHub Pages (`.github/workflows/deploy.yml`), backend na Supabase — do podłączenia.

```
npm install
npm run dev        # podgląd lokalny
npm run build      # dist/ + kopie index.html dla każdej trasy (scripts/postbuild.mjs)
npm run media      # media-src/*.jpg → public/img/*.webp
npm run brand      # brand/Wild-Rose-Logo-Propozycje.pdf (prezentacja 10 wariantów logo)
```

## Co gdzie jest

- `src/content/site.ts` — wszystkie teksty, numery telefonów, dane fundacji i flaga `DRAFT`.
- `src/styles/site.css` — cały wygląd; kolor przewodni to jedna zmienna `--rose`.
- `src/components/Logo.tsx` + `public/favicon.svg` — logo testowe, do podmiany po wyborze klienta.
- `src/lib/forms.ts` — wysyłka formularzy. Bez `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` formularze działają w trybie testowym i nic nie wysyłają (strona mówi o tym wprost).
- `brand/` — generator prezentacji logo, ikony SVG, kroje użyte w wariantach.

## Przed publikacją

- `DRAFT = false` w `src/content/site.ts` i usunięcie `<meta name="robots" content="noindex">` z `index.html`.
- Prawdziwe teksty, dane rejestrowe, numer konta, sprawozdania; sprawdzenie numerów pomocowych.
- Zdjęcia: obecne są tymczasowe (StockSnap, CC0 — lista w `scripts/media-credits.json`).
- Nowa trasa = wpis w `src/App.tsx` i w `scripts/postbuild.mjs`.
