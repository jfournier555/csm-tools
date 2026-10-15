/* Get Session URL
 * Grabs the current session replay URL from the on-page snippet API
 * and shows it in a copyable prompt. Auto-detects the provider —
 * add your own in the PROVIDERS config below.
 * No other configuration needed. */

/* CONFIG — session replay providers and how to get a share URL from each.
 * `detect` returns true when the provider's snippet is on the page.
 * `get` receives a callback; call it with the URL string. */
var PROVIDERS = [
  {
    name: 'FullStory',
    detect: function () {
      return window.FS && typeof window.FS.getCurrentSessionURL === 'function';
    },
    get: function (cb) { cb(window.FS.getCurrentSessionURL(true)); }
  },
  {
    name: 'LogRocket',
    detect: function () {
      return window.LogRocket && typeof window.LogRocket.getSessionURL === 'function';
    },
    get: function (cb) { window.LogRocket.getSessionURL(cb); }
  }
  // Add yours: { name: '...', detect: function () { ... }, get: function (cb) { ... } }
];

(function () {
  var provider = null;
  for (var i = 0; i < PROVIDERS.length; i++) {
    try {
      if (PROVIDERS[i].detect()) { provider = PROVIDERS[i]; break; }
    } catch (e) { /* keep looking */ }
  }
  if (!provider) {
    alert('No session replay provider detected on this page. Add yours in the PROVIDERS config.');
    return;
  }
  try {
    provider.get(function (url) {
      if (url) {
        prompt('Current session URL (' + provider.name + ') — copy me:', url);
      } else {
        alert('Provider found (' + provider.name + ') but no session URL was returned.');
      }
    });
  } catch (e) {
    alert('Error retrieving session URL: ' + e.message);
  }
})();
