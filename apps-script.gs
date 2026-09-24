/**
 * Vanvivaha registrations → Google Sheet
 *
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 * 2. Deploy → New deployment → Web app.
 *    Execute as: Me   |   Who has access: Anyone
 * 3. Copy the Web app URL into SHEET_ENDPOINT in index.html.
 *
 * Couples and vendors go to separate tabs, created automatically.
 */
const HEADERS = {
  Couples: ["Submitted At", "Name", "Phone", "Function Type", "Approx Gathering"],
  Vendors: ["Submitted At", "Name", "Phone", "Vendor Type"],
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter;
    const tab = p.type === "vendor" ? "Vendors" : "Couples";
    const sheet = getSheet_(tab);
    const clean = (v) => String(v || "").slice(0, 200).replace(/^[=+\-@]/, "'$&"); // block formula injection

    const row = tab === "Couples"
      ? [new Date(), clean(p.name), clean(p.phone), clean(p.functionType), clean(p.guests)]
      : [new Date(), clean(p.name), clean(p.phone), clean(p.vendorType)];

    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS[name]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS[name].length).setFontWeight("bold");
  }
  return sheet;
}
