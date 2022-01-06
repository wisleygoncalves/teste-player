import { $ } from './_utility';

/*------------------------------------------------------------------

  Rangeslider

-------------------------------------------------------------------*/
function initPluginRangeslider() {
    if (typeof $.fn.ionRangeSlider === 'undefined') {
        return;
    }

    $('.mpl-rangeslider').ionRangeSlider();
}

export { initPluginRangeslider };
