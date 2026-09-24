# Bellamonde at Vanvivaha — registration page

Single-file, mobile-first page (`index.html`) opened from the QR code at the
Bellamonde booth at Vanvivaha (24 & 25 September). Two registration forms:

- **Couples:** name, phone, function type (Wedding / Ring Ceremony / Reception / Other + text), approx gathering
- **Vendors:** name, phone, vendor type (list + Other text)

## Collecting the data (Google Sheets, free)

1. Create a Google Sheet → **Extensions → Apps Script** → paste `apps-script.gs` → Save.
2. **Deploy → New deployment → Web app** — Execute as **Me**, access **Anyone** → Deploy, authorize.
3. Copy the Web app URL into `SHEET_ENDPOINT` near the bottom of `index.html`.

Registrations then land in two tabs, **Couples** and **Vendors**.

Until the URL is set, the page runs in demo mode: submissions are saved only in
the visitor's browser and the success screen says so.

## Going live

1. Host `index.html` anywhere static (Netlify Drop is fastest: drag the folder in).
2. Submit one test registration from your own phone and confirm it appears in the Sheet.
3. Generate the QR code from the live URL and test-scan it before printing.
