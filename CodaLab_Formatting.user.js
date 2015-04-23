// ==UserScript==
// @name        CodaLab Formatting
// @namespace   ice
// @include     http://localhost:18000/worksheets/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

(function() {
  // Custom rendering modules
  var node = document.createElement('script');
  node.src = 'https://dl.dropboxusercontent.com/u/7408879/fig/markdown_bundle_interface.js';
  document.head.appendChild(node);
  node = document.createElement('script');
  node.src = 'https://dl.dropboxusercontent.com/u/7408879/fig/table_bundle_interface.js';
  document.head.appendChild(node);
  
  // CSS
  var color = "#dfedf7";
  GM_addStyle([
    // Make boxes big
    "#worksheet > .container",
    "{ width: auto; }",
    "#worksheet_content #raw-textarea",
    "{ height: " + Math.max(250, window.innerHeight - 300) + "px; }",
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
    "{ color: #555; }",
    "#worksheet_content .type-table td",
    "{ white-space: nowrap; max-width: 25em; overflow: hidden; text-overflow: ellipsis; }",
    "#worksheet_content .type-table td:hover",
    "{ white-space: normal; overflow: auto; }",
    // Column highlighting
    "#worksheet_content .type-table .ice-table-acc, #worksheet_content .type-table .ice-table-dv_cor",
    "{ font-weight: bold; color: #C55 !important; }",
    "#worksheet_content .type-table .ice-table-_7C",
    "{ background-color: #AAA !important; color: #AAA !important; width: 3px !important; padding: 0 !important;}",
    ""].join(" "));

})();
