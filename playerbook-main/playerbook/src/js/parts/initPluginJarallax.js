import { $, isMobile } from './_utility';

/*------------------------------------------------------------------

  Jarallax

-------------------------------------------------------------------*/
function initPluginJarallax() {
    if (!this.options.parallax || isMobile) {
        return;
    }

    // in newest versions used Jarallax plugin
    if (typeof $.fn.jarallax === 'undefined') {
        return;
    }

    // banners
    $('.mpl-banner-parallax .mpl-image').each(function () {
        const speed = parseFloat($(this).attr('data-speed'));
        const $banner = $(this).closest('.mpl-banner-parallax');
        const $info = $banner.children('.mpl-banner-content');
        const isTopBanner = $banner.hasClass('mpl-banner-top');
        $(this).jarallax({
            automaticResize: true,
            speed: Number.isNaN(speed) ? 0.4 : speed,
            onScroll(calc) {
                if (!isTopBanner) {
                    return;
                }

                const pos = calc.beforeTop !== 0 ? -1 : 1;
                const scrollInfo = pos * Math.min(150, 150 * (1 - calc.visiblePercent));

                $info.css({
                    opacity: Math.max(0, calc.visiblePercent),
                    transform: `translate3d(0, ${scrollInfo}px, 0)`,
                });
            },
        });
    });

    // footer parallax
    $('.mpl-footer-parallax').each(function () {
        const $this = $(this);
        const $img = $this.children('.mpl-image');
        const $wrapper = $this.children('.mpl-footer-wrapper');
        const $content = $this.find('.mpl-footer-content');

        const opts = {
            automaticResize: true,
            onScroll(calc) {
                const scroll = Math.max(-50, -50 * (1 - calc.visiblePercent));
                $wrapper.css({
                    transform: `translate3d(0, ${scroll.toFixed(1)}%, 0)`,
                });
                $content.css({
                    transform: 'translate3d(0, 0, 0)',
                    opacity: Math.max(0, calc.visiblePercent),
                });
            },
        };

        if (!$img.length) {
            opts.type = 'custom';
            opts.imgSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            opts.imgWidth = 1;
            opts.imgHeight = 1;

            $this.jarallax(opts);
        } else {
            $img.jarallax(opts);
        }
    });
}

export { initPluginJarallax };
