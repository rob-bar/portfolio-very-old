<?php

class Examples extends MY_Controller {

	//variabels
	var $data = array();

	//constructor
	function Examples() {
		parent::Controller();
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

	function index() {

		//user agent managment For redirecting if IE or if Mobile
		//then you can load different views and different css and js
		if ($this->agent->is_browser()) {
			$agent = $this->agent->browser() . ' ' . $this->agent->version();
		} elseif ($this->agent->is_mobile()) {
			$agent = $this->agent->mobile();
		}
		$this->data["agent"] = $agent;


		//logging example to firephp
		$this->firephp->fb("Hellow world from firePHP");



//MODULES
		//example of how to load extra MODULES in the head for specific pages
		//TINY MCE MODULE
		//$this->data['headextra'] .= $this->load->view("head/head_tinymce.php", '', true);
		//COLOR BOX MODULE
		//$this->data['headextra'] .= $this->load->view("head/colorbox.php", '', true);
		//CUFON MODULE
		//$this->data['headextra'] .= $this->load->view("head/cufon.php", '', true);
		//$this->data['footextra'] .= '<script type="text/javascript" src="js/cufon/cufon.util.foot.js"></script>';
		//IE FIXES MODULE
		//$this->data['headextra'] .= $this->load->view("head/iefixes.php", '', true);
		//JS_CALENDER MODULE
		// $this->data['headextra'] .= '<link rel="stylesheet" type="text/css" href="css/calendar/calendar.css" />';
		//also loaded in the content for the demo at the **datepicker**
		//CUSTOMCHECKBOX MODULE
		//$this->data['headextra'] .= $this->load->view("head/customCheckbox.php", '', true);
		//CUSTOMDROPDOWN MODULE
		//$this->data['headextra'] .= $this->load->view("head/customDropdown.php", '', true);
		//TABLESORTING MODULE
		//$this->data['headextra'] .= $this->load->view("head/tableSorter.php", '', true);
		//ACCORDION MODULE
		//$this->data['headextra'] .= $this->load->view("head/accordion.php", '', true);
		//COLORPICKER MODULE
		//$this->data['headextra'] .= $this->load->view("head/colorPicker.php", '', true);
//MODULES
		//example of how to load extra CONTENT in the body for specific pages
		$this->data['content'] .= $this->load->view("insidetemplate.php", '', true);

		//**datepicker**
		//$this->data['content'] .= $this->load->view("calenderexample.php", '', true);
		//send everything loaded to the body
		$this->load->view("master.php", $this->data);
	}

}

?>