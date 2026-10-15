/* Get Session URL
 * Grabs the current session replay URL via the on-page snippet API and
 * shows it in a copyable prompt. Swap window.FS for your own replay
 * tool's client API as needed.
 *
 * NOTE: window.FS.getCurrentSessionURL is FullStory's publicly documented
 * client-side API — no internal endpoints involved. */

/* CONFIG — adapt to your session replay provider */
function getSessionUrl() {
  if (window.FS && typeof window.FS.getCurrentSessionURL === 'function') {
    return window.FS.getCurrentSessionURL(true);
  }
  return null;
}

(function () {
  try {
    var url = getSessionUrl();
    if (url) {
      prompt('Current session URL (copy me):', url);
    } else {
      alert('No session URL found — is the replay snippet on this page?');
    }
  } catch (e) {
    alert('Error retrieving session URL: ' + e.message);
  }
})();
