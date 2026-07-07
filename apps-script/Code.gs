/**
 * BNI MASTER website content API — Google Apps Script
 *
 * Lives inside the "BNI MASTER Website" Google Sheet (Extensions → Apps Script).
 * - setup(): run ONCE — builds all tabs pre-filled with the site's current
 *   content, creates the slideshow Drive folder, generates the API token.
 * - doGet(): serves sheet content as JSON to the website.
 * - doPost(): receives booking requests → appends to Bookings + emails admin.
 *
 * Handover = share this spreadsheet (and the slideshow folder) with the next
 * admin. Nothing else to transfer.
 */

var BOOTSTRAP_URL = "https://www.bnimaster.com/content-bootstrap.json";

var MEMBER_COLUMNS = [
  "slug", "visible", "name", "shortName", "jobTitle_vi", "company",
  "industry_vi", "founded", "phone", "email", "tagline_vi",
  "about_vi", "business_vi", "journey_vi", "achievements_vi",
  "vision_vi", "philosophy_vi", "customers_vi", "referrals_vi",
  "profilePhoto", "logoPhoto",
  "businessPhoto1", "businessPhoto2", "businessPhoto3", "businessPhoto4"
];

var BOOKING_COLUMNS = ["Thời gian", "Họ tên", "Điện thoại", "Email", "Công ty", "Ngành nghề", "Lời nhắn", "Ngôn ngữ", "Trạng thái"];

/** Run once after pasting this script. Safe to re-run: only fills what's missing. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var boot = JSON.parse(UrlFetchApp.fetch(BOOTSTRAP_URL).getContentText());

  // --- Config tab ---
  var config = getOrCreateSheet_(ss, "Config");
  if (config.getLastRow() < 2) {
    var token = Utilities.getUuid().replace(/-/g, "");
    var folder = DriveApp.createFolder("BNI Website Slideshow");
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    config.getRange(1, 1, 5, 2).setValues([
      ["Cài đặt", "Giá trị"],
      ["api_token", token],
      ["slideshow_folder_id", folder.getId()],
      ["notify_email", Session.getActiveUser().getEmail()],
      ["HƯỚNG DẪN", "Thả ảnh vào thư mục 'BNI Website Slideshow' trong Drive để đổi ảnh nền trang chủ. Đổi notify_email để nhận thông báo đăng ký tham dự."]
    ]);
    config.setColumnWidths(1, 2, 320);
    config.getRange("A1:B1").setFontWeight("bold");
  }

  // --- HomeTexts tab ---
  var texts = getOrCreateSheet_(ss, "HomeTexts");
  if (texts.getLastRow() < 2) {
    var tRows = [["key", "vi", "en"]];
    boot.texts.forEach(function (t) { tRows.push([t.key, t.vi, t.en]); });
    texts.getRange(1, 1, tRows.length, 3).setValues(tRows);
    texts.getRange("A1:C1").setFontWeight("bold");
    texts.setColumnWidth(2, 420).setColumnWidth(3, 420);
  }

  // --- Stats tab ---
  var stats = getOrCreateSheet_(ss, "Stats");
  if (stats.getLastRow() < 2) {
    var sRows = [["value", "label_vi", "label_en"]];
    boot.stats.forEach(function (s) { sRows.push([s.value, s.label_vi, s.label_en]); });
    stats.getRange(1, 1, sRows.length, 3).setValues(sRows);
    stats.getRange("A1:C1").setFontWeight("bold");
    stats.setColumnWidth(2, 260).setColumnWidth(3, 260);
  }

  // --- Members tab ---
  var members = getOrCreateSheet_(ss, "Members");
  if (members.getLastRow() < 2) {
    var mRows = [MEMBER_COLUMNS];
    boot.members.forEach(function (m) {
      mRows.push(MEMBER_COLUMNS.map(function (c) { return m[c] || ""; }));
    });
    members.getRange(1, 1, mRows.length, MEMBER_COLUMNS.length).setValues(mRows);
    members.getRange(1, 1, 1, MEMBER_COLUMNS.length).setFontWeight("bold");
    members.setFrozenRows(1);
    members.setFrozenColumns(3);
  }

  // --- Bookings tab ---
  var bookings = getOrCreateSheet_(ss, "Bookings");
  if (bookings.getLastRow() < 1) {
    bookings.getRange(1, 1, 1, BOOKING_COLUMNS.length).setValues([BOOKING_COLUMNS]);
    bookings.getRange(1, 1, 1, BOOKING_COLUMNS.length).setFontWeight("bold");
    bookings.setFrozenRows(1);
  }

  // Remove the default empty sheet if present
  var s1 = ss.getSheetByName("Sheet1") || ss.getSheetByName("Trang tính1");
  if (s1 && ss.getSheets().length > 1 && s1.getLastRow() === 0) ss.deleteSheet(s1);
}

function doGet(e) {
  if (!checkToken_(e && e.parameter && e.parameter.token)) return jsonOut_({ error: "unauthorized" });
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return jsonOut_({
    slides: listSlides_(),
    stats: readRows_(ss, "Stats"),
    texts: readTexts_(ss),
    members: readRows_(ss, "Members")
  });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut_({ ok: false });
  }
  if (!checkToken_(body.token) || body.action !== "booking") return jsonOut_({ ok: false });

  var b = body.booking || {};
  if (!b.fullName || !b.phone) return jsonOut_({ ok: false });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Bookings");
  var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");
  sheet.appendRow([
    now,
    String(b.fullName).slice(0, 200),
    String(b.phone).slice(0, 50),
    String(b.email || "").slice(0, 200),
    String(b.company || "").slice(0, 300),
    String(b.industry || "").slice(0, 300),
    String(b.note || "").slice(0, 2000),
    String(b.locale || ""),
    "Mới"
  ]);

  var email = getConfig_("notify_email");
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: "[BNI MASTER] Đăng ký tham dự mới: " + b.fullName,
      body:
        "Có đăng ký tham dự buổi họp mới trên bnimaster.com:\n\n" +
        "Họ tên: " + b.fullName + "\n" +
        "Điện thoại: " + b.phone + "\n" +
        "Email: " + (b.email || "-") + "\n" +
        "Công ty: " + (b.company || "-") + "\n" +
        "Ngành nghề: " + (b.industry || "-") + "\n" +
        "Lời nhắn: " + (b.note || "-") + "\n\n" +
        "Xem tất cả: " + ss.getUrl()
    });
  }
  return jsonOut_({ ok: true });
}

// ---------- helpers ----------

function listSlides_() {
  var folderId = getConfig_("slideshow_folder_id");
  if (!folderId) return [];
  var slides = [];
  try {
    var files = DriveApp.getFolderById(folderId).getFiles();
    while (files.hasNext()) {
      var f = files.next();
      if (String(f.getMimeType()).indexOf("image/") === 0) {
        slides.push({ id: f.getId(), name: f.getName() });
      }
    }
  } catch (err) {
    return [];
  }
  slides.sort(function (a, b) { return a.name.localeCompare(b.name); });
  return slides;
}

function readTexts_(ss) {
  var out = {};
  readRows_(ss, "HomeTexts").forEach(function (r) {
    if (!r.key) return;
    out[r.key + "_vi"] = r.vi || "";
    out[r.key + "_en"] = r.en || "";
  });
  return out;
}

function readRows_(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet || sheet.getLastRow() < 2) return [];
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(String);
  return values.slice(1).map(function (row) {
    var obj = {};
    headers.forEach(function (h, i) { if (h) obj[h] = String(row[i] == null ? "" : row[i]); });
    return obj;
  });
}

function getConfig_(key) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config");
  if (!sheet) return "";
  var values = sheet.getDataRange().getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === key) return String(values[i][1]).trim();
  }
  return "";
}

function checkToken_(token) {
  var expected = getConfig_("api_token");
  return expected && token === expected;
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
