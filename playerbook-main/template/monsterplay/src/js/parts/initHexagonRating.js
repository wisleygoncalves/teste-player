import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Hexagon Rating

-------------------------------------------------------------------*/
function initHexagonRating() {
    $('.mpl-hexagon-rating').each(function () {
        const $this = $(this);
        const percent = parseInt($this.attr('data-hexagon'), 10);
        const max = 2220;
        // eslint-disable-next-line
        const pathD = 'M748.305 412.622L589.475 689.622C580.652 705.01 564.271 714.5 546.533 714.5H229.467C211.729 714.5 195.348 705.01 186.525 689.622L27.6948 412.622C18.9503 397.372 18.9503 378.628 27.6948 363.377L186.525 86.3775C195.348 70.9903 211.729 61.5 229.467 61.5H546.533C564.271 61.5 580.652 70.9903 589.475 86.3775L748.305 363.378C757.05 378.628 757.05 397.372 748.305 412.622Z';

        $this.append(
            `<svg class="mpl-hexagon" viewBox="0 0 776 776" xmlns="http://www.w3.org/2000/svg">
                <path class="mpl-hexagon-track" d="${pathD}"/>
                <path class="mpl-hexagon-fill" d="${pathD}"/>
                <path class="mpl-hexagon-fix" d="M748.739 412.871L747.871 412.374C751.856 405.424 754.007 397.741 754.323 390H755.324C755.007 397.913 752.812 405.767 748.739 412.871Z"/>
            </svg>`,
        );

        const $hexagon = $this.children('svg');

        $hexagon.children('.mpl-hexagon-fill').css('stroke-dashoffset', `${((100 - percent) / 100) * max}`);
    });
}

export { initHexagonRating };
