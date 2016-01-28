// ==UserScript==
// @name        CodaLab Formatting
// @namespace   ice
// @include     /^https?://localhost:18000/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
// @include     /^https?://codalab\.stanford\.edu/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
// @include     /^https?://worksheets\.codalab\.org/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

(function() {
  // In bundles view, the [s] key will sort files!
  if (/bundles/.test(window.location)) {
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 83) {
        var fileBrowser = document.getElementsByClassName('file-browser-table')[0].children[0];
        var rows = Array.prototype.slice.call(fileBrowser.children);
        rows.sort(function (a, b) {
          a = a.getElementsByTagName('div')[0];
          b = b.getElementsByTagName('div')[0]
          var aIsDir = /directory/.test(a.className);
          var bIsDir = /directory/.test(b.className);
          var aText = a.children[1].innerHTML;
          var bText = b.children[1].innerHTML;
          if (aText === '..') return false;
          if (bText === '..') return true;
          if (aIsDir && !bIsDir) return false;
          if (!aIsDir && bIsDir) return true;
          return aText > bText;
        });
        rows.forEach(function (x) {
          fileBrowser.appendChild(x);
        });
      }
    });
  }
  // Add tooltip text + Title
  (function () {
    var target = document.getElementById("update_progress");
    if (!target) return;
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (target.style.display == 'none') {
          var cells = document.querySelectorAll("#worksheet_content div.type-table td");
          for (var i = 0; i < cells.length; i++) {
            if (/table-column-state/.test(cells[i].className) && cells[i].textContent) {
              cells[i].className = cells[i].className.replace(/\sstate-\S*/, '');
              cells[i].className += ' state-' + cells[i].textContent;
            }
            cells[i].title = cells[i].textContent;
          }
        }
      });
    }).observe(target, { attributes: true });
  })();
  // CSS
  var color = "#e7f3fa";
  GM_addStyle([
    // Fonts
    "body, h1, h2, h3, h4, h5, h6",
    "{ font-family: \"Liberation Sans\"; }",
    ".terminal, .cmd, code, kbd, pre, samp",
    "{ font-family: \"DejaVu Sans Mono\", monospace; }",
    ".terminal, .cmd",
    "{ font-size: 10px; }",
    "body",
    "{ color: #5e5e5e; }",
    // Table
    "#worksheet_content .type-table table",
    "{ width: auto; min-width: 100%; }",
    "#worksheet_content .type-table td",
    "{ white-space: nowrap; max-width: 25em; overflow: hidden; text-overflow: ellipsis; }",
    // Column highlighting
    "#worksheet_content .type-table .table-column-acc",
    ", #worksheet_content .type-table .table-column-dv_cor",
    ", #worksheet_content .type-table .table-column-dv_0_cor",
    ", #worksheet_content .type-table .table-column-dv_1_cor",
    ", #worksheet_content .type-table .table-column-dv_2_cor",
    "{ font-weight: bold; color: #C55 !important; }",
    "#worksheet_content .type-table .table-column-ts_cor",
    "{ font-weight: bold; color: #C5C !important; }",
    ".table-column-state { font-weight: bold; }",
    ".table-column-state.state-ready { color: #73b431; }",
    ".table-column-state.state-running { color: #f97706; }",
    ".table-column-state.state-failed { color: #d2322d; }",
    ".table-column-state.state-queued { color: #7d38c7; }",
    ""].join(" "));
})();
