<head>

	<base href="<?php echo base_url(); ?>" />
	<title><?php echo $GLOBALS['title']; ?></title>
	
	<meta name="Author" content="Robbie Bardijn" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta name="keywords" content="<?php echo $GLOBALS['keywords']; ?>">
	<meta name="description" content="<?php echo $GLOBALS['descr']; ?>">
	<meta name = "viewport" content = "width = 565">
	
	<link rel="shortcut icon" type="image/png" href="<?php echo base_url() ?>images/ui/ico_.png">
	<!--Global css file-->
	<link rel="stylesheet" type="text/css" href="css/Master.css" />
	<link rel="stylesheet" type="text/css" href="css/browsererror.css" />
	<!--Global Javascript files-->
	<script src="http://www.google.com/jsapi"></script> <!--google api downloader-->
	<!--<script type='text/javascript' src='js/jquery/jQuery.js'></script><!--Latest Jquery files-->
	<script type='text/javascript' src='js/jquery/jQuery_.js'></script><!--Latest Jquery files-->

	<!--JAVASCRIPT AND CSS FILES FOR SPECIFIC PAGES (loaded by controllers) -->
	<?php echo ($headextra); ?>

	<script type='text/javascript' src='js/Master.js'></script><!--Custom Javascript file-->


</head>
