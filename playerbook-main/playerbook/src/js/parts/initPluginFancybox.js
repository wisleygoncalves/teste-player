import {
    $, $doc, $body, bodyOverflow,
} from './_utility';

/*------------------------------------------------------------------

  Init Plugin Fancybox

-------------------------------------------------------------------*/
function initPluginFancybox() {
    if (typeof $.fn.fancybox === 'undefined') {
        return;
    }

    $.fancybox.defaults.backFocus = false;

    // Close Escape
    $doc.on('keyup', (e) => {
        if (e.keyCode === 27) {
            $.fancybox.close();
        }
    });
    $doc.on('beforeShow.fb', () => {
        bodyOverflow(1);
    });
    $doc.on('beforeClose.fb', () => {
        $body.addClass('fancybox-active-closing');
    });
    $doc.on('afterClose.fb', () => {
        bodyOverflow(0);
        $body.removeClass('fancybox-active-closing');
    });
}

export { initPluginFancybox };
