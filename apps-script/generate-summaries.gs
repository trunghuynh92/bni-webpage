/**
 * Google Apps Script — BNI Member Summary Generator
 * -------------------------------------------------
 * For each member row in the Google Sheet this script:
 *   1. Builds a Markdown (.md) summary of their info
 *   2. Grabs all 6 photos (logo, profile, business 1-4) from Drive
 *   3. Saves everything into a per-member subfolder in Drive
 *
 * By default (ONLY_NEW = true) a re-run processes only new members — rows
 * that have not yet been stamped in the SYNCED_COLUMN. To force a full
 * re-sync, clear that column (or set ONLY_NEW = false).
 *
 * HOW TO USE
 *   A) Bound to the sheet (easiest):
 *      - Open the Google Sheet → Extensions → Apps Script
 *      - Paste this file, leave SPREADSHEET_ID = '' (uses the active sheet)
 *   B) Standalone:
 *      - script.google.com → New project → paste this file
 *      - Set SPREADSHEET_ID to your sheet's ID (from its URL)
 *   Then set OUTPUT_FOLDER_ID (optional) and run generateMemberSummaries().
 *   Authorize when prompted. Check the output folder in Drive.
 *
 * COEXISTS WITH OTHER FILES: every .gs file in an Apps Script project shares
 * one global scope, so everything below is wrapped in a namespace
 * (MemberSummaryTool). Only that name plus the runnable entry point
 * generateMemberSummaries() (at the very bottom) leak to global scope — so
 * nothing here collides with questionnaire.gs, card-generator.gs, etc.
 */

var MemberSummaryTool = (function () {

// ============ CONFIG ============
var SPREADSHEET_ID   = '';               // '' = use the active/bound spreadsheet
var SHEET_NAME       = 'Trang tính1';    // tab that holds the form responses
var OUTPUT_FOLDER_ID = '';               // Drive folder ID for output; '' = create "BNI Member Summaries" in My Drive
var OVERWRITE        = true;             // true = replace existing files each run
var ONLY_NEW         = true;             // true = skip rows already marked done in SYNCED_COLUMN (only process new members)
var SYNCED_COLUMN    = 'syncedAt';       // sheet column used to remember which rows are done; auto-created if missing
// ================================

// Photos to pull from Drive for each member, in order.
var PHOTO_FIELDS = [
  { label: 'logo',       header: 'logoPhoto' },
  { label: 'profile',    header: 'profilePhoto' },
  { label: 'business-1', header: 'businessPhoto1' },
  { label: 'business-2', header: 'businessPhoto2' },
  { label: 'business-3', header: 'businessPhoto3' },
  { label: 'business-4', header: 'businessPhoto4' }
];

// Maps the q1..q9 columns to Markdown section headings (order preserved).
var QUESTION_SECTIONS = [
  { key: 'q1', title: 'Giới thiệu bản thân' },
  { key: 'q2', title: 'Sản phẩm / Dịch vụ & Điểm khác biệt' },
  { key: 'q3', title: 'Hành trình sự nghiệp' },
  { key: 'q4', title: 'Thành tựu nổi bật' },
  { key: 'q5', title: 'Mục tiêu & Tầm nhìn' },
  { key: 'q6', title: 'Triết lý kinh doanh & Phong cách lãnh đạo' },
  { key: 'q7', title: 'Khách hàng lý tưởng' },
  { key: 'q8', title: 'Kỳ vọng từ BNI' },
  { key: 'q9', title: 'Thông tin khác' }
];

/**
 * MAIN
 */
function run() {
  var ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID)
                          : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) { Logger.log('No data rows found.'); return; }

  var header = values[0];
  var col = buildColumnMap(header); // header name -> column index

  // Resolve (or create) the column used to remember which rows are already done.
  var syncedIdx = resolveSyncedColumn(sheet, header, col);

  var root = OUTPUT_FOLDER_ID ? DriveApp.getFolderById(OUTPUT_FOLDER_ID)
                              : getOrCreateSubfolder(DriveApp.getRootFolder(), 'BNI Member Summaries');

  var made = 0, photos = 0, skipped = 0, errors = [];

  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var name = cleanStr(get(row, col, 'fullName'));
    if (!name) continue; // skip blank rows

    // --- Skip members already synced (only process new ones) ---
    // "Already done" = stamped in syncedAt, OR a Drive folder for them already
    // exists (covers members pulled before this column existed).
    if (ONLY_NEW && (cleanStr(row[syncedIdx]) || folderExists(root, name))) {
      skipped++;
      continue;
    }

    Logger.log('Processing: ' + name);
    var slug = toSlug(name);
    var memberFolder = getOrCreateSubfolder(root, name);
    var rowErrorsBefore = errors.length;

    // --- 1. Build & write the Markdown summary ---
    try {
      var md = buildMarkdown(row, col);
      writeTextFile(memberFolder, slug + '.md', md, 'text/markdown');
      made++;
    } catch (e) {
      errors.push(name + ' / md: ' + e.message);
    }

    // --- 2. Grab all 6 photos (logo, profile, business 1-4) ---
    for (var w = 0; w < PHOTO_FIELDS.length; w++) {
      var raw = get(row, col, PHOTO_FIELDS[w].header);
      var ids = extractFileIds(raw);
      for (var k = 0; k < ids.length; k++) {
        try {
          if (copyDriveFile(ids[k], memberFolder, PHOTO_FIELDS[w].label, slug, k)) photos++;
        } catch (e) {
          errors.push(name + ' / ' + PHOTO_FIELDS[w].label + ': ' + e.message);
        }
      }
    }

    // --- 3. Stamp the row as done, but only if it had no errors (so failures retry next run) ---
    if (errors.length === rowErrorsBefore) {
      sheet.getRange(r + 1, syncedIdx + 1).setValue(new Date());
    }
  }

  Logger.log('\n=== DONE ===');
  Logger.log('Summaries written: ' + made);
  Logger.log('Photos copied: ' + photos);
  Logger.log('Skipped (already synced): ' + skipped);
  Logger.log('Errors: ' + errors.length);
  errors.forEach(function (e) { Logger.log('  - ' + e); });
  Logger.log('Output folder: ' + root.getUrl());
}

/* ---------------- helpers ---------------- */

function buildColumnMap(header) {
  var m = {};
  for (var i = 0; i < header.length; i++) {
    var h = String(header[i]).trim();
    if (h) m[h] = i;
  }
  return m;
}

function get(row, col, headerName) {
  return (headerName in col) ? row[col[headerName]] : '';
}

/**
 * Find the SYNCED_COLUMN in the header, or create it as a new column at the end.
 * Returns its 0-based index. Also registers it in the column map.
 */
function resolveSyncedColumn(sheet, header, col) {
  if (SYNCED_COLUMN in col) return col[SYNCED_COLUMN];
  var idx = header.length; // append after the last existing column
  sheet.getRange(1, idx + 1).setValue(SYNCED_COLUMN);
  col[SYNCED_COLUMN] = idx;
  return idx;
}

function buildMarkdown(row, col) {
  var name     = cleanStr(get(row, col, 'fullName'));
  var jobTitle = cleanStr(get(row, col, 'jobTitle'));
  var company  = cleanStr(get(row, col, 'company'));
  var industry = cleanStr(get(row, col, 'industry'));
  var founded  = cleanNum(get(row, col, 'founded'));
  var phone    = cleanNum(get(row, col, 'phone'));
  var email    = cleanStr(get(row, col, 'email'));

  var out = [];
  out.push('# ' + name);
  out.push('');
  if (jobTitle) out.push('**Chức danh:** ' + jobTitle + '  ');
  if (company)  out.push('**Công ty:** ' + company + '  ');
  if (industry) out.push('**Ngành nghề:** ' + industry + '  ');
  if (founded)  out.push('**Năm thành lập:** ' + founded + '  ');
  if (phone)    out.push('**Điện thoại:** ' + phone + '  ');
  if (email)    out.push('**Email:** ' + email + '  ');
  out.push('');
  out.push('---');

  for (var s = 0; s < QUESTION_SECTIONS.length; s++) {
    var sec = QUESTION_SECTIONS[s];
    var body = cleanStr(get(row, col, sec.key));
    if (!body) continue;
    out.push('');
    out.push('## ' + sec.title);
    out.push('');
    out.push(body);
  }
  out.push('');
  return out.join('\n');
}

/** Extract Drive file IDs from a cell that may hold URLs, raw IDs, or several comma-separated. */
function extractFileIds(raw) {
  var s = cleanStr(raw);
  if (!s) return [];
  var ids = [];
  var parts = s.split(/[\s,;]+/);
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    if (!p) continue;
    var m = p.match(/[-\w]{25,}/); // matches ...open?id=ID, .../d/ID/..., or a raw ID
    if (m) ids.push(m[0]);
  }
  return ids;
}

/** Copy a Drive file into a folder with a normalized name. Returns true if copied. */
function copyDriveFile(fileId, folder, label, slug, index) {
  var src = DriveApp.getFileById(fileId);
  var ext = extensionFor(src);
  var suffix = index > 0 ? ('-' + (index + 1)) : '';
  var newName = slug + '_' + label + suffix + ext;

  var existing = folder.getFilesByName(newName);
  if (existing.hasNext()) {
    if (!OVERWRITE) { Logger.log('  skip (exists): ' + newName); return false; }
    while (existing.hasNext()) existing.next().setTrashed(true);
  }
  src.makeCopy(newName, folder);
  Logger.log('  photo: ' + newName);
  return true;
}

function extensionFor(file) {
  var n = file.getName();
  var dot = n.lastIndexOf('.');
  if (dot > -1 && dot > n.length - 6) return n.substring(dot).toLowerCase();
  var mt = file.getMimeType();
  if (mt === 'image/png') return '.png';
  if (mt === 'image/jpeg') return '.jpg';
  if (mt === 'image/webp') return '.webp';
  if (mt === 'image/gif') return '.gif';
  return '';
}

function writeTextFile(folder, fileName, content, mimeType) {
  var existing = folder.getFilesByName(fileName);
  if (existing.hasNext()) {
    if (!OVERWRITE) { Logger.log('  skip md (exists): ' + fileName); return; }
    while (existing.hasNext()) existing.next().setTrashed(true);
  }
  var blob = Utilities.newBlob('', mimeType, fileName).setDataFromString(content, 'UTF-8');
  folder.createFile(blob);
  Logger.log('  md: ' + fileName);
}

function getOrCreateSubfolder(parent, folderName) {
  var it = parent.getFoldersByName(folderName);
  return it.hasNext() ? it.next() : parent.createFolder(folderName);
}

function folderExists(parent, folderName) {
  return parent.getFoldersByName(folderName).hasNext();
}

function cleanStr(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/​/g, '').replace(/\r\n/g, '\n').trim();
}

/** Format numeric cells (Sheets often returns 2019 as 2019.0 / phone as float). */
function cleanNum(v) {
  if (v === null || v === undefined || v === '') return '';
  if (typeof v === 'number') {
    return (v % 1 === 0) ? String(Math.round(v)) : String(v);
  }
  return String(v).replace(/\.0$/, '').trim();
}

/** Vietnamese-aware slug: strip diacritics, lower-case, hyphenate. */
function toSlug(str) {
  var s = String(str).toLowerCase();
  s = s.replace(/đ/g, 'd');
  s = s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
  // fallback map for accented chars that survive (e.g. no normalize support)
  var map = {'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ằ':'a','ắ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ầ':'a','ấ':'a','ẩ':'a','ẫ':'a','ậ':'a','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ề':'e','ế':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ồ':'o','ố':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ờ':'o','ớ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ừ':'u','ứ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y'};
  s = s.replace(/[^\u0000-\u007f]/g, function (c) { return map[c] || ''; });
  s = s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'member';
}

// Public surface — only this leaks to the shared global scope.
return { run: run };
})();

/**
 * Runnable entry point — pick this in the Apps Script "Run" menu.
 */
function generateMemberSummaries() {
  MemberSummaryTool.run();
}
