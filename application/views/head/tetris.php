<?php if (ENVIRONMENT == $GLOBALS["env_dev"]): ?>
	<script type="text/javascript" src="js/tetris/Game.js"></script>
	<script type="text/javascript" src="js/tetris/Block.js"></script>
	<script type="text/javascript" src="js/tetris/ScoreMarker.js"></script>
<?php elseif (ENVIRONMENT == $GLOBALS["env_prod"]): ?>
		<script type="text/javascript" src="js/tetris/Game.js"></script>
		<script type="text/javascript" src="js/tetris/Block.js"></script>
		<script type="text/javascript" src="js/tetris/ScoreMarker.js"></script>		
		<script type="text/javascript" src="js/tetris/Production.js"></script>
<?php endif; ?>
