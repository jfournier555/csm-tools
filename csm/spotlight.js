/* Spotlight
 * Dims the entire page except the element under your cursor.
 * For guiding a customer's eyes on a live call: "see this button here?"
 * Move the mouse to move the spotlight. Press ESC or the badge to exit.
 * Run again while active to toggle off.
 * No configuration needed. */
(function () {
  if (window.__bkmkSpotlight) { window.__bkmkSpotlight(); return; }

  function shade() {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;z-index:999998;background:rgba(0,0,0,0.65);' +
      'pointer-events:none;display:none;';
    document.body.appendChild(d);
    return d;
  }
  var sTop = shade(), sBottom = shade(), sLeft = shade(), sRight = shade();

  var frame = document.createElement('div');
  frame.style.cssText = 'position:fixed;z-index:999999;pointer-events:none;display:none;' +
    'outline:3px solid #5b9dff;outline-offset:2px;border-radius:4px;';
  document.body.appendChild(frame);

  var badge = document.createElement('button');
  badge.textContent = 'Spotlight on — ESC to exit';
  badge.style.cssText = 'position:fixed;top:12px;right:12px;z-index:999999;' +
    'background:#5b9dff;color:#fff;border:0;border-radius:8px;padding:8px 14px;' +
    'font:13px sans-serif;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.4);';
  document.body.appendChild(badge);

  var cur = null, raf = null;
  function place(el) {
    var show = el && el !== document.body && el !== document.documentElement;
    [sTop, sBottom, sLeft, sRight, frame].forEach(function (d) {
      d.style.display = show ? 'block' : 'none';
    });
    if (!show) return;
    var r = el.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    sTop.style.left = '0px'; sTop.style.top = '0px';
    sTop.style.width = vw + 'px'; sTop.style.height = Math.max(0, r.top) + 'px';
    sBottom.style.left = '0px'; sBottom.style.top = r.bottom + 'px';
    sBottom.style.width = vw + 'px'; sBottom.style.height = Math.max(0, vh - r.bottom) + 'px';
    sLeft.style.left = '0px'; sLeft.style.top = r.top + 'px';
    sLeft.style.width = Math.max(0, r.left) + 'px'; sLeft.style.height = r.height + 'px';
    sRight.style.left = r.right + 'px'; sRight.style.top = r.top + 'px';
    sRight.style.width = Math.max(0, vw - r.right) + 'px'; sRight.style.height = r.height + 'px';
    frame.style.left = r.left + 'px'; frame.style.top = r.top + 'px';
    frame.style.width = r.width + 'px'; frame.style.height = r.height + 'px';
  }
  function onMove(e) {
    cur = e.target;
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; place(cur); });
  }
  function onScroll() { place(cur); }
  function onKey(e) { if (e.key === 'Escape') exit(); }
  function exit() {
    document.removeEventListener('mousemove', onMove, true);
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('scroll', onScroll, true);
    [sTop, sBottom, sLeft, sRight, frame, badge].forEach(function (d) { d.remove(); });
    window.__bkmkSpotlight = null;
  }
  badge.onclick = exit;

  document.addEventListener('mousemove', onMove, true);
  document.addEventListener('keydown', onKey, true);
  window.addEventListener('scroll', onScroll, true);
  window.__bkmkSpotlight = exit;
})();
