import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Plugin TouchSpin

-------------------------------------------------------------------*/
function initPluginTouchSpin() {
    if (typeof $.fn.TouchSpin === 'undefined') {
        return;
    }

    $('.mpl-touchspin').each(function () {
        const $input = $(this);
        const dataMin = $input.attr('min');
        const dataMax = $input.attr('max');
        const conf = {};

        conf.boostat = 5;
        conf.maxboostedstep = 10;
        conf.step = 1;
        conf.forcestepdivisibility = 'none';
        conf.buttonup_class = 'btn';
        conf.buttondown_class = 'btn';
        conf.verticalbuttons = true;

        if (dataMin) {
            conf.min = dataMin;
        }
        if (dataMax) {
            conf.max = dataMax;
        }

        $input.TouchSpin(conf);

        $input.after('<div class="form-control-bg"></div>');
    });
}

export { initPluginTouchSpin };
