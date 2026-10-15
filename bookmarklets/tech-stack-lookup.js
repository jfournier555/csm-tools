/* Tech Stack Lookup
 * Opens a BuiltWith report for the current page. Quick way to see
 * what a prospect or customer is running before a call.
 * No configuration needed. */
(function () {
  window.open(
    'https://builtwith.com/' + encodeURIComponent(location.href),
    '_blank'
  );
})();
