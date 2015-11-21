// ==UserScript==
// @name        CodaLab Formatting
// @namespace   ice
// @include     /^https?://localhost:18000/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
// @include     /^https?://codalab\.stanford\.edu/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
// @include     /^https?://www\.codalab\.org/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
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
  // Remove "MISSING" cells + Add tooltip text + Title
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
          var title = document.getElementById("title");
          if (title && !title.textContent.trim()) {
            title.innerHTML = '(UNTITLED)';
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
    "#worksheet_content",
    "{ line-height: 1.5; }",
    ".terminal, .cmd, code, kbd, pre, samp",
    "{ font-family: \"DejaVu Sans Mono\", monospace; }",
    ".terminal, .cmd",
    "{ font-size: 10px; }",
    "#worksheet_content .type-markup code",
    "{ font-size: 90%; }",
    "#worksheet_content .worksheet-title",
    "{ padding-top: 20px; }",
    "#worksheet_content .worksheet-title #title",
    "{ font-size: 130%; font-weight: bold; }",
    // Change positions, margins and paddings of page
    "#worksheet-message",
    "{ position: absolute; left: 20px; top: 100px; padding: 20px; }",
    "footer",
    "{ display: none; }",
    "#worksheet",
    "{ height: calc(100% - 20px); }",
    "#worksheet #worksheet_panel, #worksheet #worksheet_panel.actionbar-focus",
    "{ padding-top: 45px !important; }",
    "#worksheet_content .type-table table",
    "{ width: auto; min-width: 100%; }",
    // Change margins of boxes
    "#worksheet_content .type-markup, #worksheet_content .type-inline, #worksheet_content .type-worksheet, #worksheet_content .type-image",
    "{ margin: 6px 0 6px; min-height: 0; }",
    "#worksheet_content .type-table, #worksheet_content .type-record",
    "{ margin: 6px 45px 12px 0; display: inline-block; min-width: 100%; } ",
    "#worksheet_content pre",
    "{ padding: 6px 0 6px 9px; text-indent: 0; }",
    "#worksheet_content .type-markup::before, #worksheet_content .type-markup::after",
    "{ content: none; }",
    "#worksheet_content .type-image",
    "{ text-align: center }",
    "#worksheet_content .type-image img",
    "{ width: auto; }",
    "#worksheet .ws-panel",
    "{ padding-top: 10px; padding-bottom: 10px; }",
    ".ws-panel > div:nth-child(1) > button",
    "{ font-size: 80%; }",
    // Change margins in Markdown
    "#worksheet_content .type-markup h1, #worksheet_content .type-markup h2, #worksheet_content .type-markup h3",
    "{ margin: 18px 0 12px; } ",
    " #worksheet_content .ws-item, #worksheet_content .type-markup li",
    "{ margin-top: 6px; margin-bottom: 6px; }",
    "#worksheet_content .type-markup ul ul, #worksheet_content .type-markup ul ol,",
    "#worksheet_content .type-markup ol ul, #worksheet_content .type-markup ol ol",
    "{ margin-bottom: 0; }",
    // Glowing boxes
    "#worksheet_content .ws-item > .focused",
    "{ background-color: " + color + "; box-shadow: 0 0 5px 5px " + color + "; }",
    "#worksheet_content .type-record table.focused,",
    "#worksheet_content .type-table table.focused",
    "{ box-shadow: 0 0 5px 5px " + color + "; }",
    // Other colors / formattings
    "body",
    "{ color: #5e5e5e; }",
    "#command_line",
    "{ background-color: inherit; }",
    "#worksheet_content .type-table table, #worksheet_content .type-table table.focused",
    "{ border-top: 3px solid #DDD; }",
    "#worksheet_content .type-table td",
    "{ white-space: nowrap; max-width: 25em; overflow: hidden; text-overflow: ellipsis; }",
    // Disabled because it changes some column widths, making it wiggle too much
    //"#worksheet_content .type-table td:hover",
    //"{ white-space: normal; overflow: auto; }",
    // Column highlighting
    "#worksheet_content .type-table .table-column-acc",
    ", #worksheet_content .type-table .table-column-dv_cor",
    ", #worksheet_content .type-table .table-column-dv_0_cor",
    ", #worksheet_content .type-table .table-column-dv_1_cor",
    ", #worksheet_content .type-table .table-column-dv_2_cor",
    "{ font-weight: bold; color: #C55 !important; }",
    "#worksheet_content .type-table .table-column-ts_cor",
    "{ font-weight: bold; color: #C5C !important; }",
    "#worksheet_content .type-table .table-column-_7C",
    "{ max-width: 5px !important; }",
    ".table-column-state { font-weight: bold; }",
    ".table-column-state.state-ready { color: #73b431; }",
    ".table-column-state.state-running { color: #f97706; }",
    ".table-column-state.state-failed { color: #d2322d; }",
    ".table-column-state.state-queued { color: #7d38c7; }",
    ""].join(" "));
})();
