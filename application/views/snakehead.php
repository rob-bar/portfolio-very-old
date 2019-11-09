<head>

	<base href="<?php echo base_url(); ?>" />
	<title><?php echo $GLOBALS['snake_title']; ?></title>
	<meta name="Author" content="Robbie Bardijn" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<meta name="keywords" content="<?php echo $GLOBALS['snake_keywords']; ?>">
	<meta name="description" content="<?php echo $GLOBALS['snake_meta_descr']; ?>">

	<meta property="og:url" content="<?php echo base_url() ?>games/canvassnake?t=<?php echo $_SERVER['REQUEST_TIME']; ?>" />
	<meta property="og:image" content="<?php echo base_url() ?>images/snakeAssets/snake_fb.png?t=<?php echo $_SERVER['REQUEST_TIME']; ?>"/>
	<meta property="og:title" content="<?php echo $GLOBALS['snake_title']; ?>"/>
	<meta property="og:description" content="<?php echo $GLOBALS['snake_descr']; ?>" />
	<link rel="shortcut icon" type="image/png" href="<?php echo base_url() ?>images/snakeAssets/snake_ico.png">
	<!--Global css file-->
	<link rel="stylesheet" type="text/css" href="css/canvassnakestyle.css" />
	<link rel="stylesheet" type="text/css" href="css/browsererror.css" />
	<!--Global Javascript files-->
	<script type='text/javascript' src="http://www.google.com/jsapi"></script><!-- google api downloader-->
	<!--<script type='text/javascript' src='js/jquery/jQuery.js'></script><!--Latest Jquery files-->
	<script type='text/javascript' src='js/jquery/jQuery_.js'></script><!--Latest Jquery files-->

	<!--JAVASCRIPT AND CSS FILES FOR SPECIFIC PAGES (loaded by controllers) -->
	<?php echo ($headextra); ?>

	<script type='text/javascript' src='js/MasterSnake.js'></script><!--Custom Javascript file-->

</head>
