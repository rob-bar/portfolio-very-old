<div id="fb-root"></div>
<div id="canvasloader-container" class="wrapper"></div>
<div id="content">
	<?php $this->load->view("browsererror.php"); ?>
	
	<div id="intro">
		<div id="buttons-introscreen">
			<a href="#" id="btn-1"><span class="hide">Play game</span></a>
			<a href="#" id="btn-2"><span class="hide">Instructions</span></a>
		</div>
	</div>
	
	<div id="game">
		<div id="previewfield">
			<canvas id="canvas-previewfield" width="120" height="120">Your Browser does not support HTML5 Canvas.</canvas>
		</div>
		<div id="scorefield">
			<p>Level : <span>2</span></p>
			<p>Lines : <span>25</span></p>
			<p>Score : <span>2.232.245</span></p>
		</div>
		<div id="controls">
			<a href="#" id="btn-3" class="replay"><span class="hide">Play again</span></a>
			<a href="#" id="btn-4"><span class="hide">Pause</span></a>
		</div>
		<div id="shares">
			<a href="<?php echo $url_facebook ?>" id="btn-5"><span class="hide">Facebook</span></a>
			<a href="<?php echo $url_twitter ?>" id="btn-6"><span class="hide">Twitter</span></a>
			<!--<a href="#" id="btn-7"><span class="hide">Google+</span></a>-->
		</div>
		<div id="fallingfield">
			<canvas id="canvas-fallingfield" width="300" height="540">Your Browser does not support HTML5 Canvas.</canvas>
		</div>
	</div>
	
	<div id="mask"></div>
	
	<div id="htp">
		<a href="#" id="htp-close"><span class="hide">Close</span></a>
		<div id="topic-1" class="topic">
			<img src="images/tetris/arrows.png" alt="arrows">
			<p>Move and rotate the blocks with your <span>arrow keys</span>.</p>
		</div>
		<div id="topic-2" class="topic">
			<img src="images/tetris/line.png" alt="arrows">
			<p>Make as many lines as possible <span>1=50</span>, <span>2=125</span>, <span>3=250</span>, <span>4=500</span>.</p>
		</div>
		<div id="topic-3" class="topic">
			<div id="slideshow-htp">
				<div id="slideshow-htp-container">
					<img src="images/tetris/blocks/1.png" alt="block-1">
					<img src="images/tetris/blocks/2.png" alt="block-2">
					<img src="images/tetris/blocks/3.png" alt="block-3">
					<img src="images/tetris/blocks/4.png" alt="block-4">
					<img src="images/tetris/blocks/5.png" alt="block-5">
					<img src="images/tetris/blocks/6.png" alt="block-6">
					<img src="images/tetris/blocks/7.png" alt="block-7">
					<img src="images/tetris/blocks/8.png" alt="block-8">
					<img src="images/tetris/blocks/9.png" alt="block-9">
					<img src="images/tetris/blocks/10.png" alt="block-10">
					<img src="images/tetris/blocks/11.png" alt="block-11">
					<img src="images/tetris/blocks/12.png" alt="block-12">
					<img src="images/tetris/blocks/13.png" alt="block-13">
					<img src="images/tetris/blocks/14.png" alt="block-14">
					<img src="images/tetris/blocks/15.png" alt="block-15">
					<img src="images/tetris/blocks/16.png" alt="block-16">
				</div>
				<a href="#" id="slideshow-htp-left"></a>
				<a href="#" id="slideshow-htp-right"></a>
			</div>
			<p>Each block has an <span>individual</span> score.</p>
		</div>
		<div id="topic-4" class="topic">
			<img src="images/tetris/123.png" alt="score multiplier">
			<p>
				The higher the blocks are placed, the more points they earn you.<br />
				The playfield is divided by 3 so: at the bottom you get a <span>normal</span> <br />
				score, in the middle <span>double</span> score and at the top <span>triple</span> score.
			</p>
		</div>
		<div id="topic-5" class="topic">
			<img src="images/tetris/share-fb-twit.png" alt="Facebook and twitter shares">
			<p>
				When you login with <span>Facebook</span> scores will be posted<br />
				to Facebook to compare with your friends.<br />
				Try to beat the highscores and get <span>first</span> place to impress your friends!<br />
				With the sharing buttons at the end of the game <br />
				you can post your score on your <span>wall</span> or <span>tweet</span> them.
			</p>
		</div>
		<div id="topic-6" class="topic">
			<img src="images/tetris/no-fb-htp.png" alt="When you have no facebook">
			<p>You can also <span>play for fun</span> without when you have no facebook.</p>
		</div>
	</div>
	<div id="enter-name">
		<p>Who are you?</p>
		<div id="fb-bg"><fb:login-button show-faces="false" scope="publish_actions" data-size="medium"></fb:login-button></div>
		<a href="#" id="btn-8"><span class="hide">I have no facebook</span></a>
	</div>
	<div id="pp">
		<a href="#" id="btn-14"><span class="hide">Pause / Play</span></a>
	</div>
	<div id="game-over">
		<div id="marker-cont">
			<img src="images/tetris/place-1.png" alt="First Place" class="highscoreMarker first">
			<img src="images/tetris/place-2.png" alt="Second Place" class="highscoreMarker second">
			<img src="images/tetris/place-3.png" alt="Third Place" class="highscoreMarker third">
			<img src="images/tetris/place-up.png" alt="New Highscores" class="highscoreMarker up">
		</div>
		<div id="badges">
			<img src="images/tetris/badge-1.png" alt="First Place badge" class="Badge first">
			<img src="images/tetris/badge-2.png" alt="Second Place badge" class="Badge second">
			<img src="images/tetris/badge-3.png" alt="Third Place badge" class="Badge third">
		</div>
		<p>231.345</p>
	</div>
	<div id="score-board">
		<table id="tbl-head">
			<tr>
		        <th class="col1">Rank</th>
		        <th class="col2">Score</th>
		        <th class="col3">Name</th>
		        <th class="col4">Entry</th>
			</tr>
		</table>
		<div id="tbl-container">
			<table id="tbl-body">
				<!--APPEND SCORES HERE-->
			</table>
			<a href="#" id="up"></a>
			<a href="#" id="down"></a>
		</div>
		<div id="score-board-btns">
			<a href="#" id="btn-9" class="replay"><span class="hide">Replay</span></a>
			<a href="<?php echo $url_facebook ?>" id="btn-10"><span class="hide">Facebook</span></a>
			<a href="<?php echo $url_twitter ?>" id="btn-11"><span class="hide">Twitter</span></a>
		</div>
	</div>
	<div id="sure">
		<p>Are you sure?</p>
		<p class="smaller">The game wil restart! Scores will be lost</p>
		<div id="sure-btns">
			<a href="#" id="btn-12"><span class="hide">Yes</span></a>
			<a href="#" id="btn-13"><span class="hide">No</span></a>
		</div>
	</div>
</div>