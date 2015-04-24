" Vim syntax file
" Language: Markdown (CodaLab flavor)

if exists("b:current_syntax")
  finish
endif

runtime! syntax/markdown.vim
unlet b:current_syntax

" Line comments
syn match markdownLineComment "^\/\/.*"
" Directives
syn match percentLineComment "^% .*"
" Bundles
syn region markdownLinkText matchgroup=markdownLinkTextDelimiter start="!\=\[\%(\_[^]]*]\%( \={{\=\)\)\@=" end="\]\%( \={{\=\)\@=" keepend nextgroup=markdownLink,markdownId skipwhite
syn region markdownId matchgroup=markdownIdDelimiter start="{{\=" end="}}\=" keepend contained
" LaTeX
syn region markdownCode matchgroup=markdownCodeDelimiter start="\$" end="\$" keepend contains=latexStuff
syn match latexStuff ".*" contained

hi def link markdownLineComment Comment
hi def link percentLineComment Structure
hi def link latexStuff PreProc
