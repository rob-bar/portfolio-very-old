<?php
// 
//  tetris.php
//  portfolio_trunk
//  
//  Created by Robbie on 2012-02-17.
//  Copyright 2012 __MyCompanyName__. All rights reserved.
// 
class Tetris extends MY_Controller {
	//variabels
	var $data = array();
	var $fb_app_id = "248142925266729";
	var $fb_app_secret = "779d05436be68d7166a616a99840955d";
	//constructor
	public function __construct() {
		// Call the Controller constructor
		parent::__construct();
		//loading model files
		$this->load->model('TetrisModel');
		//loading helper files
		$this->load->helper('html');
		
		//loading librarie files
		//setting variabels
		$this->data['headextra'] = '';
		$this->data['footextra'] = '';
		$this->data["content"] = '';
	}

	//functions
	function index() {
		//LOADING JS USED PLUGINS
		$this->data['headextra'] .= $this->load->view("head/tetrisplugins.php", '', true);
		//LOADING JS UTILS
		$this->data['headextra'] .= $this->load->view("head/jsutils.php", '', true);
		//LOADING JS CANVASSNAKE CLASSES
		$this->data['headextra'] .= $this->load->view("head/tetris.php", '', true);
		//$this->data["url_twitter"] = "https://twitter.com/share?text=" . urlencode('Check out this awesome Snake game. Try to beat the highscores of your friends.');
		//$this->data["url_facebook"] = "http://www.facebook.com/sharer.php?u=" . urlencode(base_url('games/canvassnake') . "?t=" . time()) . "&t=" . urlencode("Check out this awesome Snake game. Try to beat the highscores of your friends.") . "";

		$this->data['url_twitter'] = "https://twitter.com/share?text=" . urlencode('Check out this awesome Tetris game. Try to beat the highscores. #tetris #canvas #game');
		$this->data['url_facebook'] = "http://www.facebook.com/sharer.php?u=" . urlencode(base_url('game/tetris') . "?t=" . time()) . "&t=" . urlencode("Check out this awesome Tetris game. Try to beat the highscores.") . "";
		$this->load->view('tetris.php', $this->data);
	}
	function savesscoreandgetcores(){
		//saveorupdate
		if($this->input->post() != false){
			$tetrisscore = $this->input->post();
			$tetrisscore['entry'] = date("Y-m-d h:m:s");
			$isSavedOrUpdated  = $this->TetrisModel->saveOrUpdateScore($tetrisscore);
			$returnArr = $this->getTRscores($tetrisscore['fb_id']);
			$returnArr['recordBroken'] = $isSavedOrUpdated;
			if($returnArr['recordBroken'] == true){
				//sendscore to fb
				$returnArr['fb_post_success'] =	$this->publishScoretoFb($tetrisscore);
			}
			$this->output->set_content_type('application/json');
			$this->output->set_output(json_encode($returnArr));
		}else{
			$returnArr = $this->getTRscores();
			$this->output->set_content_type('application/json');
			$this->output->set_output(json_encode($returnArr));
		}
	}
	function getJSONscores(){
		//getAll
		$returnArr = $this->getTRscores();
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($returnArr));
	}
	function getTRscores($fb_id = 0){
			$data['query'] = $this->TetrisModel->getAlltetrisScores();
			$returnData = array();
			$cnt = 0;
			$returnData['tableflow'] ='';
			foreach ($data['query']->result() as $row) {
				$cnt++;
				if(($fb_id != 0 && $fb_id == $row->fb_id)){
					$returnData['position'] = $cnt;
					$returnData['page'] = floor(($cnt - 1) / 10);
					if($cnt != 1 && $cnt != 2 && $cnt != 3){
						$returnData['tableflow'] .= '<tr>' .
						'<td class="col1 myscore">' . $cnt . '</td>' .
						'<td class="col2 myscore">' . $row->score . '</td>' .
						'<td class="col3 myscore">' . $row->name . '</td>' .
						'<td class="col4 myscore">' . date_format(date_create($row->entry), 'd/m/Y') . '</td>' .
						'</tr>';
					}else{
						$returnData['tableflow'] .= '<tr>' .
						'<td class="col1">' . $cnt . '</td>' .
						'<td class="col2">' . $row->score . '</td>' .
						'<td class="col3">' . $row->name . '</td>' .
						'<td class="col4">' . date_format(date_create($row->entry), 'd/m/Y') . '</td>' .
						'</tr>';
					}
				}else{
					$returnData['tableflow'] .= '<tr>' .
					'<td class="col1">' . $cnt . '</td>' .
					'<td class="col2">' . $row->score . '</td>' .
					'<td class="col3">' . $row->name . '</td>' .
					'<td class="col4">' . date_format(date_create($row->entry), 'd/m/Y') . '</td>' .
					'</tr>';
				}
			}
			//adding the next Rows at the end
			$rest = $cnt % 10;
			if($rest != 0){
				for ($cnt_l = 0; $cnt_l < (10 - $rest); $cnt_l++) {
					$returnData['tableflow'] .= '<tr>' .
						'<td class="col1">' . nbs() . '</td>' .
						'<td class="col2">' . nbs() . '</td>' .
						'<td class="col3">' . nbs() . '</td>' .
						'<td class="col4">' . nbs() . '</td>' .
						'</tr>';
				}
			}
			return $returnData;
	}
	
	function publishScoretoFb($tetrisscore){
		$score_URL = 'https://graph.facebook.com/' . $tetrisscore['fb_id'] . '/scores';
		$score_result = $this->https_post($score_URL,'score=' . $tetrisscore['score'] . '&access_token=' . $this->getToken());
		return $score_result;
	}
	function https_post($uri, $postdata) {
	    $ch = curl_init($uri);
	    curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
	    $result = curl_exec($ch);
	    curl_close($ch);
	    return $result;
	}
	function getToken(){
		$token_url = 'https://graph.facebook.com/oauth/access_token?'
		    . 'client_id=' . $this->fb_app_id
		    . '&client_secret=' . $this->fb_app_secret
		    . '&grant_type=client_credentials';
		$token_response = file_get_contents($token_url);
		$params = null;
		parse_str($token_response, $params);
		$app_access_token = $params['access_token'];
		return $app_access_token;
	}
}

?>
