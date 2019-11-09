<?php
class TetrisModel extends CI_Model {

	function __construct() {
		// Call the Model constructor
		parent::__construct();
	}
	
	function saveOrUpdateScore($score_object){
		$this->db->select('*');
		$this->db->from('tetris');
		$this->db->where('fb_id', $score_object['fb_id']); 
		$query = $this->db->get();
		if ($query->num_rows() == 1){
			//update
			if($query->first_row()->score < $score_object['score']){
				$this->db->where('fb_id', $score_object['fb_id']);
				$this->db->update('tetris', $score_object);
				return true;
			}else{
				return false;
			}
			return false;
		}else{
			//save
			$this->db->insert('tetris', $score_object);
			return true;
		}
	}
	
	function getAlltetrisScores(){
			$this->db->select('*');
			$this->db->from('tetris');
			$this->db->order_by("score", "desc");
			$query = $this->db->get();
			return $query;
	}
}
?>