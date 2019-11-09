/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    $(document).ready(function() {
	// call the tablesorter plugin
	$("table").tablesorter({
		// sort on the first column and third column, order asc
        widgets: ['zebra'],
		sortList: [[0,0]]
	});
});
