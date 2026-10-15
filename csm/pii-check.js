/* PII Check
 * Before sharing your screen: outlines every form field in orange and
 * highlights elements containing email addresses in yellow, with a count
 * summary. Run again to clear the highlights.
 * No configuration needed. */
(function () {
  var CLS_FIELD = 'bkmk-pii-field';
  var CLS_EMAIL = 'bkmk-pii-email';

  if (window.__bkmkPiiOn) {
    Array.prototype.forEach.call(
      document.querySelectorAll('.' + CLS_FIELD + ', .' + CLS_EMAIL),
      function (el) { el.classList.remove(CLS_FIELD, CLS_EMAIL); }
    );
    var st = document.getElementById('bkmk-pii-style');
    if (st) st.remove();
    window.__bkmkPiiOn = false;
    return;
  }

  var style = document.createElement('style');
  style.id = 'bkmk-pii-style';
  style.textContent =
    '.' + CLS_FIELD + ' { outline: 3px solid #f39c12 !important; outline-offset: 1px; }' +
    '.' + CLS_EMAIL + ' { outline: 3px solid #ffeb3b !important; outline-offset: 1px; ' +
    'background: rgba(255,235,59,.15); }';
  document.head.appendChild(style);

  var fields = document.querySelectorAll('input, textarea, select');
  Array.prototype.forEach.call(fields, function (el) { el.classList.add(CLS_FIELD); });

  var EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  var emailEls = new Set();
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  var node;
  while ((node = walker.nextNode())) {
    if (EMAIL_RE.test(node.nodeValue) && node.parentElement) {
      emailEls.add(node.parentElement);
    }
  }
  emailEls.forEach(function (el) { el.classList.add(CLS_EMAIL); });

  window.__bkmkPiiOn = true;

  var t = document.createElement('div');
  t.textContent = 'PII check: ' + fields.length + ' form field(s), ' +
    emailEls.size + ' element(s) with email addresses. Run again to clear.';
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
    'background:#222;color:#fff;font:13px sans-serif;padding:10px 18px;border-radius:8px;' +
    'z-index:999999;box-shadow:0 2px 12px rgba(0,0,0,.4);max-width:90vw;text-align:center;';
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 4000);
})();
