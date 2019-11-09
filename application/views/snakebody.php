<div id="bg"></div>
<div id="content">
<?php $this->load->view("browsererror.php"); ?>
	<canvas id="canvas" width="1000" height="575">Your Browser does not support HTML5 Canvas.</canvas>
	
	<div id="buttons-introscreen">
		<a href="#" id="btn-1"><span class="hide">Infinite hunger</span></a>
		<a href="#" id="btn-2"><span class="hide">Take the position</span></a>
		<div id="keys-expl">use the arrows on the keyboard to move</div>
	</div>
	<div id="ingame">
		<div id="buttons-ingame">
			<a href="#" id="btn-1-ingame"><span class="hide">Infinite hunger</span></a>
			<a href="#" id="btn-2-ingame"><span class="hide">Take the position</span></a>
		</div>

		<div id="general-share-buttons">
			<a href="<?php echo $url_facebook ?>" id="btn-1-share"><span class="hide">Facebook</span><span class="tooltipshare"></span></a>
			<a href="<?php echo $url_twitter ?>" id="btn-2-share"><span class="hide">Twitter</span><span class="tooltipshare"></span></a>
			<span id="balloon-1">share on facebook</span>
			<span id="balloon-2">tweet on Twitter</span>
		</div>
		<div id="scoreboard">
			<p id="info-1">score 0</p>
			<p id="info-2"><span>lifes&nbsp;</span></p>
			<p id="info-3">time 00 : 00</p>
		</div>
	</div>
	<div id="game-over">
		<div id="game-over-head"></div>
		<p id="game-over-score">SCORE : 25400</p>
		<div id="game-over-buttons">
			<a href="#" class="b_btn" id="btn-1-game-over"><span class="hide">replay</span></a>
			<div class="b_btn" id="btn-2-game-over">
				<span class="hide">submit score</span>
				<span id="tooltip-game-over" class="tooltip">
					<input type="text" title="Name" value="Name"  name="name" class="clearMeFocus" id="txt-name-tt1">
					<a href="#" class="game-over-tt-btn1"><span class="hide">Save</span></a>
					<a href="#" class="game-over-tt-btn2" target="_blank"><span class="hide">Facebook</span></a>
					<a href="#" class="game-over-tt-btn3" target="_blank"><span class="hide">Twitter</span></a>
				</span>
			</div>
			<a href="#" class="b_btn" id="btn-3-game-over"><span class="hide">leaderboard</span></a>
		</div>
	</div>

	<div id="score-board">
		<div id="score-board-head"></div>
		<div id="score-board-btnup" class="score-board-btn"></div>
		<div id="score-board-btndown" class="score-board-btn"></div>
		<table id="score-board-tbl1">
			<tr>
				<th class="col1">Rank</th>
				<th class="col2">Score</th>
				<th class="col3">Time</th>
				<th class="col4">Name</th>
				<th class="col5">Entry Date</th>
			</tr>
		</table>
		<div id="tbl-container">
			<table id="score-board-tbl2">
				<!-- APPEND SCORES HERE -->
			</table>
		</div>
		<div id="score-board-buttons">
			<a href="#" class="b_btn" id="btn-1-score-board"><span class="hide">replay</span></a>
			<a href="#" class="bb_btn" id="btn-4-score-board"><span class="hide">leaderboard</span></a>
		</div>
	</div>


	<p id="footer"><a href="<?php echo(base_url()) ?>">Robbie Bardijn</a> &copy; 2011 | HTML5 | Canvas 2D</p>
</div>