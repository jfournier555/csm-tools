/* JSON Formatter
 * Detects raw JSON in the page body and pretty-prints it with
 * 2-space indentation. For SEs hitting APIs all day.
 * No configuration needed. */
(function () {
  var raw = ((document.body && document.body.innerText) || '').trim();
  if (!raw) { alert('No text content found on this page.'); return; }
  var data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    alert('Page content is not valid JSON.');
    return;
  }
  document.body.innerHTML = '';
  var pre = document.createElement('pre');
  pre.style.cssText = 'padding:16px;font:13px/1.5 monospace;' +
    'white-space:pre-wrap;word-break:break-word;';
  pre.textContent = JSON.stringify(data, null, 2);
  document.body.appendChild(pre);
})();
