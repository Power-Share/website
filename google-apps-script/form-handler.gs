/**
 * Power Share FlexCo — Form & Newsletter Handler
 *
 * SETUP:
 * 1. Create a Google Sheet called "Power Share Inquiries"
 * 2. It will auto-create three tabs:
 *    - "Submissions" (contact form inquiries from main website)
 *    - "Newsletter" (newsletter signups from footer)
 *    - "Pölla-Anmeldungen" (PowerShareHome registrations from /poella2)
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
 * 2. Confirmation email sent to participant with link: endpoint?action=confirm&token=XYZ
 * 3. Participant clicks link → GET updates status to "bestätigt"
 * 4. Redirect to power-share.io/poella2?confirmed=1
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
        poellaSheet.getRange(1, 1, 1, 17).setValues([[
          'Zeitstempel', 'Name', 'E-Mail', 'Adresse', 'PLZ', 'Ort', 'Telefon',
          'Anlagen', 'PV-Marke', 'Speicher-Marke', 'Wallbox-Marke', 'Wärmepumpe-Marke',
          'Smart Meter', 'WLAN', 'Vertrag zugestimmt', 'Status', 'Token'
        ]]);
        poellaSheet.setFrozenRows(1);
        poellaSheet.getRange(1, 1, 1, 17).setFontWeight('bold');
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
        'ausstehend',
        token
      ]);

      // Send confirmation email to participant
      var confirmUrl = getPublicScriptUrl() + '?action=confirm&token=' + token;

      MailApp.sendEmail({
        to: data.email,
        replyTo: 'powersharehome-support@evn.at',
        name: 'PowerShareHome',
        subject: 'PowerShareHome — Bitte bestätigen Sie Ihre Anmeldung',
        htmlBody:
          '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
          '<h2 style="color: #1A2332;">PowerShareHome — Anmeldung bestätigen</h2>' +
          '<p>Guten Tag ' + (data.name || '') + ',</p>' +
          '<p>vielen Dank für Ihre Anmeldung zum Projekt PowerShareHome in der Energiegemeinschaft Pölla.</p>' +
          '<p>Bitte bestätigen Sie Ihre Anmeldung mit einem Klick auf den folgenden Link:</p>' +
          '<p style="margin: 24px 0;"><a href="' + confirmUrl + '" style="background: #0ABAB5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Anmeldung bestätigen</a></p>' +
          '<p style="font-size: 13px; color: #666;">Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>' +
          '<a href="' + confirmUrl + '">' + confirmUrl + '</a></p>' +
          '<hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">' +
          '<p><strong>Ihre Angaben:</strong></p>' +
          '<ul style="color: #444;">' +
          '<li>Name: ' + (data.name || '') + '</li>' +
          '<li>Adresse: ' + (data.address || '') + ', ' + (data.plz || '') + ' ' + (data.ort || '') + '</li>' +
          '<li>Anlagen: ' + (equipment || 'keine angegeben') + '</li>' +
          '</ul>' +
          '<p style="font-size: 13px; color: #666;">Bitte vergessen Sie nicht, die unterschriebene ' +
          '<a href="' + SITE_URL + '/docs/vollmacht-smart-meter-schluessel.pdf">Vollmacht für den Smart-Meter-Schlüssel</a> ' +
          'per E-Mail an <a href="mailto:powersharehome-support@evn.at">powersharehome-support@evn.at</a> zu senden.</p>' +
          '<hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">' +
          '<p style="font-size: 12px; color: #999;">Power Share FlexCo · Berggasse 5 · 1090 Wien<br>' +
          'FN 688982 i · ATU83693647 · <a href="mailto:hello@power-share.io">hello@power-share.io</a></p>' +
          '</div>'
      });

      // Notify team
      if (NOTIFY_EMAIL) {
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          'Neue Pölla-Anmeldung (ausstehend): ' + (data.name || data.email),
          'Neue PowerShareHome Anmeldung (Bestätigung ausstehend):\n\n' +
          'Name: ' + (data.name || '') + '\n' +
          'E-Mail: ' + (data.email || '') + '\n' +
          'Adresse: ' + (data.address || '') + ', ' + (data.plz || '') + ' ' + (data.ort || '') + '\n' +
          'Telefon: ' + (data.phone || '–') + '\n' +
          'Anlagen: ' + (equipment || 'keine') + '\n' +
          'Smart Meter: ' + (data.smartMeter || '–') + '\n' +
          'WLAN: ' + (data.wlan || '–') + '\n' +
          'Vertrag zugestimmt: ' + (data.acceptContract ? 'Ja' : 'Nein') + '\n' +
          'Status: ausstehend (Bestätigungs-E-Mail gesendet)\n' +
          'Zeitpunkt: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'Alle Anmeldungen: ' + ss.getUrl()
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
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          'New newsletter signup: ' + data.email,
          'New newsletter subscription:\n\n' +
          'Email: ' + data.email + '\n' +
          'Time: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'View all: ' + ss.getUrl()
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
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          'New Power Share inquiry from ' + (data.name || data.email),
          'New inquiry received:\n\n' +
          'Name: ' + (data.name || 'Not provided') + '\n' +
          'Email: ' + data.email + '\n' +
          'Role: ' + (data.role || 'Not specified') + '\n' +
          'Time: ' + new Date().toLocaleString('de-AT') + '\n\n' +
          'View all: ' + ss.getUrl()
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

  // Email confirmation handler
  if (params.action === 'confirm' && params.token) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var poellaSheet = ss.getSheetByName('Pölla-Anmeldungen');

    if (poellaSheet) {
      var lastRow = poellaSheet.getLastRow();
      if (lastRow > 1) {
        // Token is in column 17
        var tokens = poellaSheet.getRange(2, 17, lastRow - 1, 1).getValues();
        for (var i = 0; i < tokens.length; i++) {
          if (tokens[i][0] === params.token) {
            var row = i + 2;
            var currentStatus = poellaSheet.getRange(row, 16).getValue();

            if (currentStatus === 'bestätigt') {
              // Already confirmed — redirect anyway
              return HtmlService.createHtmlOutput(
                '<html><head><meta http-equiv="refresh" content="0;url=' + SITE_URL + '/poella2?confirmed=already"></head>' +
                '<body>Bereits bestätigt. <a href="' + SITE_URL + '/poella2?confirmed=already">Weiter</a></body></html>'
              );
            }

            // Update status to confirmed
            poellaSheet.getRange(row, 16).setValue('bestätigt');

            // Get name and email for notification
            var confirmedName = poellaSheet.getRange(row, 2).getValue();
            var confirmedEmail = poellaSheet.getRange(row, 3).getValue();

            // Notify team
            if (NOTIFY_EMAIL) {
              MailApp.sendEmail(
                NOTIFY_EMAIL,
                'Pölla-Anmeldung BESTÄTIGT: ' + (confirmedName || confirmedEmail),
                'Die Anmeldung wurde per E-Mail bestätigt:\n\n' +
                'Name: ' + confirmedName + '\n' +
                'E-Mail: ' + confirmedEmail + '\n' +
                'Bestätigt am: ' + new Date().toLocaleString('de-AT') + '\n\n' +
                'Alle Anmeldungen: ' + ss.getUrl()
              );
            }

            // Redirect to success page
            return HtmlService.createHtmlOutput(
              '<html><head><meta http-equiv="refresh" content="0;url=' + SITE_URL + '/poella2?confirmed=1"></head>' +
              '<body>Bestätigt! <a href="' + SITE_URL + '/poella2?confirmed=1">Weiter</a></body></html>'
            );
          }
        }
      }
    }

    // Token not found
    return HtmlService.createHtmlOutput(
      '<html><head><meta http-equiv="refresh" content="0;url=' + SITE_URL + '/poella2?confirmed=invalid"></head>' +
      '<body>Ungültiger Link. <a href="' + SITE_URL + '/poella2">Weiter</a></body></html>'
    );
  }

  // Default health check
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Power Share FlexCo Form Handler' }))
    .setMimeType(ContentService.MimeType.JSON);
}
