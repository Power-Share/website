/**
 * Power Share FlexCo — Form & Newsletter Handler
 *
 * SETUP:
 * 1. Create a Google Sheet called "Power Share Inquiries"
 * 2. It will auto-create two tabs:
 *    - "Submissions" (contact form inquiries)
 *    - "Newsletter" (newsletter signups)
 * 3. Go to Extensions > Apps Script, paste this code, save
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL into .env as VITE_FORM_ENDPOINT
 *
 * IMPORTANT: After updating this code, create a NEW deployment
 * (don't edit the existing one) to get the changes live.
 */

var NOTIFY_EMAIL = 'hello@power-share.io';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'newsletter') {
      // Newsletter signup
      var nlSheet = ss.getSheetByName('Newsletter');
      if (!nlSheet) {
        nlSheet = ss.insertSheet('Newsletter');
        nlSheet.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Email', 'Source']]);
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
        subSheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Role', 'Source']]);
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

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Power Share FlexCo Form Handler' }))
    .setMimeType(ContentService.MimeType.JSON);
}
