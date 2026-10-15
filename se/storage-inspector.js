/* Storage Inspector
 * Dumps all cookies, localStorage, and sessionStorage for the current
 * origin into a readable overlay. Fast answers when debugging tracking
 * issues or "it's not saving my state" reports. Click ✕ to dismiss.
 * No configuration needed. */
(function () {
  if (document.getElementById('bkmk-storage-panel')) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function rows(obj, label) {
    var keys = Object.keys(obj);
    var html = '<h3 style="margin:12px 0 4px;color:#5b9dff;font-size:14px;">' +
      esc(label) + ' (' + keys.length + ')</h3>';
    if (!keys.length) return html + '<em style="color:#888;">empty</em>';
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
    keys.forEach(function (k) {
      var v;
      try { v = String(obj[k]); } catch (e) { v = '[unreadable]'; }
      if (v.length > 200) v = v.slice(0, 200) + '…';
      html += '<tr><td style="border:1px solid #333;padding:4px;vertical-align:top;' +
        'color:#9cdcfe;word-break:break-all;">' + esc(k) + '</td>' +
        '<td style="border:1px solid #333;padding:4px;vertical-align:top;' +
        'word-break:break-all;">' + esc(v) + '</td></tr>';
    });
    return html + '</table>';
  }

  var cookieObj = {};
  document.cookie.split(';').forEach(function (c) {
    var i = c.indexOf('=');
    if (i > 0) {
      try {
        cookieObj[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
      } catch (e) { cookieObj[c.slice(0, i).trim()] = c.slice(i + 1).trim(); }
    }
  });

  function readStorage(store) {
    var out = {};
    try {
      for (var i = 0; i < store.length; i++) {
        var k = store.key(i);
        out[k] = store.getItem(k);
      }
    } catch (e) { out = { error: String(e) }; }
    return out;
  }

  var panel = document.createElement('div');
  panel.id = 'bkmk-storage-panel';
  panel.style.cssText = 'position:fixed;top:5vh;left:5vw;width:90vw;max-height:90vh;overflow:auto;' +
    'background:#1e1e1e;color:#e8e8e8;font:13px/1.5 sans-serif;z-index:999999;text-align:left;' +
    'border:2px solid #5b9dff;border-radius:8px;padding:16px;box-sizing:border-box;';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;">' +
    '<strong>Storage Inspector — ' + esc(location.hostname) + '</strong>' +
    '<button id="bkmk-storage-close" style="background:#5b9dff;color:#fff;border:0;' +
    'border-radius:4px;padding:4px 12px;cursor:pointer;">&#10005;</button></div>' +
    rows(cookieObj, 'Cookies') +
    rows(readStorage(window.localStorage), 'localStorage') +
    rows(readStorage(window.sessionStorage), 'sessionStorage');
  document.body.appendChild(panel);
  panel.querySelector('#bkmk-storage-close').onclick = function () { panel.remove(); };
})();
