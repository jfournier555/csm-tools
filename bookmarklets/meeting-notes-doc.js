/* Meeting Notes Doc
 * Creates a new Google Doc titled with the current page title and timestamp.
 * Handy for spinning up call notes without breaking flow.
 * No configuration needed. */
(function () {
  var title = 'Meeting notes: ' + document.title + ' — ' + new Date().toLocaleString();
  var docUrl =
    'https://docs.google.com/document/create?title=' + encodeURIComponent(title);
  window.open(docUrl, '_blank');
})();
