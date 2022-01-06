import { CountUp } from 'countup.js';
import { $, isInViewport, throttleScroll } from './_utility';

/*------------------------------------------------------------------

  Init CountUp

-------------------------------------------------------------------*/

function initPluginCountUp() {
    if (typeof CountUp === 'undefined') {
        return;
    }

    throttleScroll(() => {
        $('.mpl-count:not(.mpl-count-stop)').each(function () {
            const $this = $(this);
            const number = parseInt($this.text(), 10);
            const dataDuration = parseInt($this.attr('data-count-duration'), 10);
            const conf = {};

            if (isInViewport($this) > 0) {
                conf.useGrouping = false;

                if (dataDuration) {
                    conf.duration = dataDuration;
                } else {
                    conf.duration = 3;
                }

                const countUp = new CountUp($this[0], number, conf);

                countUp.start();
                $this.addClass('mpl-count-stop');
            }
        });
    });
}

export { initPluginCountUp };
