/* Table to CSV
 * Converts an HTML table on the page to CSV and downloads it.
 * Prompts you to pick one when multiple tables exist.
 * No configuration needed. */
(function () {
  var tables = Array.prototype.slice.call(document.querySelectorAll('table'));
  if (!tables.length) { alert('No tables found on this page.'); return; }

  var idx = 0;
  if (tables.length > 1) {
    var choice = prompt(
      'Found ' + tables.length + ' tables. Enter a number (1-' + tables.length + '):', '1'
    );
    if (choice === null) return;
    idx = Math.max(0, Math.min(tables.length - 1, (parseInt(choice, 10) || 1) - 1));
  }

  function cellText(cell) {
    return (cell.innerText || '').replace(/\s+/g, ' ').trim();
  }
  function esc(v) {
    return '"' + v.replace(/"/g, '""') + '"';
  }

  var rows = Array.prototype.slice.call(tables[idx].querySelectorAll('tr'));
  var csv = rows.map(function (tr) {
    var cells = Array.prototype.slice.call(tr.querySelectorAll('th, td'));
    return cells.map(function (c) { return esc(cellText(c)); }).join(',');
  }).join('\r\n');

  var blob = new Blob([csv], { type: 'text/csv' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'table-' + (idx + 1) + '.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
})();
