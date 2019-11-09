/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var ticketIsOpen = false;
$(document).ready(function() {
	$("#arrow").mouseenter(function() {
		if(!ticketIsOpen){
			$(this).animate({
				backgroundPosition:'-2px 46px'
			},{
				duration: 500,
				easing: 'easeOutExpo'
			});
		}else{
			$(this).animate({
				backgroundPosition:'-23px 46px'
			},{
				duration: 500,
				easing: 'easeOutExpo'
			});
		}
	});
	$("#arrow").mouseleave(function() {
		if(!ticketIsOpen){
			$(this).animate({
				backgroundPosition:'3px 46px'
			},{
				duration: 500,
				easing: 'easeOutExpo'
			});
		}else{
			$(this).animate({
				backgroundPosition:'-28px 46px'
			},{
				duration: 500,
				easing: 'easeOutExpo'
			});
		}
	});
	$("#arrow").click(function() {
		if(!ticketIsOpen){
			ticketIsOpen=true;
			$(this).animate({
				backgroundPosition:'-28px 46px'
			},{
				duration: 700,
				easing: 'easeOutExpo'
			});
			$('#ticket-left').animate({
				left:'0px'
			},{
				duration: 700,
				easing: 'easeOutExpo'
			});
		}else{
			ticketIsOpen=false;
			$(this).animate({
				backgroundPosition:'3px 46px'
			},{
				duration: 700,
				easing: 'easeOutExpo'
			});
			$('#ticket-left').animate({
				left:'190px'
			},{
				duration: 700,
				easing: 'easeOutExpo'
			});
		}
		return false;
	});
	$(".toolsenabled a").mouseenter(function() {
		$(this).children('span').css('visibility', 'visible');
		$(this).css('z-index',4);
	});
	$(".toolsenabled a").mouseleave(function() {
		$(this).children('span').css('visibility', 'hidden');
		$(this).css('z-index',1);
	});
	
	$(".toolsenabled a").click(function() {
		$(this).parent().children('span').css('visibility', 'hidden');
		$(this).children('span').css('visibility', 'visible');
	});
	
	
	
});