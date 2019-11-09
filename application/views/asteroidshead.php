<head>
	<base href="<?php echo base_url(); ?>" />
	<title><?php echo $GLOBALS['asteroids_title']; ?></title>

	<meta name="Author" content="Robbie Bardijn" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<meta name="keywords" content="<?php echo $GLOBALS['asteroids_keywords']; ?>">
	<meta name="description" content="<?php echo $GLOBALS['asteroids_descr']; ?>">
	<link rel="shortcut icon" type="image/png" href="<?php echo base_url() ?>images/asteroids/ico.png">
	<!--Global css file-->
	<link rel="stylesheet" type="text/css" href="css/asteroidsstyle.css" />
	<link rel="stylesheet" type="text/css" href="css/browsererror.css" />
	<!--Global Javascript files-->
	<script src="http://www.google.com/jsapi"></script><!-- google api downloader-->
	<!--<script type='text/javascript' src='js/jquery/jQuery.js'></script><!--Latest Jquery files-->
	<script type='text/javascript' src='js/jquery/jQuery_.js'></script><!--Latest Jquery files-->

	<!--JAVASCRIPT AND CSS FILES FOR SPECIFIC PAGES (loaded by controllers) -->
	<?php echo ($headextra); ?>
	<?php //if (ENVIRONMENT == $GLOBALS["env_dev"]): ?>
		<script type='text/javascript' src='js/MasterAsteroids.js'></script><!--Custom Javascript file-->
	<?php //endif; ?>


</head>
