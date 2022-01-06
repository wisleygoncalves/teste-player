import { options } from './parts/_options';
import {
    debounceResize, throttleScroll, bodyOverflow, isInViewport, scrollTo,
} from './parts/_utility';

import { setOptions } from './parts/setOptions';
import { initCursor } from './parts/initCursor';
import { initNavbar } from './parts/initNavbar';
import { initAnchors } from './parts/initAnchors';
import { initForms } from './parts/initForms';
import { initHexagonRating } from './parts/initHexagonRating';
import { initTwitter } from './parts/initTwitter';
import { initFacebook } from './parts/initFacebook';
import { initInstagram } from './parts/initInstagram';

import { initPluginScrollReveal } from './parts/initPluginScrollReveal';
import { initPluginAnime } from './parts/initPluginAnime';
import { initPluginObjectFitImages } from './parts/initPluginObjectFitImages';
import { initPluginCountUp } from './parts/initPluginCountUp';
import { initPluginSwiper } from './parts/initPluginSwiper';
import { initPluginSliderRevolution } from './parts/initPluginSliderRevolution';
import { initPluginIsotope } from './parts/initPluginIsotope';
import { initPluginTouchSpin } from './parts/initPluginTouchSpin';
import { initPluginFancybox } from './parts/initPluginFancybox';
import { initPluginRangeslider } from './parts/initPluginRangeslider';
import { initPluginJarallax } from './parts/initPluginJarallax';

/*------------------------------------------------------------------

  MonsterPlay Class

-------------------------------------------------------------------*/
class MONSTERPLAY {
    constructor() {
        this.options = options;
    }

    init() {
        // prt:sc:dm

        const self = this;
        self.initCursor();
        self.initNavbar();
        self.initAnchors();
        self.initForms();
        self.initHexagonRating();
        self.initTwitter();
        self.initFacebook();
        self.initInstagram();

        // init plugins
        self.initPluginScrollReveal();
        self.initPluginAnime();
        self.initPluginObjectFitImages();
        self.initPluginCountUp();
        self.initPluginSwiper();
        self.initPluginSliderRevolution();
        self.initPluginIsotope();
        self.initPluginTouchSpin();
        self.initPluginFancybox();
        self.initPluginRangeslider();
        self.initPluginJarallax();

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();

        return self;
    }

    setOptions(newOpts) {
        return setOptions.call(this, newOpts);
    }

    debounceResize(func) {
        return debounceResize.call(this, func);
    }

    throttleScroll(callback) {
        return throttleScroll.call(this, callback);
    }

    bodyOverflow(type) {
        return bodyOverflow.call(this, type);
    }

    isInViewport($item, returnRect) {
        return isInViewport.call(this, $item, returnRect);
    }

    scrollTo($to, callback) {
        return scrollTo.call(this, $to, callback);
    }

    initCursor() {
        return initCursor.call(this);
    }

    initNavbar() {
        return initNavbar.call(this);
    }

    initAnchors() {
        return initAnchors.call(this);
    }

    initForms() {
        return initForms.call(this);
    }

    initHexagonRating() {
        return initHexagonRating.call(this);
    }

    initTwitter() {
        return initTwitter.call(this);
    }

    initFacebook() {
        return initFacebook.call(this);
    }

    initInstagram() {
        return initInstagram.call(this);
    }

    initPluginScrollReveal() {
        return initPluginScrollReveal.call(this);
    }

    initPluginAnime() {
        return initPluginAnime.call(this);
    }

    initPluginObjectFitImages() {
        return initPluginObjectFitImages.call(this);
    }

    initPluginCountUp() {
        return initPluginCountUp.call(this);
    }

    initPluginSwiper() {
        return initPluginSwiper.call(this);
    }

    initPluginSliderRevolution() {
        return initPluginSliderRevolution.call(this);
    }

    initPluginIsotope() {
        return initPluginIsotope.call(this);
    }

    initPluginTouchSpin() {
        return initPluginTouchSpin.call(this);
    }

    initPluginFancybox() {
        return initPluginFancybox.call(this);
    }

    initPluginRangeslider() {
        return initPluginRangeslider.call(this);
    }

    initPluginJarallax() {
        return initPluginJarallax.call(this);
    }
}

/*------------------------------------------------------------------

  Init MonsterPlay

-------------------------------------------------------------------*/
window.MonsterPlay = new MONSTERPLAY();

$('.ajax-contact-form').on('submit', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $responseSuccess = $form.find('.ajax-contact-form-response-success');
    var $responseError = $form.find('.ajax-contact-form-response-error');

    $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize(),
        success: function(response) {
            response = JSON.parse(response);
            if (response.type && response.type === 'success') {
                $responseError.hide();
                $responseSuccess.html(response.response).show();
                $form[0].reset();
            } else {
                $responseSuccess.hide();
                $responseError.html(response.response).show();
            }
        },
        error: function(response) {
            $responseSuccess.hide();
            $responseError.html(response.responseText).show();
        }
     });
});
