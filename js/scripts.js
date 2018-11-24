$(document).ready(function(){

    //submission proccess
  $('.ContactForm').submit( function(){
		//statements to validate the form	
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email = document.getElementById('e-mail');
		if (!filter.test(email.value)) {
			$('.email-missing').show();
		} else {$('.email-missing').hide();}
		if (document.contact_form.name.value == "") {
			$('.name-missing').show();
		} else {$('.name-missing').hide();}	
		if (document.contact_form.message.value == "") {
			$('.message-missing').show();
		} else {$('.message-missing').hide();}		
		if ((document.contact_form.name.value == "") || (!filter.test(email.value)) || (document.contact_form.message.value == "")){
			return false;
		} 
		
		if ((document.contact_form.name.value != "") && (filter.test(email.value)) && (document.contact_form.message.value != "")) {
			//hide the form
			$('.ContactForm').hide();
		
			//show the loading bar
			$('.loader').append($('.bar'));
			$('.bar').css({display:'block'});
		
			//send the ajax request
			$.post('mail.php',{name:$('#name').val(),
							  email:$('#e-mail').val(),
							  message:$('#message').val()},
		
			//return the data
			function(data){
			  //hide the graphic
			  $('.bar').css({display:'none'});
			  $('.loader').append(data);
			});
			setTimeout('$("#backgroundPopup").fadeOut("slow"); $("#ContactForm").slideUp("fast"); $("#front_panel").show("slow")', 3500);
			return false;                    
		} 
  });

	//Show / Hide the contact form
	function show_cont_form() {
		if ($("#ContactForm").is(":hidden"))
		{
			$("#show_contact").css({"background":"url(images/contact_us_on.png) top right no-repeat"});
		  $("#front_panel").css({display:'none'});			
			$("#front_panel").animate({ width: 'hide' });
			$("#ContactForm").animate({ width: 'show' });
		}
		else{
			$("#show_contact").css({"background":"url(images/contact_us_off.png) top right no-repeat"});
		  $("#ContactForm").css({display:'none'});			
			$("#ContactForm").animate({ width: 'hide' });
			$("#front_panel").animate({ width: 'show' });
		}
	}
 
	//show contact form when any contact link is clicked
	$(".show_contact").click(function(){show_cont_form()});

	//animation for same page links #
	$('a[href*=#]').each(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		&& location.hostname == this.hostname
		&& this.hash.replace(/#/,'') ) {
		  var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
		  var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
			if ($(this.hash).length) {
				$(this).click(function(event) {
					var targetOffset = $(this.hash).offset().top;
					var target = this.hash;
					event.preventDefault();			   
					$('html, body').animate({scrollTop: targetOffset}, 450);
					return false; 
				});
			}
		}
	});

	//only need force for IE6  
	$("#backgroundPopup").css({  
		"height": document.documentElement.clientHeight 
	});  
});