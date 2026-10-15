# CSM Tools

A collection of JavaScript bookmarklets I use daily in Customer Success /
Solutions Engineering. Small, single-purpose utilities: kill repetitive
copy-paste, jump between tools with context, and inspect pages faster.

## Install

1. Open `bookmarklets/` and copy the contents of any `.js` file.
2. Create a new bookmark in your browser.
3. Paste the code into the URL field, prefixed with `javascript:` — e.g.
   `javascript:(function(){ ... })();`
4. Click the bookmark whenever you need it.

Files marked `CONFIG` have a settings block at the top — point them at your
own tools before use.

## The tools

| Bookmarklet | What it does |
|---|---|
| `new-calendar-event.js` | Opens a blank Google Calendar event composer. |
| `meeting-notes-doc.js` | Spins up a Google Doc titled with the current page + timestamp. |
| `css-selector-inspector.js` | Outlines every element; hover shows its selector, click copies it. For automation work and bug reports. |
| `kb-search.js` | Prompts for a query, searches your help center. `CONFIG`: help center URL. |
| `tech-stack-lookup.js` | Opens a BuiltWith report for the current page. Pre-call recon. |
| `linkedin-search.js` | Prompts for a query, runs LinkedIn universal search. Mid-discovery stakeholder hunting. |
| `get-session-url.js` | Grabs the current session replay URL into a copyable prompt. Auto-detects the provider. `CONFIG`: add your provider to the list. |
| `open-in-admin.js` | Reads an org ID off the page, opens it in your internal admin console. `CONFIG`: ID selector + admin URL. |
| `open-in-bi-dashboard.js` | Opens your BI dashboard pre-filtered by org ID read off the page. `CONFIG`: ID selector + dashboard URL. |
| `open-in-bi-dashboard-by-account.js` | Same, filtered by account name instead. `CONFIG`: name selector + dashboard URL. |
| `table-to-csv.js` | Converts any HTML table to a downloadable CSV. Prompts when multiple tables exist. |
| `extract-emails.js` | Scrapes and dedupes every email address on the page into a copyable list. |
| `js-error-catcher.js` | Live overlay capturing JS errors and `console.error` output. PoC debugging. |
| `storage-inspector.js` | Dumps cookies, localStorage, and sessionStorage into a readable overlay. |
| `json-formatter.js` | Pretty-prints raw JSON responses in the page. |
| `qr-code-page.js` | QR code for the current URL — scan to open it on your phone. |
| `copy-markdown-link.js` | Copies the page as a `[title](url)` Markdown link. |
| `link-cleaner.js` | Strips tracking params (`utm_*`, `fbclid`, `gclid`…) and copies the clean URL. |

## Notes

- Nothing here phones home. Everything runs locally in your browser tab.
- The `CONFIG`-marked tools were originally built against internal tooling;
  the defaults are examples — substitute your own.
- MIT licensed. Take them, adapt them.
