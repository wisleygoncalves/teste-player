import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function initInstagram() {
    const self = this;
    const $instagram = $('.mpl-instagram');
    if (!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating(data, temp) {
        const tempVariables = ['link', 'image', 'caption'];

        for (let i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp(`{{${tempVariables[i]}}}`, 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $instagram.each(function () {
        const $this = $(this);
        const options = {
            columnClass: $this.attr('data-instagram-column-class'),
            userName: $this.attr('data-instagram-user-name') || null,
            count: $this.attr('data-instagram-count') || 8,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.php.instagram,
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(`<div class="col-12">${options.failText}</div>`);

            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Instagram');
            return;
        }

        $this.html(`<div class="col-12">${options.loadingText}</div>`);

        // Fetch instagram images
        $.getJSON(options.apiPath, {
            userName: options.userName,
            count: options.count,
        }, (response) => {
            $this.html('');

            if (response) {
                for (let i = 0; i < options.count; i++) {
                    let instaItem = false;
                    if (response[i]) {
                        instaItem = response[i];
                    } else if (response.statuses && response.statuses[i]) {
                        instaItem = response.statuses[i];
                    } else {
                        break;
                    }

                    let resolution = 'thumbnail';
                    if (options.quality === 'md') {
                        resolution = 'low_resolution';
                    }
                    if (options.quality === 'lg') {
                        resolution = 'standard_resolution';
                    }

                    const tempData = {
                        link: instaItem.link,
                        image: instaItem.images[resolution].url,
                        caption: instaItem.caption,
                    };

                    $this.append(templating(tempData, options.template));
                }
            }

            // resize window
            self.debounceResize();

            // create columns
            if (options.columnClass) {
                $this.children().wrap(`<div class="${options.columnClass}"></div>`);
            }
        }).fail((a) => {
            $this.html(`<div class="col-12">${options.failText}</div>`);
            $.error(a.responseText);
        });
    });
}

export { initInstagram };
