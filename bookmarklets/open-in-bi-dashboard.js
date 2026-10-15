/* Open in BI Dashboard (by Org ID)
 * Reads an org ID from the current page and opens your BI dashboard
 * pre-filtered to that org. Pair with open-in-bi-dashboard-by-account.js
 * for the account-name variant.
 *
 * Originally built against an internal Looker dashboard; point the
 * CONFIG at your own dashboard URL. */

/* CONFIG */
var ID_SELECTOR = '.truncate'; // CSS selector for the element holding the org ID
var DASHBOARD_URL = 'https://bi.YOUR-COMPANY.com/dashboards/YOUR-DASHBOARD-ID'; // your dashboard

(function () {
  var el = document.querySelector(ID_SELECTOR);
  var id = el && el.innerText.trim();
  if (!id) {
    alert('No ID found matching "' + ID_SELECTOR + '" on this page.');
    return;
  }
  window.open(DASHBOARD_URL + '?Org+ID=' + encodeURIComponent(id), '_blank');
})();
