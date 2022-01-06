import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Plugin Swiper

-------------------------------------------------------------------*/
function initPluginSwiper() {
    if (typeof Swiper === 'undefined') {
        return;
    }
    $('.mpl-carousel').each(function () {
        const $this = $(this);
        const dataLoop = $this.attr('data-loop');
        const dataButtons = $this.attr('data-arrows');
        const dataPagination = $this.attr('data-dots');
        const dataGrabCursor = $this.attr('data-grabCursor');
        const dataAutoHeight = $this.attr('data-autoHeight');
        const dataBreakpoints = $this.attr('data-breakpoints');
        const dataScrollbar = $this.attr('data-scrollbar');
        const dataSlides = $this.attr('data-slides');
        const dataAutoplay = parseInt($this.attr('data-autoplay'), 10);
        const dataSpeed = parseInt($this.attr('data-speed'), 10);
        const dataGap = parseInt($this.attr('data-gap'), 10);
        const conf = {
            // fixes the conflict with custom cursor movement.
            touchStartPreventDefault: false,
        };

        // creating slides
        if ($this.find('.swiper-slide').length === 0) {
            $this.children().wrap('<div class="swiper-slide"></div>');
        }
        // creating wrapper
        if ($this.find('.swiper-wrapper').length === 0) {
            $this.children().wrapAll('<div class="swiper-wrapper"></div>');
        }
        // creating container
        if ($this.find('.swiper-container').length === 0) {
            $this.children().wrap('<div class="swiper-container"></div>');
        }
        // creating buttons
        if (dataButtons) {
            $this.append('<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');
        }
        // creating pagination
        if (dataPagination) {
            $this.append('<div class="swiper-pagination"></div>');
        }

        const $container = $this.find('.swiper-container');
        const $btnPrev = $this.children('.swiper-button-prev');
        const $btnNext = $this.children('.swiper-button-next');

        // custom arrow
        if (dataButtons) {
            $btnPrev.append('<svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9L1 5L4 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>');
            $btnNext.append('<svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L4 5L1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>');
        }

        if ($btnPrev.length && $btnNext.length) {
            conf.navigation = {
                nextEl: $btnNext[0],
                prevEl: $btnPrev[0],
            };
        }
        if (dataLoop) {
            conf.loop = true;
        }
        if (dataGrabCursor) {
            conf.grabCursor = true;
        }
        if (dataAutoHeight) {
            conf.autoHeight = true;
        }
        if (dataScrollbar) {
            $container.append('<div class="swiper-scrollbar"></div>');

            conf.scrollbar = {
                el: $container.children('.swiper-scrollbar'),
                hide: false,
                draggable: true,
            };
        }
        if (dataAutoplay) {
            conf.autoplay = {
                delay: dataAutoplay,
            };
        }
        if (dataSpeed) {
            conf.speed = dataSpeed;
        }
        if (dataSlides === 'auto') {
            conf.slidesPerView = 'auto';
        } else {
            conf.slidesPerView = parseInt(dataSlides, 10);
        }
        if (dataGap) {
            conf.spaceBetween = dataGap;
        }
        if (dataBreakpoints) {
            let i = 0;
            const breaks = {};
            const points = dataBreakpoints.split(',');
            while (i < dataBreakpoints.split(',').length) {
                breaks[parseInt(points[i].split(':')[0], 10)] = { slidesPerView: parseInt(points[i].split(':')[1], 10) };
                i++;
            }
            conf.breakpoints = breaks;
        }

        // eslint-disable-next-line
        new Swiper ($container[0], conf);
    });
}

export { initPluginSwiper };
