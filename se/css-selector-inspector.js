/* CSS Selector Inspector
 * Outlines every element on the page. Hover shows its selector,
 * click copies it to the clipboard. Useful when writing automation
 * or documenting UI for bug reports.
 * No configuration needed. Run again to re-apply after navigation. */
(function () {
  var css = document.createElement('style');
  css.textContent = [
    '.bkmk-outline * { outline: 1px solid rgba(255,0,0,0.45) !important; }',
    '.bkmk-tip { position: fixed; z-index: 999999; display: none; background: #fff; color: #333;',
    '  font: 12px/1.4 sans-serif; padding: 4px 8px; border-radius: 4px;',
    '  box-shadow: 0 0 4px rgba(0,0,0,.4); pointer-events: none; }'
  ].join('\n');
  document.head.appendChild(css);
  document.documentElement.classList.add('bkmk-outline');

  var tip = document.createElement('div');
  tip.className = 'bkmk-tip';
  document.body.appendChild(tip);

  function selectorFor(el) {
    if (!el || el === document.documentElement) return null;
    if (el.id) return '#' + el.id;
    var s = el.tagName.toLowerCase();
    if (el.className && typeof el.className === 'string') {
      var classes = el.className.trim().replace(/\s+/g, '.');
      if (classes) s += '.' + classes;
    }
    return s;
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* noop */ }
      document.body.removeChild(ta);
      resolve();
    });
  }

  document.addEventListener('mouseover', function (e) {
    var sel = selectorFor(e.target);
    if (!sel) { tip.style.display = 'none'; return; }
    tip.textContent = sel;
    tip.style.display = 'block';
    tip.style.left = (e.clientX + 12) + 'px';
    tip.style.top = (e.clientY + 12) + 'px';
  });

  document.addEventListener('click', function (e) {
    var sel = selectorFor(e.target);
    if (!sel) return;
    e.preventDefault();
    copy(sel).then(function () {
      tip.textContent = 'Copied: ' + sel;
      setTimeout(function () { tip.style.display = 'none'; }, 1200);
    });
  }, true);
})();
