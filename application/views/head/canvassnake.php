<?php if (ENVIRONMENT == $GLOBALS["env_dev"]): ?>
	<script type="text/javascript" src="js/canvassnake/Game.js"></script>
	<script type="text/javascript" src="js/canvassnake/InfinitHunger.js"></script>
	<script type="text/javascript" src="js/canvassnake/TakeThePosition.js"></script>
	<script type="text/javascript" src="js/canvassnake/Snake.js"></script>
	<script type="text/javascript" src="js/canvassnake/BodyPart.js"></script>
	<script type="text/javascript" src="js/canvassnake/Level.js"></script>
	<script type="text/javascript" src="js/canvassnake/Fruit.js"></script>
<?php elseif (ENVIRONMENT == $GLOBALS["env_prod"]): ?>
		<script type="text/javascript" src="js/canvassnake/Production.js"></script>
<?php endif; ?>
