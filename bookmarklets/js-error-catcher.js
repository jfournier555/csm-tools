/* JS Error Catcher
 * Opens a fixed bottom panel that captures every JS error and
 * console.error on the page from the moment it runs.
 * Killer in PoCs: "let me show you what's actually breaking on
 * your site right now." Click the ✕ to dismiss.
 * No configuration needed. */
(function () {
  if (document.getElementById('bkmk-err-panel')) return;

  var panel = document.createElement('div');
  panel.id = 'bkmk-err-panel';
  panel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:40vh;overflow:auto;' +
    'background:#1e1e1e;color:#f5f5f5;font:12px/1.5 monospace;z-index:999999;' +
    'border-top:2px solid #e74c3c;padding:8px 12px;box-sizing:border-box;text-align:left;';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;">' +
    '<strong>JS Errors (live)</strong>' +
    '<button id="bkmk-err-close" style="background:#e74c3c;color:#fff;border:0;' +
    'border-radius:4px;padding:2px 10px;cursor:pointer;">&#10005;</button></div>' +
    '<div id="bkmk-err-list" style="margin-top:6px;"><em>No errors captured yet.</em></div>';
  document.body.appendChild(panel);

  var list = panel.querySelector('#bkmk-err-list');
  var empty = true;
  function log(msg) {
    if (empty) { list.innerHTML = ''; empty = false; }
    var div = document.createElement('div');
    div.style.cssText = 'border-bottom:1px solid #333;padding:4px 0;' +
      'white-space:pre-wrap;word-break:break-word;';
    div.textContent = '[' + new Date().toLocaleTimeString() + '] ' + msg;
    list.appendChild(div);
  }

  window.addEventListener('error', function (e) {
    log(e.message + ' @ ' + e.filename + ':' + e.lineno);
  });
  var origErr = console.error;
  console.error = function () {
    log(Array.prototype.map.call(arguments, String).join(' '));
    return origErr.apply(console, arguments);
  };

  panel.querySelector('#bkmk-err-close').onclick = function () { panel.remove(); };
  log('Listening for errors — interact with the page.');
})();
