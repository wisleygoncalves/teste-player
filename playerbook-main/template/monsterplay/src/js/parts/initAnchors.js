import { $, $doc } from './_utility';

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors() {
    $doc.on('click', 'a.btn, .mpl-navbar a', function (e) {
        const isHash = this.hash;
        const isURIsame = this.baseURI === window.location.href;

        if (isHash && isHash !== '#' && isHash !== '#!' && isURIsame) {
            const $hashBlock = $(isHash);
            const hash = isHash.replace(/^#/, '');
            if ($hashBlock.length) {
                // add hash to address bar
                $hashBlock.attr('id', '');
                document.location.hash = hash;
                $hashBlock.attr('id', hash);

                // scroll to block
                $('html, body').stop().animate({
                    scrollTop: $hashBlock.offset().top - 80,
                }, 700);

                e.preventDefault();
            }
        }
    });
}

export { initAnchors };
