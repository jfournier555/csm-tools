/* Font Size Bump
 * Each click steps page zoom 100% -> 125% -> 150% -> back to 100%.
 * For making dense dashboards readable for everyone on a screenshare.
 * No configuration needed. */
(function () {
  var LEVELS = [1, 1.25, 1.5];
  var i = (window.__bkmkZoomIdx === undefined ? -1 : window.__bkmkZoomIdx) + 1;
  if (i >= LEVELS.length) i = 0;
  window.__bkmkZoomIdx = i;
  document.body.style.zoom = LEVELS[i];

  var t = document.createElement('div');
  t.textContent = 'Zoom ' + Math.round(LEVELS[i] * 100) + '%';
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
    'background:#222;color:#fff;font:13px sans-serif;padding:10px 18px;border-radius:8px;' +
    'z-index:999999;box-shadow:0 2px 12px rgba(0,0,0,.4);';
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 1500);
})();
