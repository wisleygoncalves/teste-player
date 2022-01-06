const $ = window.jQuery;
const $doc = $(document);

const perfData = window.performance.timing; // The PerformanceTiming interface represents timing-related performance information for the given page.
const EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
const time = Math.max(500, Math.min(1000, parseInt(((EstimatedTime / 1000) % 60), 10) * 100));

// Preloader Animation
$doc.on('DOMContentLoaded', () => {
    const $preloader = $('.mpl-preloader');
    const $preloaderProgress = $preloader.find('.mpl-preloader-progress');

    // No preloader available.
    if (!$preloader.length || !$preloaderProgress.length) {
        $doc.trigger('mpl.preloader.hide');
        return;
    }

    $preloaderProgress.children('div').css({
        'transition-duration': `${time}ms`,
        width: '100%',
    });

    let preloaderTimer;
    function closePreloader() {
        clearTimeout(preloaderTimer);
        $preloader.addClass('mpl-preloader-hide');
        $doc.trigger('mpl.preloader.hide');
    }

    if ($preloader.length) {
        preloaderTimer = setTimeout(closePreloader, time);
    }
});
