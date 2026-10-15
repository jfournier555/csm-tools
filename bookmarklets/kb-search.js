/* Knowledge Base Search
 * Prompts for a query and searches your help center in a new tab.
 * Point KB_SEARCH_BASE at your own help center. */

/* CONFIG — your help center's search URL (no trailing params) */
var KB_SEARCH_BASE = 'https://help.YOUR-COMPANY.com/hc/en-us/search';

(function () {
  var q = prompt('Search the knowledge base:');
  if (!q) return;
  window.open(KB_SEARCH_BASE + '?query=' + encodeURIComponent(q), '_blank');
})();
