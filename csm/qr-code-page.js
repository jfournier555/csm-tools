/* QR Code for This Page
 * Generates a QR code for the current URL (via the public goqr.me API)
 * and shows it in an overlay. Scan with your phone to open the same
 * page — handy for pulling up a session replay or dashboard on mobile
 * mid-demo. Click anywhere to dismiss.
 * No configuration needed. */
(function () {
  if (document.getElementById('bkmk-qr')) return;

  var overlay = document.createElement('div');
  overlay.id = 'bkmk-qr';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:999999;' +
    'display:flex;align-items:center;justify-content:center;cursor:pointer;';

  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;padding:24px;border-radius:12px;text-align:center;';

  var img = document.createElement('img');
  img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' +
    encodeURIComponent(location.href);
  img.alt = 'QR code for this page';
  img.style.cssText = 'width:240px;height:240px;display:block;';

  var caption = document.createElement('div');
  caption.style.cssText = 'margin-top:12px;font:13px sans-serif;color:#333;' +
    'max-width:260px;word-break:break-all;';
  caption.textContent = location.href;

  box.appendChild(img);
  box.appendChild(caption);
  overlay.appendChild(box);
  overlay.addEventListener('click', function () { overlay.remove(); });
  document.body.appendChild(overlay);
})();
