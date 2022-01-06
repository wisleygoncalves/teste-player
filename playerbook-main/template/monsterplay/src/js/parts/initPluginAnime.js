import { $doc } from './_utility';

/*------------------------------------------------------------------

  Init Plugin Animejs

-------------------------------------------------------------------*/
function initPluginAnime() {
    const { anime } = window;

    if (typeof anime === 'undefined') {
        return;
    }

    // navbar
    const navbar = anime({
        opacity: [0, 1],
        easing: 'easeOutSine',
        duration: 400,
        targets: '.mpl-navbar-top .mpl-navbar-content > .mpl-navbar-nav > li',
        translateY: [-10, 0],
        autoplay: false,
        delay: anime.stagger(80, { start: 100 }),
    });

    // navbar mobile body
    const navbarMobileBody = anime({
        opacity: [0, 1],
        easing: 'easeOutSine',
        duration: 400,
        targets: '.mpl-navbar-mobile .mpl-navbar-body > .mpl-navbar-nav > li',
        translateX: [20, 0],
        autoplay: false,
        delay: anime.stagger(80, { start: 200 }),
    });

    // navbar mobile footer
    const navbarMobileFooter = anime({
        opacity: [0, 1],
        easing: 'easeOutSine',
        duration: 400,
        targets: '.mpl-navbar-mobile .mpl-navbar-footer > .mpl-navbar-nav > li',
        translateY: [20, 0],
        autoplay: false,
        delay: anime.stagger(80, { start: 600 }),
    });

    $doc.on('mpl.preloader.hide', () => {
        setTimeout(() => {
            navbar.play();
        }, 100);
    });

    $doc.on('mpl.navbar.mobile.show', () => {
        navbarMobileBody.play();
        navbarMobileFooter.play();
    });

    // navbar open collapse
    $doc.on('show.bs.collapse', (e) => {
        anime({
            opacity: [0, 1],
            easing: 'easeOutSine',
            duration: 200,
            targets: e.target.querySelectorAll('li'),
            translateX: [10, 0],
            autoplay: false,
            delay: anime.stagger(80, { start: 100 }),
        }).play();
    });
}

export { initPluginAnime };
