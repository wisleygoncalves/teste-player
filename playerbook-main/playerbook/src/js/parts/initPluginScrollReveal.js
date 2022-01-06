import { $, $doc } from './_utility';

function maybeRun() {
    $('[data-sr]').each(function () {
        const $this = $(this);
        const dataId = $this.attr('data-sr') || '';
        const dataInterval = parseInt($this.attr('data-sr-interval'), 10);
        const dataDuration = parseInt($this.attr('data-sr-duration'), 10);
        const dataDelay = parseInt($this.attr('data-sr-delay'), 10);
        const dataScale = parseFloat($this.attr('data-sr-scale'));
        const dataOrigin = $this.attr('data-sr-origin');
        const dataDistance = $this.attr('data-sr-distance');
        const conf = {};
        let $item = $this.find(`[data-sr-item="${dataId}"]`);

        conf.reset = true;
        conf.cleanup = true;

        if (!$item.length) {
            $item = $this;
        }

        // Animated shop and blog posts
        const $shopOrPost = $('.mpl-shop, .mpl-post');

        if ($shopOrPost.length) {
            conf.reset = false;
            conf.duration = 1400;

            window.ScrollReveal().reveal($shopOrPost, conf);
        }

        conf.reset = false;

        if (dataInterval) {
            conf.interval = dataInterval;
        }
        if (dataDuration) {
            conf.duration = dataDuration;
        }
        if (dataDelay) {
            conf.delay = dataDelay;
        }
        if (dataScale) {
            conf.scale = dataScale;
        }
        if (dataOrigin) {
            conf.origin = dataOrigin;
        }
        if (dataDistance) {
            conf.distance = `${dataDistance}px`;
        }

        window.ScrollReveal().reveal($item, conf);
    });

    $doc.on('arrangeComplete', '.mpl-isotope-grid', () => {
        window.ScrollReveal().delegate({ type: 'resize' });
    });
}

function initPluginScrollReveal() {
    if (typeof ScrollReveal === 'undefined') {
        return;
    }

    $doc.on('mpl.preloader.hide', () => {
        setTimeout(() => {
            maybeRun();
        }, 400);
    });
}

export { initPluginScrollReveal };
