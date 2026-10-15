/* LinkedIn Search
 * Prompts for a query and runs a LinkedIn universal search in a new tab.
 * Useful for finding stakeholders mid-discovery.
 * No configuration needed. */
(function () {
  var q = prompt('LinkedIn search:');
  if (!q) return;
  window.open(
    'https://www.linkedin.com/search/results/all/?keywords=' + encodeURIComponent(q),
    '_blank'
  );
})();
