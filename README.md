# Ice's CodaLab Tools
Tools for working with [CodaLab](https://github.com/codalab/codalab-cli)

## Vim Integration

* `clmarkdown.vim`: Syntax file.
    * Put it in `~/.vim/syntax/` or some similar location.
    * Add the following to `.vimrc`:

            autocmd BufNewFile,BufRead /tmp/*.md set filetype=clmarkdown

* `ce`: An enhanced version of `cl wedit` that allows the vim editor to be kept open.
    * Put it somewhere in your `$PATH`. For example, I put it in `~/.local/bin` and add

            export $PATH="$HOME/.local/bin:$PATH"

        to my `~/.bash_aliases` file.

    * Add the following to `.vimrc` (the keys can be changed of course):

            " CodaLab (requires external "ce" command)
            noremap qwe :wa<CR>:!CodaLabSave $UUID %:p<CR>:e<CR>

        The command checks whether the local and the remote copies have been edited.

        * If only the remote copy is edited, update the editor to match the remote copy.
        * If only the local copy is edited, save the copy and update the editor.
        * If both copies are edited, merge (default: meld in GUI environment and vimdiff otherwise),
            save the copy, and update the editor.
        
        **Note:** The vim command above uses the `CodaLabSave` function defined in `ce`,
        and thus will only work with `ce` (and not `cl wedit`).
        
        **Note:** `ce` currently only works in Bash.

## Browser Integration

* `CodaLab_Formatting.user.js`: Greasemonkey/TamperMonkey script for editing CSS of the worksheet view.
    It contains several general hacks (editing margins, colors, etc.)
    as well as some specific hacks (for my particular experiment tables.)

