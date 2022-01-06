<?php
    date_default_timezone_set('UTC');
    require_once('config.php'); // Path to config file
    require_once('scraper/Unirest.php');
    require_once('scraper/InstagramScraper.php');

    Unirest\Request::verifyPeer( false );

    // If count of instagram items is not fall back to default setting
    $userName = filter_input(INPUT_GET, 'userName', FILTER_SANITIZE_SPECIAL_CHARS);
    $count = filter_input(INPUT_GET, 'count', FILTER_SANITIZE_NUMBER_INT);

    if(!$userName) {
        $userName = USER_NAME;
    }

    // cache
    if(CACHE_ENABLED) {
        // Generate cache key from query data
        $cache_key = md5(
            var_export(array($userName, $count), true) . HASH_SALT
        );

        $cache_path = dirname(__FILE__) . '/cache/';

        // create cache folder
        if (!file_exists($cache_path)) {
            mkdir($cache_path, 0777, true);
        }

        // Remove old files from cache dir
        foreach (glob($cache_path . '*') as $file) {
            if (filemtime($file) < time() - CACHE_LIFETIME) {
                unlink($file);
            }
        }

        // If cache file exists - return it
        if(file_exists($cache_path . $cache_key)) {
            header('Content-Type: application/json');

            echo file_get_contents($cache_path . $cache_key);
            exit;
        }
    }

    $instagram = new \InstagramScraper\Instagram();

    $result = array();

    try {
        $feed = $instagram->getMedias( $userName, $count );
    } catch ( Exception $e ) {
        $feed   = false;
        $result = false;
    }

    if ( $feed && is_array( $feed ) ) {
        foreach ( $feed as $image ) {
            $result[] = array(
                'link'    => $image->getLink(),
                'images'  => array(
                    'thumbnail' => array(
                        'url' => $image->getImageThumbnailUrl(),
                    ),
                    'low_resolution' => array(
                        'url' => $image->getImageLowResolutionUrl(),
                    ),
                    'standard_resolution' => array(
                        'url' => $image->getImageStandardResolutionUrl(),
                    ),
                    'high_resolution' => array(
                        'url' => $image->getImageHighResolutionUrl(),
                    ),
                ),
                'caption' => $image->getCaption(),
            );
        }
    }

    // Return JSON Object
    header('Content-Type: application/json');

    if($result) {
        $result = json_encode($result);
        echo $result;
        if(CACHE_ENABLED) {
            file_put_contents($cache_path . $cache_key, $result);
        }
    }
