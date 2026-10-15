/* Open in BI Dashboard (by Account Name)
 * Reads an account name from the current page and opens your BI dashboard
 * pre-filtered to that account. Companion to open-in-bi-dashboard.js
 * (which filters by org ID instead).
 *
 * Originally built against an internal Looker dashboard; point the
 * CONFIG at your own dashboard URL. */

/* CONFIG */
var NAME_SELECTOR = '.truncate.db'; // CSS selector for the element holding the account name
var DASHBOARD_URL = 'https://bi.YOUR-COMPANY.com/dashboards/YOUR-DASHBOARD-ID'; // your dashboard

(function () {
  var el = document.querySelector(NAME_SELECTOR);
  var name = el && el.innerText.trim();
  if (!name) {
    alert('No account name found matching "' + NAME_SELECTOR + '" on this page.');
    return;
  }
  window.open(DASHBOARD_URL + '?Account+Name=' + encodeURIComponent(name), '_blank');
})();
