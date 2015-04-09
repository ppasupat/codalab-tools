# codalab-tools
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

    * Currently `ce` uses Meld to merge files. You can change that.

    * Add the following to `.vimrc` (the keys can be changed of course):

            " CodaLab (requires external "ce" command)
            noremap qwe :wa<CR>:!CodaLabSave $UUID %:p<CR>:e<CR>
            noremap qrr :wa<CR>:!CodaLabLoad $UUID %:p<CR>:e<CR>

        The first command saves the worksheet. To be safe, it first downloads the worksheet 
        from the server, checks if there is any change and merges if necessary.
        The second command updates the worksheet to the latest version.

## Browser Integration

* `CodaLab_Formatting.user.js`: Greasemonkey script for editing CSS of the worksheet view.
    It contains several general hacks (editing margins, colors, etc.)
    as well as some specific hack toward the end (for my particular experiment tables.)

