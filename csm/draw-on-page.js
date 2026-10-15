/* Draw on Page
 * Freehand annotation overlay for live calls: circle things, draw arrows,
 * underline. Pick a color from the toolbar, draw with the mouse, Clear
 * to wipe, Exit (or ESC) to remove the overlay. Page clicks are captured
 * while drawing — that's the point.
 * Run again while active to toggle off.
 * No configuration needed. */
(function () {
  if (window.__bkmkDraw) { window.__bkmkDraw(); return; }

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:999998;cursor:crosshair;';
  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#e74c3c';

  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:12px;left:50%;transform:translateX(-50%);' +
    'z-index:999999;background:#1e1e1e;border-radius:10px;padding:8px 12px;' +
    'display:flex;gap:8px;align-items:center;box-shadow:0 2px 12px rgba(0,0,0,.5);';
  ['#e74c3c', '#f1c40f', '#2ecc71', '#5b9dff', '#ffffff'].forEach(function (c) {
    var b = document.createElement('button');
    b.title = c;
    b.style.cssText = 'width:24px;height:24px;border-radius:50%;border:2px solid #555;' +
      'background:' + c + ';cursor:pointer;padding:0;';
    b.addEventListener('click', function (e) { e.stopPropagation(); ctx.strokeStyle = c; });
    bar.appendChild(b);
  });
  function mkBtn(label, fn) {
    var b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = 'background:#333;color:#fff;border:0;border-radius:6px;' +
      'padding:6px 12px;font:13px sans-serif;cursor:pointer;';
    b.addEventListener('click', function (e) { e.stopPropagation(); fn(); });
    bar.appendChild(b);
  }
  mkBtn('Clear', function () { ctx.clearRect(0, 0, canvas.width, canvas.height); });
  mkBtn('Exit', exit);
  document.body.appendChild(bar);

  var drawing = false;
  canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  });
  window.addEventListener('mousemove', function (e) {
    if (!drawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  });
  window.addEventListener('mouseup', function () { drawing = false; });
  window.addEventListener('resize', sizeCanvas);
  function onKey(e) { if (e.key === 'Escape') exit(); }
  document.addEventListener('keydown', onKey, true);

  function exit() {
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', sizeCanvas);
    canvas.remove();
    bar.remove();
    window.__bkmkDraw = null;
  }
  window.__bkmkDraw = exit;
})();
