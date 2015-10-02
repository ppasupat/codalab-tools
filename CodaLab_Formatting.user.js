// ==UserScript==
// @name        CodaLab Formatting
// @namespace   ice
// @include     /^https?://localhost:18000/(worksheets|bundles)/?(0x[0-9a-f]*/?)?$/
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
  // CSS
  var color = "#e4effa";
  GM_addStyle([
    // Fonts
    "body, h1, h2, h3, h4, h5, h6",
    "{ font-family: \"Liberation Sans\"; }",
    "#worksheet_content",
    "{ line-height: 1.5; }",
    ".terminal, .cmd",
    "{ font-family: monospace; font-size: 10px; }",
    // Change margins and paddings of page
    "#worksheet",
    "{ height: calc(100% - 45px); }",
    "#worksheet #worksheet_panel, #worksheet #worksheet_panel.actionbar-focus",
    "{ padding-top: 45px !important; }",
    "#worksheet_content .type-table table",
    "{ width: auto; }",
    // Change margins of boxes
    "#worksheet_content .type-markup, #worksheet_content .type-inline, #worksheet_content .type-worksheet, #worksheet_content .type-image",
    "{ margin: 6px 0 6px; min-height: 0; }",
    "#worksheet_content .type-table, #worksheet_content .type-record",
    "{ margin: 6px 1em 12px 0; display: inline-block; } ",
    "#worksheet_content .type-markup::before, #worksheet_content .type-markup::after",
    "{ content: none; }",
    "#worksheet_content .type-image",
    "{ text-align: center }",
    "#worksheet_content .type-image img",
    "{ width: auto; }",
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
    "#worksheet_content .type-table td",
    "{ white-space: nowrap; max-width: 25em; overflow: hidden; text-overflow: ellipsis; }",
    // Disabled because it changes some column widths, making it wiggle too much
    //"#worksheet_content .type-table td:hover",
    //"{ white-space: normal; overflow: auto; }",
    // Column highlighting
    "#worksheet_content .type-table .table-column-acc, #worksheet_content .type-table .table-column-dv_cor",
    ", #worksheet_content .type-table .table-column-dv_0_cor",
    ", #worksheet_content .type-table .table-column-dv_1_cor",
    ", #worksheet_content .type-table .table-column-dv_2_cor",
    "{ font-weight: bold; color: #C55 !important; }",
    ".table-column-_7C",
    "{ max-width: 5px !important; }",
    ""].join(" "));
})();