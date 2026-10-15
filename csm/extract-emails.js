/* Extract Emails
 * Scrapes every email address visible on the page, dedupes them,
 * and shows them in a copyable prompt (one per line).
 * No configuration needed. */
(function () {
  var text = (document.body && document.body.innerText) || '';
  var re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  var found = text.match(re) || [];
  var seen = {};
  var unique = found.filter(function (e) {
    var k = e.toLowerCase();
    if (seen[k]) return false;
    seen[k] = true;
    return true;
  });
  if (!unique.length) { alert('No email addresses found on this page.'); return; }
  prompt('Found ' + unique.length + ' email(s) — copy me:', unique.join('\n'));
})();
