import { $ } from './_utility';

/*------------------------------------------------------------------

  Isotope

-------------------------------------------------------------------*/
function initPluginIsotope() {
    if (typeof $.fn.isotope === 'undefined') {
        return;
    }

    $('.mpl-isotope').each(function () {
        const $this = $(this);
        const curIsotopeOptions = $this.find('.mpl-isotope-options');

        // init items
        const $grid = $this.find('.mpl-isotope-grid').isotope({
            itemSelector: '.mpl-isotope-item',
        });

        // refresh for parallax images and isotope images position
        if ($grid.imagesLoaded) {
            $grid.imagesLoaded().progress(() => {
                $grid.isotope('layout');
            });
        }

        // click on filter button
        curIsotopeOptions.on('click', '> :not(.active)', function (e) {
            $(this).addClass('active').siblings().removeClass('active');
            const curFilter = $(this).attr('data-filter');

            e.preventDefault();

            $grid.isotope({
                filter() {
                    if (curFilter === 'all') {
                        return true;
                    }

                    let itemFilters = $(this).attr('data-filters');

                    if (itemFilters) {
                        itemFilters = itemFilters.split(',');
                        // eslint-disable-next-line
                        for (const k in itemFilters) {
                            if (itemFilters[k].replace(/\s/g, '') === curFilter) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
            });
        });
    });
}

export { initPluginIsotope };
