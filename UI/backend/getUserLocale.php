<?php

function startsWith($haystack, $needle)
{
    return $needle === '' || strrpos($haystack, $needle, -strlen($haystack)) !== false;
}

$locale = locale_accept_from_http($_SERVER['HTTP_ACCEPT_LANGUAGE']);

$isEnglish = startsWith($locale, 'en');
$isFrench = startsWith($locale, 'fr');

if ($isEnglish) {
    $result = 'en';
} elseif ($isFrench) {
    $result = 'fr';
} else {
    $result = 'other';
}
echo $result;
