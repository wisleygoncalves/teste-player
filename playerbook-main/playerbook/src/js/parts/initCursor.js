import {
    $, $doc, $body, isMobile,
} from './_utility';

const START_POSITION = -100;

/*------------------------------------------------------------------

  Cursor

-------------------------------------------------------------------*/
function initCursor() {
    const self = this;

    if (!self.options.customCursor || isMobile) {
        return;
    }

    let clientX = START_POSITION;
    let clientY = START_POSITION;
    let xPos = START_POSITION;
    let yPos = START_POSITION;
    let dX = START_POSITION;
    let dY = START_POSITION;
    let lastRunTime = Date.now();
    const tickPos = 2;
    const fps = 1000 / 60;

    const $cursor = $('<div class="mpl-cursor"></div>');
    const $cursorOuter = $('<div class="mpl-cursor-outer"></div>');

    $body.append([$cursor, $cursorOuter]).addClass('mpl-cursor-enabled');

    $doc.on('mousemove drag', (e) => {
        clientX = e.clientX;
        clientY = e.clientY;
    });

    $doc.on('mouseenter', 'a, button, input, textarea, [role="button"]', () => {
        $cursor.addClass('mpl-cursor-hover');
        $cursorOuter.addClass('mpl-cursor-hover');
    }).on('mouseleave', 'a, button, input, textarea, [role="button"]', () => {
        $cursor.removeClass('mpl-cursor-hover');
        $cursorOuter.removeClass('mpl-cursor-hover');
    });

    // Move cursor.
    const moveCursor = () => {
        const now = Date.now();
        const delay = now - lastRunTime;
        lastRunTime = now;

        // First run.
        if (xPos === START_POSITION) {
            dX = clientX;
            dY = clientY;
            xPos = clientX;
            yPos = clientY;
        } else {
            dX = clientX - xPos;
            dY = clientY - yPos;
            xPos += dX / (tickPos * fps / delay);
            yPos += dY / (tickPos * fps / delay);
        }

        $cursor.css('transform', `matrix(1, 0, 0, 1, ${clientX}, ${clientY}) translate3d(0,0,0)`);
        $cursorOuter.css('transform', `matrix(1, 0, 0, 1, ${xPos}, ${yPos}) translate3d(0,0,0)`);

        requestAnimationFrame(moveCursor);
    };

    requestAnimationFrame(moveCursor);
}

export { initCursor };
