/**
 * Power Share FlexCo — Form & Newsletter Handler
 *
 * SETUP:
 * 1. Create a Google Sheet called "Power Share Inquiries"
 * 2. It will auto-create three tabs:
 *    - "Submissions" (contact form inquiries from main website)
 *    - "Newsletter" (newsletter signups from footer)
 *    - "Pölla-Anmeldungen" (PowerShareHome registrations from /poella)
 * 3. Go to Extensions > Apps Script, paste this code, save
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL into .env as PUBLIC_FORM_ENDPOINT
 *
 * IMPORTANT: After updating this code, create a NEW deployment
 * (don't edit the existing one) to get the changes live.
 *
 * FORM TYPES:
 * - type: "newsletter"            → Newsletter tab (email, source)
 * - type: "poella-registration"   → Pölla-Anmeldungen tab (full registration + email confirmation)
 * - (no type / other)             → Submissions tab (name, email, role)
 *
 * CONFIRMATION FLOW (Pölla):
 * 1. POST with registration data → saves row with status "ausstehend" + token
 * 2. Confirmation email sent automatically to participant with link: endpoint?action=confirm&token=XYZ
 * 3. Team receives notification email
 * 4. Participant clicks confirmation link → GET updates status to "bestätigt"
 * 5. Team receives confirmation notification
 * 6. Redirect to power-share.io/poella?confirmed=1
 */

var NOTIFY_EMAIL = 'hello@power-share.io';
var SITE_URL = 'https://power-share.io';
// SCRIPT_URL is built dynamically from ScriptApp to avoid updating on each deployment.
// The /a/DOMAIN/ prefix is stripped to produce a public URL that works for external users.
function getPublicScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  // Remove workspace domain prefix: /a/power-share.io/
  return url.replace(/\/a\/[^/]+\//, '/');
}

function generateToken() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  for (var i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'poella-registration') {
      // Pölla PowerShareHome registration with email confirmation
      var poellaSheet = ss.getSheetByName('Pölla-Anmeldungen');
      if (!poellaSheet) {
        poellaSheet = ss.insertSheet('Pölla-Anmeldungen');
        poellaSheet.getRange(1, 1, 1, 20).setValues([[
          'Zeitstempel', 'Name', 'E-Mail', 'Adresse', 'PLZ', 'Ort', 'Telefon',
          'Anlagen', 'PV-Marke', 'Speicher-Marke', 'Wallbox-Marke', 'Wärmepumpe-Marke',
          'Smart Meter', 'WLAN',
          'Vertrag', 'Leistungsbeschreibung', 'Datenschutz', 'EVN Services',
          'Status', 'Token'
        ]]);
        poellaSheet.setFrozenRows(1);
        poellaSheet.getRange(1, 1, 1, 20).setFontWeight('bold');
      }

      // Check for duplicate email
      var lastRow = poellaSheet.getLastRow();
      if (lastRow > 1) {
        var existingEmails = poellaSheet.getRange(2, 3, lastRow - 1, 1).getValues();
        for (var i = 0; i < existingEmails.length; i++) {
          if (existingEmails[i][0] === data.email) {
            return ContentService
              .createTextOutput(JSON.stringify({ status: 'duplicate', message: 'E-Mail bereits registriert' }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      }

      var token = generateToken();
      var equipment = (data.equipment || []).join(', ');
      var brands = data.brands || {};

      poellaSheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.address || '',
        data.plz || '',
        data.ort || '',
        data.phone || '',
        equipment,
        brands.pv || '',
        brands.battery || '',
        brands.wallbox || '',
        brands.heatpump || '',
        data.smartMeter || '',
        data.wlan || '',
        data.acceptContract ? 'Ja' : 'Nein',
        data.acceptLeistung ? 'Ja' : 'Nein',
        data.acceptDatenschutz ? 'Ja' : 'Nein',
        data.acceptEvnServices ? 'Ja' : 'Nein',
        'ausstehend',
        token
      ]);

      // Send confirmation email to participant via GmailApp
      var confirmUrl = SITE_URL + '/poella?confirm_token=' + token;
      var plainBody =
        'Hallo ' + (data.name || '') + ',\n\n' +
        'vielen Dank für deine Anmeldung bei PowerShareHome!\n\n' +
        'Bitte bestätige deine E-Mail-Adresse mit diesem Link:\n' + confirmUrl + '\n\n' +
        'Nach erfolgreicher Bestätigung melden wir uns bei dir mit allen weiteren Informationen zum Installationsablauf.\n\n' +
        'Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.\n\n' +
        'Liebe Grüße,\nDein Power Share Team';
      var htmlBody =
        '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
        '<h2>Hallo ' + (data.name || '') + ',</h2>' +
        '<p>vielen Dank für deine Anmeldung bei PowerShareHome!</p>' +
        '<p>Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Button klickst:</p>' +
        '<p style="text-align:center;margin:30px 0">' +
        '<a href="' + confirmUrl + '" style="background:#16a34a;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-size:16px">Anmeldung bestätigen</a>' +
        '</p>' +
        '<p>Oder kopiere diesen Link in deinen Browser:<br>' +
        '<a href="' + confirmUrl + '">' + confirmUrl + '</a></p>' +
        '<p>Nach erfolgreicher Bestätigung melden wir uns bei dir mit allen weiteren Informationen zum Installationsablauf.</p>' +
        '<p>Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.</p>' +
        '<p>Liebe Grüße,<br>Dein Power Share Team</p>' +
        '</div>';
      GmailApp.sendEmail(data.email,
        'Bitte bestätige deine Anmeldung bei PowerShareHome',
        plainBody,
        { htmlBody: htmlBody, name: 'Power Share', from: NOTIFY_EMAIL, replyTo: NOTIFY_EMAIL }
      );

      // Notify team
      if (NOTIFY_EMAIL) {
        GmailApp.sendEmail(
          NOTIFY_EMAIL,
          'Neue Pölla-Anmeldung: ' + (data.name || data.email),
          'Neue PowerShareHome Anmeldung:\n\n' +
          'Name: ' + (data.name || '') + '\n' +
          'E-Mail: ' + (data.email || '') + '\n' +
          'Adresse: ' + (data.address || '') + ', ' + (data.plz || '') + ' ' + (data.ort || '') + '\n' +
          'Telefon: ' + (data.phone || '–') + '\n' +
          'Anlagen: ' + (equipment || 'keine') + '\n' +
          'Smart Meter: ' + (data.smartMeter || '–') + '\n' +
          'WLAN: ' + (data.wlan || '–') + '\n' +
          'Vertrag zugestimmt: ' + (data.acceptContract ? 'Ja' : 'Nein') + '\n' +
          'Status: ausstehend (Bestätigungs-Mail gesendet)\n' +
          'Zeitpunkt: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'Alle Anmeldungen: ' + ss.getUrl(),
          { from: NOTIFY_EMAIL, name: 'Power Share' }
        );
      }

    } else if (data.type === 'newsletter') {
      // Newsletter signup
      var nlSheet = ss.getSheetByName('Newsletter');
      if (!nlSheet) {
        nlSheet = ss.insertSheet('Newsletter');
        nlSheet.getRange(1, 1, 1, 3).setValues([['Zeitstempel', 'E-Mail', 'Quelle']]);
        nlSheet.setFrozenRows(1);
        nlSheet.getRange(1, 1, 1, 3).setFontWeight('bold');
      }

      // Check for duplicate
      var emails = nlSheet.getRange(2, 2, Math.max(nlSheet.getLastRow() - 1, 1), 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (emails[i][0] === data.email) {
          return ContentService
            .createTextOutput(JSON.stringify({ status: 'duplicate' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      nlSheet.appendRow([
        new Date().toISOString(),
        data.email || '',
        data.source || 'website-footer'
      ]);

      if (NOTIFY_EMAIL) {
        GmailApp.sendEmail(
          NOTIFY_EMAIL,
          'New newsletter signup: ' + data.email,
          'New newsletter subscription:\n\n' +
          'Email: ' + data.email + '\n' +
          'Time: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'View all: ' + ss.getUrl(),
          { from: NOTIFY_EMAIL, name: 'Power Share' }
        );
      }

    } else {
      // Contact form inquiry
      var subSheet = ss.getSheetByName('Submissions');
      if (!subSheet) {
        subSheet = ss.getActiveSheet();
        subSheet.setName('Submissions');
        subSheet.getRange(1, 1, 1, 5).setValues([['Zeitstempel', 'Name', 'E-Mail', 'Rolle', 'Quelle']]);
        subSheet.setFrozenRows(1);
        subSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      }

      subSheet.appendRow([
        new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.role || '',
        data.source || 'website'
      ]);

      if (NOTIFY_EMAIL && data.email) {
        GmailApp.sendEmail(
          NOTIFY_EMAIL,
          'New Power Share inquiry from ' + (data.name || data.email),
          'New inquiry received:\n\n' +
          'Name: ' + (data.name || 'Not provided') + '\n' +
          'Email: ' + data.email + '\n' +
          'Role: ' + (data.role || 'Not specified') + '\n' +
          'Time: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'View all: ' + ss.getUrl(),
          { from: NOTIFY_EMAIL, name: 'Power Share' }
        );
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var params = e ? e.parameter : {};

  // Email confirmation handler (called via fetch from the website)
  if (params.action === 'confirm' && params.token) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var poellaSheet = ss.getSheetByName('Pölla-Anmeldungen');

    if (poellaSheet) {
      var lastRow = poellaSheet.getLastRow();
      if (lastRow > 1) {
        // Token is in column 20, Status in column 19
        var tokens = poellaSheet.getRange(2, 20, lastRow - 1, 1).getValues();
        for (var i = 0; i < tokens.length; i++) {
          if (tokens[i][0] === params.token) {
            var row = i + 2;
            var currentStatus = poellaSheet.getRange(row, 19).getValue();

            if (currentStatus === 'bestätigt') {
              return ContentService
                .createTextOutput(JSON.stringify({ status: 'already' }))
                .setMimeType(ContentService.MimeType.JSON);
            }

            // Update status to confirmed
            poellaSheet.getRange(row, 19).setValue('bestätigt');

            // Get name and email for notification
            var confirmedName = poellaSheet.getRange(row, 2).getValue();
            var confirmedEmail = poellaSheet.getRange(row, 3).getValue();

            // Notify team
            if (NOTIFY_EMAIL) {
              GmailApp.sendEmail(
                NOTIFY_EMAIL,
                'Pölla-Anmeldung BESTÄTIGT: ' + (confirmedName || confirmedEmail),
                'Die Anmeldung wurde per E-Mail bestätigt:\n\n' +
                'Name: ' + confirmedName + '\n' +
                'E-Mail: ' + confirmedEmail + '\n' +
                'Bestätigt am: ' + new Date().toLocaleString('de-AT') + '\n\n' +
                'Alle Anmeldungen: ' + ss.getUrl(),
                { from: NOTIFY_EMAIL, name: 'Power Share' }
              );
            }

            return ContentService
              .createTextOutput(JSON.stringify({ status: 'confirmed' }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
    }

    // Token not found
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'invalid' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Default health check
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Power Share FlexCo Form Handler' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Manually run this function to send confirmation emails to existing
 * registrations that have no token yet.
 *
 * In Apps Script Editor: select "resendMissingConfirmations" from the
 * function dropdown, then click ▶ Run.
 */
function resendMissingConfirmations() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Pölla-Anmeldungen');
  if (!sheet) { Logger.log('Sheet not found'); return; }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) { Logger.log('No data rows'); return; }

  var data = sheet.getRange(2, 1, lastRow - 1, 20).getValues();
  var sent = 0;

  for (var i = 0; i < data.length; i++) {
    var row = i + 2;
    var name = data[i][1];   // column B
    var email = data[i][2];  // column C
    var status = data[i][18]; // column S (19)
    var token = data[i][19];  // column T (20)

    // Skip rows that already have a token or are already confirmed
    if (token || status === 'bestätigt') continue;
    if (!email) continue;

    // Generate token and save it
    var newToken = generateToken();
    sheet.getRange(row, 20).setValue(newToken);
    sheet.getRange(row, 19).setValue('ausstehend');

    // Send confirmation email
    var confirmUrl = SITE_URL + '/poella?confirm_token=' + newToken;
    var plainBody =
      'Hallo ' + (name || '') + ',\n\n' +
      'vielen Dank für deine Anmeldung bei PowerShareHome!\n\n' +
      'Bitte bestätige deine E-Mail-Adresse mit diesem Link:\n' + confirmUrl + '\n\n' +
      'Nach erfolgreicher Bestätigung melden wir uns bei dir mit allen weiteren Informationen zum Installationsablauf.\n\n' +
      'Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.\n\n' +
      'Liebe Grüße,\nDein Power Share Team';
    var htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">' +
      '<h2>Hallo ' + (name || '') + ',</h2>' +
      '<p>vielen Dank für deine Anmeldung bei PowerShareHome!</p>' +
      '<p>Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Button klickst:</p>' +
      '<p style="text-align:center;margin:30px 0">' +
      '<a href="' + confirmUrl + '" style="background:#16a34a;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-size:16px">Anmeldung bestätigen</a>' +
      '</p>' +
      '<p>Oder kopiere diesen Link in deinen Browser:<br>' +
      '<a href="' + confirmUrl + '">' + confirmUrl + '</a></p>' +
      '<p>Nach erfolgreicher Bestätigung melden wir uns bei dir mit allen weiteren Informationen zum Installationsablauf.</p>' +
      '<p>Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.</p>' +
      '<p>Liebe Grüße,<br>Dein Power Share Team</p>' +
      '</div>';

    GmailApp.sendEmail(email,
      'Bitte bestätige deine Anmeldung bei PowerShareHome',
      plainBody,
      { htmlBody: htmlBody, name: 'Power Share', from: NOTIFY_EMAIL, replyTo: NOTIFY_EMAIL }
    );

    sent++;
    Logger.log('Sent to: ' + email);
  }

  Logger.log('Done. Sent ' + sent + ' confirmation emails.');
}
