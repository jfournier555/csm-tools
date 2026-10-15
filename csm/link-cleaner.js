/* Link Cleaner
 * Strips tracking parameters (utm_*, fbclid, gclid, msclkid, etc.) from
 * the current URL and copies the clean link to your clipboard.
 * For sending customers links that don't look like surveillance.
 * No configuration needed. */
(function () {
  var TRACKING = /^(utm_|fbclid|gclid|gclsrc|msclkid|mc_cid|mc_eid|igshid|vero_|yclid|twclid)/i;

  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:#222;color:#fff;font:13px sans-serif;padding:10px 18px;border-radius:8px;' +
      'z-index:999999;box-shadow:0 2px 12px rgba(0,0,0,.4);';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2000);
  }
  function copyText(text, msg) {
    function done() { toast(msg); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* noop */ }
      document.body.removeChild(ta);
      done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  var url = new URL(location.href);
  var removed = 0;
  Array.prototype.slice.call(url.searchParams.keys()).forEach(function (k) {
    if (TRACKING.test(k)) { url.searchParams.delete(k); removed++; }
  });
  copyText(url.toString(),
    removed ? 'Clean link copied (' + removed + ' tracker(s) removed)'
            : 'Link copied (no trackers found)');
})();
