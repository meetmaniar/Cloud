<!doctype html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title><?php echo $_GET["event"]; ?></title>
    <meta property="og:title" content="<?php echo $_GET["title"]; ?>" />
    <meta property="og:description" content="<?php echo $_GET["description"]; ?>" />
    <meta property="og:url" content="<?php echo $_SERVER[REQUEST_SCHEME] . "://" . $_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI]; ?>" />
    <meta property="og:image" content="<?php echo $_GET["image"]; ?>" />
    <meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="<?php echo $_GET["site"]; ?>"/>
	<meta name="twitter:creator" content="<?php echo $_GET["creator"]; ?>"/>
	<meta name="twitter:title" content="<?php echo $_GET["title"]; ?>" />
	<meta name="twitter:description" content="<?php echo $_GET["description"]; ?>"/>
	<meta name="twitter:image" content="<?php echo $_GET["image"]; ?>"/>
	<meta name="twitter:image:height" content="270"/>
	<meta name="twitter:image:width" content="480"/>

</head>

<style>
body{
    background: #fff;
}

.header{
    max-width: 320px;
    text-align: center;
    margin: auto;
}
</style>

<body>
<div class="header">
    <img src="<?php echo $_GET["logo"]; ?>" alt="RBC" width='50%'>
</div>
<div style="text-align: center; position:static; height: 100%; width: 100%; top:0;left 0;">
    <img src="<?php echo $_GET["image"]; ?>" alt="image" style="width: 100%;">
</div>
</div>

</body>

</html>