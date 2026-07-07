# BNI MASTER website — admin content setup (Google Sheets + Drive)

The website reads its editable content from one Google Sheet and one Drive
folder. Admins never touch code: they edit the sheet or drop photos into the
folder, and the site updates itself within ~5 minutes.

## One-time setup (~10 minutes)

> Tip: do this while logged into a **chapter-owned Google account** (not a
> personal one) so handover later is just sharing that account.

1. **Create the sheet.** In Google Drive, create a new Google Sheet named
   `BNI MASTER Website`.
2. **Add the script.** In the sheet: *Extensions → Apps Script*. Delete any
   sample code, paste the full contents of `apps-script/Code.gs` from this
   repo, and save (💾).
3. **Run setup.** In the Apps Script toolbar, select the function `setup` and
   press ▶ Run. Approve the permission prompts (it needs Sheets, Drive, and
   email access — all under your own account). When it finishes, the sheet has
   tabs **Config / HomeTexts / Stats / Members / Bookings**, pre-filled with
   the site's current content, and a Drive folder **BNI Website Slideshow**
   exists next to your other files.
4. **Deploy the API.** *Deploy → New deployment → type: Web app*. Set
   **Execute as: Me** and **Who has access: Anyone**, then Deploy. Copy the
   Web app URL (ends in `/exec`).
5. **Connect the website.** Send the Web app URL and the `api_token` value
   (Config tab) to whoever manages the Vercel project. They set two
   environment variables and redeploy once:
   ```
   vercel env add CONTENT_API_URL     # the /exec URL
   vercel env add CONTENT_API_TOKEN   # the api_token from the Config tab
   ```

## Day-to-day editing (no code, ever)

| What | Where | Notes |
|---|---|---|
| Homepage background slideshow | Drive folder **BNI Website Slideshow** | Add/remove images; they rotate in filename order. Landscape ≥1920px wide looks best. Empty folder = the current dark background. |
| Homepage numbers (50+, 1000+…) | **Stats** tab | One row per number. Add/remove rows freely. |
| Homepage headline, subtitle, buttons | **HomeTexts** tab | Edit the `vi` column (`en` used when English is re-enabled). Empty cell = the built-in text. |
| Member profile text | **Members** tab | One row per member. Empty cell = keep what's on the site today; filled cell wins. Set `visible` to `no` to hide a member. |
| Member photos | **Members** tab photo columns | Paste a Google Drive share link (image must be "Anyone with the link can view"). Empty = keep the current photo. |
| Booking requests | **Bookings** tab | New requests appear as rows, newest last, with status "Mới". An email is also sent to `notify_email` (Config tab) on every request. |

## Changing who gets booking emails

Edit the `notify_email` value in the **Config** tab. Takes effect immediately.

## Handover checklist

1. Share (or transfer ownership of) the **BNI MASTER Website** sheet and the
   **BNI Website Slideshow** folder to the next admin.
2. That's it for daily content. The deeper infrastructure, if it ever changes
   hands: GitHub repo (`trunghuynh92/bni-webpage`), Vercel account (site
   hosting), GoDaddy (domain bnimaster.com).

## Notes / limits

- Edits appear on the site within ~5 minutes (the site caches content for 300s).
- If the sheet or script ever breaks, the site keeps working with its built-in
  content — worst case, edits stop applying until fixed.
- Adding a **new** member via the sheet works (new row with a new `slug`), but
  member photos then must all be Drive links. For a fully polished new profile
  (bilingual copy, editorial extras), it's still better to run the profile
  generation from the intake sheet.
- The `stats`/pull-quote extras on member profiles are not sheet-editable in
  this version; they change so rarely that they remain code-managed.
