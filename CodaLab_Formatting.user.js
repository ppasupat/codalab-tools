// ==UserScript==
// @name        CodaLab Formatting
// @namespace   ice
// @include     http://localhost:18000/worksheets/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

(function() {
  var NUMCOLS = 35;
  var color = "#dfedf7";
  function thatCol(col) {
    var head = "#worksheet_content .type-table table xxx:first-child:nth-last-child(" + NUMCOLS + ")";
    if (col == 1) {
      return head.replace(/xxx/, "th") + ", " + head.replace(/xxx/, "td");
    } else {
      return head.replace(/xxx/, "th") + " ~ th:nth-child(" + col + "), " + head.replace(/xxx/, "td") + " ~ td:nth-child(" + col + ")";
    }
  }
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
    "{ box-shadow: 0 0 5px 5px #dfedf7; }",
    // Column highlighting
    thatCol(32),
    "{ font-weight: bold; color: #C55; }",
    thatCol(8) + ", " + thatCol(21) + ", " + thatCol(29),
    "{ background-color: #AAA; color: #AAA; width: 3px; padding: 0;}",
    ""].join(" "));
  
})();