import { $, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Forms

-------------------------------------------------------------------*/
function initForms() {
    const self = this;

    // ajax form submit
    $doc.on('submit', '.mpl-form-ajax', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $button = $form.find('[type="submit"]');

        // if disabled button - stop this action
        if ($button.is('.disabled') || $button.is('[disabled]')) {
            return;
        }

        let $formResponse = $form.next('.mpl-form-response');

        if (!$formResponse.length) {
            $formResponse = $('<div class="mpl-form-response mt-30"></div>');
            $formResponse.insertAfter($form);
        }

        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
            success(response) {
                response = JSON.parse(response);
                if (response.type && response.type === 'success') {
                    $formResponse.html(`<div class="alert alert-success">${response.response}</div>`);
                    $form[0].reset();
                } else {
                    $formResponse.html(`<div class="alert alert-error">${response.response}</div>`);
                }
                self.debounceResize();
            },
            error(response) {
                $formResponse.html(`<div class="alert alert-error">${response.responseText}</div>`);
                self.debounceResize();
            },
        });
    });
}

export { initForms };
