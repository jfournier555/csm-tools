/* Open in Admin Console
 * Reads a customer/org ID from the current page and opens it directly in
 * your internal admin tool. Saves the copy-paste round trip when you're
 * living between your CRM and admin panels.
 *
 * Originally built against an internal admin; point the CONFIG at yours. */

/* CONFIG */
var ID_SELECTOR = '.truncate'; // CSS selector for the element holding the org/customer ID
var ADMIN_URL = 'https://webber.internal.fullstory.com/admin/orgs/'; // trailing slash

(function () {
  var el = document.querySelector(ID_SELECTOR);
  var id = el && el.innerText.trim();
  if (!id) {
    alert('No ID found matching "' + ID_SELECTOR + '" on this page.');
    return;
  }
  window.open(ADMIN_URL + encodeURIComponent(id), '_blank');
})();
