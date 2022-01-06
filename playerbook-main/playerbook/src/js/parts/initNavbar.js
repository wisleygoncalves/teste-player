import {
    $, $doc, $body, wndW, bodyOverflow, throttleScroll, debounceResize,
} from './_utility';

/*------------------------------------------------------------------

  Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    const self = this;
    const $navbarTop = $('.mpl-navbar-top');

    // navbar set to small
    throttleScroll((type, scroll) => {
        if (scroll > self.options.navbarSmallMaxTop && !self.options.navbarSmall) {
            self.options.navbarSmall = true;
            $navbarTop.addClass('mpl-navbar-small');
        }
        if (scroll <= self.options.navbarSmallMaxTop && self.options.navbarSmall) {
            self.options.navbarSmall = false;
            $navbarTop.removeClass('mpl-navbar-small');
        }
    });

    // Mobile open
    $doc.on('click', '.mpl-navbar-top .mpl-navbar-toggle', (e) => {
        e.preventDefault();

        if (!$body.hasClass('mpl-navbar-mobile-open')) {
            $body.addClass('mpl-navbar-mobile-open');
            $doc.trigger('mpl.navbar.mobile.show');
        }
    });

    // Mobile close
    $doc.on('click', '.mpl-navbar-mobile-overlay, .mpl-navbar-mobile .mpl-navbar-toggle', () => {
        $body.removeClass('mpl-navbar-mobile-open');
        $doc.trigger('mpl.navbar.mobile.hide');
    });

    // Correction of the scrollbar when opening the Modal
    $doc.on('show.bs.modal', () => {
        bodyOverflow(1);
    });
    $doc.on('hidden.bs.modal', () => {
        bodyOverflow(0);
    });

    // Mobile collapse
    $doc.on('click', '.mpl-navbar-mobile .mpl-nav-link-collapse', function (e) {
        e.preventDefault();

        const $collapse = $(this).next('.mpl-navbar-collapse');
        const isShowed = $collapse.hasClass('show');

        if (isShowed) {
            $collapse.removeClass('show').stop().css('display', 'block').slideUp(300, () => {
                $collapse.css('height', '');
                $collapse.find('.mpl-navbar-collapse.show').stop().removeClass('show');
            });
        } else {
            $collapse.addClass('show').stop().css('display', 'none').slideDown(300, () => {
                $collapse.css('height', '');
            });
        }
    });

    // Dropdown
    const $dropdown = $('.mpl-navbar-top .mpl-dropdown');
    const $dropdownMenu = $('.mpl-navbar-top .mpl-dropdown-menu');

    // closing the menu when click to the side
    $doc.on('mouseup', (e) => {
        const dropdownHas = $dropdown.has(e.target).length;

        if (!dropdownHas && $dropdown.hasClass('focus') || !dropdownHas && $dropdown.hasClass('show')) {
            $dropdown.removeClass('focus show').children('.mpl-dropdown-menu').removeClass('focus show');
        }
    });

    // don't close the menu with the form
    $doc.on('focus', '.mpl-dropdown-menu:not(.show) input, .mpl-dropdown-menu:not(.show) textarea, .mpl-dropdown-menu:not(.show) button', function () {
        const $thisDropdown = $(this).parents('.mpl-dropdown');
        $thisDropdown.addClass('show').children('.mpl-dropdown-menu').addClass('show');
    });

    // closing the menu when hover to the other nav-link
    $doc.on('mouseenter', '.mpl-navbar-top .mpl-nav-link', function () {
        const $link = $(this);
        const $dropdowns = $link.closest('.mpl-navbar-top').find('.mpl-dropdown.focus');

        if ($dropdowns.length) {
            $dropdowns.children('.mpl-nav-link').blur();
            $dropdowns.removeClass('focus').children('.mpl-dropdown-menu').removeClass('focus');
        }
    });

    // show and hide the menu with focus
    function toggleShow() {
        const $thisDropdown = $(this).parents('.mpl-dropdown');
        const $thisDropdownMenu = $thisDropdown.children('.mpl-dropdown-menu');

        if (!$thisDropdown.hasClass('focus')) {
            $thisDropdown.addClass('focus');
            $thisDropdownMenu.addClass('focus');
        } else {
            $thisDropdown.removeClass('focus');
            $thisDropdownMenu.removeClass('focus');
        }
    }

    $doc.on('focus', '.mpl-navbar-top a', toggleShow);
    $doc.on('blur', '.mpl-navbar-top a', toggleShow);

    // update position
    debounceResize(() => {
        $dropdownMenu.each(function () {
            const $thisDropdownMenu = $(this);
            const rect = $thisDropdownMenu[0].getBoundingClientRect();
            const rectLeft = parseInt(rect.left, 10);
            const rectRight = parseInt(wndW - rect.right, 10);
            const dropdownMarginLeft = parseInt($thisDropdownMenu.css('margin-left'), 10);
            const dropdownMarginRight = parseInt($thisDropdownMenu.css('margin-right'), 10);

            const css = {
                marginLeft: '',
                marginRight: '',
            };

            $thisDropdownMenu.css(css);

            if (rectRight < 0) {
                css.marginLeft = (dropdownMarginLeft + rectRight);
            }

            if (rectLeft < 0) {
                css.marginRight = (dropdownMarginRight + rectLeft);
            }

            $thisDropdownMenu.css(css);
        });
    });

    // Hide when a key is pressed Esc
    $doc.on('keyup', (e) => {
        if (e.keyCode === 27) {
            // hide navbar mobile
            if ($body.hasClass('mpl-navbar-mobile-open')) {
                $body.removeClass('mpl-navbar-mobile-open');
            }

            // hide dropdown
            if ($dropdown.hasClass('focus show')) {
                $dropdown.removeClass('focus show').children('.mpl-dropdown-menu.focus').removeClass('focus show');
            }
        }
    });
}

export { initNavbar };
