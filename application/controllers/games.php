<?php

/*
 * php file by Bardijn Robbie
 * copywrite polygonegroup
 */

class Games extends MY_Controller {

	//variabels
	var $data = array();

	//constructor
	public function __construct() {
		// Call the Controller constructor
		parent::__construct();

		//loading model files
		//loading helper files
		$this->load->helper('html');
		$this->load->helper('url');
		$this->load->model('Score');

		//loading librarie files
		//setting variabels
		$this->data['headextra'] = '';
		$this->data['footextra'] = '';
		$this->data["content"] = '';
	}

	//functions
	function index() {
		redirect("");
	}

	//CANVASSNAKE
	function canvassnake() {
		//LOADING JS USED PLUGINS
		$this->data['headextra'] .= $this->load->view("head/canvassnakeplugins.php", '', true);
		//LOADING JS UTILS
		$this->data['headextra'] .= $this->load->view("head/jsutils.php", '', true);
		//LOADING JS CANVASSNAKE CLASSES
		$this->data['headextra'] .= $this->load->view("head/canvassnake.php", '', true);
		$this->data["url_twitter"] = "https://twitter.com/share?text=" . urlencode('Check out this awesome Snake game. Try to beat the highscores of your friends.');
		$this->data["url_facebook"] = "http://www.facebook.com/sharer.php?u=" . urlencode(base_url('games/canvassnake') . "?t=" . time()) . "&t=" . urlencode("Check out this awesome Snake game. Try to beat the highscores of your friends.") . "";
		$this->load->view("canvassnake.php", $this->data);
	}

	function canvassnakeajaxgetscores() {
		$data['query'] = $this->Score->get_all_scores();
		$returnData = '';
		$cnt = 0;
		foreach ($data['query']->result() as $row) {
			$cnt++;
			$returnData .= '<tr>' .
				'<td class="col1">' . $cnt . '</td>' .
				'<td class="col2">' . $row->score . '</td>' .
				'<td class="col3">' . $row->time . '</td>' .
				'<td class="col4">' . $row->name . '</td>' .
				'<td class="col5">' . $row->entry_date . '</td>' .
				'</tr>';
		}
		//adding the next Rows at the end
		$rest = $cnt % 10;
		for ($cnt_l = 0; $cnt_l < (10 - $rest); $cnt_l++) {
			$returnData .= '<tr>' .
				'<td class="col1">' . nbs() . '</td>' .
				'<td class="col2">' . nbs() . '</td>' .
				'<td class="col3">' . nbs() . '</td>' .
				'<td class="col4">' . nbs() . '</td>' .
				'<td class="col5">' . nbs() . '</td>' .
				'</tr>';
		}
		echo $returnData;
	}

	function canvassnakeSaveScore() {
		$canvasscore = $_POST;
		$canvasscore["score"] = substr($canvasscore["score"], 8, strlen($canvasscore["score"]) - 1);
		$canvasscore["time"] = "00:" . substr($canvasscore["time"], 5, 2) . ":" . substr($canvasscore["time"], 10, 2);
		$canvasscore["entry_date"] = date("Y-m-d h:m:s");
		$canvasscore["game_id"] = 1;
		$this->Score->insert_score($canvasscore);
	}

	function canvassnakeajaxgeturlscoretwitter($score) {
		$str = "https://twitter.com/share?text=" . urlencode('Try to beat my Highscore(' . $score . ') at this #snake #canvas #game.');
		echo $str;
	}

	function canvassnakeajaxgeturlscorefacebook($score) {
//		$str = "http://www.facebook.com/sharer.php?u=http://google.be&t=title";
		$str = "http://www.facebook.com/sharer.php?u=" . urlencode(base_url('games/canvassnake') . "?t=" . time()) . "&t=" . urlencode("Try to beat my Highscore(" . $score . ") at this snake canvas game.") . "";
		echo $str;
	}

	//ASTEROIDS
	function asteroids(){
		
		//LOADING JS USED PLUGINS
		$this->data['headextra'] .= $this->load->view("head/asteroidshelp.php", '', true);
		//LOADING JS ASTEROIDS CLASSES
		$this->data['headextra'] .= $this->load->view("head/asteroids.php", '', true);
		$this->load->view("asteroids.php", $this->data);
	}
	
}

?>