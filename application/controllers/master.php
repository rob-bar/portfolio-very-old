<?php

class Master extends MY_Controller {

	//variabels
	var $data = array();

	//constructor
	public function __construct() {
		parent::__construct();
		//loading model files
		//loading helper files
		//loading librarie files
		//$this->load->library('user_agent');
		//$this->load->library('Fpdf',array('P','mm','A4'));
		//setting variabels
		$this->data['headextra'] = '';
		$this->data['footextra'] = '';
		$this->data["content"] = '';
		//profiling
		//$this->output->enable_profiler(TRUE);
	}

	//functions
	function index() {
		//loading projects
		//LOADING JS USED PLUGINS
		$this->data['headextra'] .= $this->load->view("head/canvassnakeplugins.php", '', true);
		//LOADING JS UTILS
		$this->data['headextra'] .= $this->load->view("head/jsutils.php", '', true);
		//example of how to load extra CONTENT in the body for specific pages
		$this->data['content'] .= $this->load->view("insidetemplate.php", '', true);

		//send everything loaded to the body
		$this->load->view("master.php", $this->data);
	}

	function ticket() {

	}

	function fpdfdemo() {
		$this->fpdf->AddPage();
		$this->fpdf->SetFont('Arial', 'B', 16);
		$this->fpdf->Cell(40, 10, 'Hello FPDF');
		$this->fpdf->Output();
	}

}

?>
