<?php

class Score extends CI_Model {
	function __construct() {
		// Call the Model constructor
		parent::__construct();
	}

	function get_all_scores() {
		$this->db->select('*');
		$this->db->from('scores');
		$this->db->order_by("score", "desc");
		$this->db->order_by("time", "asc");
		$query = $this->db->get();
		foreach ($query->result() as $row) {
			if (strlen($row->score) > 3 && strlen($row->score) <= 6) {
				$row->score = substr($row->score, 0, strlen($row->score) - 3) . '.' . substr($row->score, strlen($row->score) - 3, strlen($row->score) - 1);
			}
			$row->time = date_format(date_create($row->time), 'i : s');
			$row->entry_date = date_format(date_create($row->entry_date), 'd/m/Y');
		}
		return $query;
	}

	function insert_score($score) {
		$this->db->insert('scores', $score);
	}
	function checkName($name){
		$this->db->select('*');
		$this->db->from('scores');
		$this->db->where('name', trim($name)); 
		$query = $this->db->get();
		if ($query->num_rows() > 0){
			return true;
		}else{
			return false;
		}
	}
	
}
?>