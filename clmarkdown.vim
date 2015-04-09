" Vim syntax file
" Language: Markdown (CodaLab flavor)

if exists("b:current_syntax")
  finish
endif

runtime! syntax/markdown.vim
unlet b:current_syntax

syn match markdownLineComment "^\/\/.*"
syn match percentLineComment "^% .*"
hi def link markdownLineComment Comment
hi def link percentLineComment Structure

syn region markdownLinkText matchgroup=markdownLinkTextDelimiter start="!\=\[\%(\_[^]]*]\%( \={{\=\)\)\@=" end="\]\%( \={{\=\)\@=" keepend nextgroup=markdownLink,markdownId skipwhite
syn region markdownId matchgroup=markdownIdDelimiter start="{{\=" end="}}\=" keepend contained

syn region markdownCode matchgroup=markdownCodeDelimiter start="\$" end="\$" keepend contains=latexStuff
syn region markdownCode matchgroup=markdownCodeDelimiter start="\$\$ \=" end=" \=\$\$" keepend contains=latexStuff
syn match latexStuff ".*" contained
hi def link latexStuff PreProc
