/**
 * App Betta Interativa
 */

'use strict'

$(window).on('load', function() {
	$('#loading').fadeOut()
})

$(function() {

	// setTimeout(function(){
	// 	$('#loading').fadeOut()
	// },1000)
	// 
	// :not([href*="#"])
	// 
	$('a:not([href*="#"],[href*="mailto"],[href*="tel"],[href*="whatsapp"])').on('click', function(e)
	{
		var url    = $(this).attr('href'),
			target = $(this).attr('target')

		if (!target) { 
			e.preventDefault()

			$('#loading').fadeIn(300)

			setTimeout(function() {
				window.location = url
			}, 300)
		}
	})

	/**
	 * init vars
	 */	
	var $formContato   = $("#form-contato")

	menu()
	carousel()
	bindFormConsult()

	function menu()
	{
		var $btnMenu = $('#btn-menu'),
			$menu    = $('.menu'),
			$social  = $('.social'),
			$topBar  = $('.topbar')

		$btnMenu.on('click', function(){
			$(this).toggleClass('-checked')
			$menu.toggleClass('-open')
			$social.toggleClass('-open')
			$topBar.toggleClass('-menu-open')
		});

		if (window.innerWidth < 993)
		{
			$('.page-contato').on('click', function() {
				$btnMenu.removeClass('-checked')
				$navMenu.removeClass('-open')
				$topBar.removeClass('-menu-open')
			})
		}
	}

	function carousel()
	{
		$('.treatments .carousel').slick({
			draggable: true,
			swipe: true,
			touchMove: true,
			centerMode: false,
			centerPadding: '0',
			slidesToShow: 5,
			slidesToScroll: 1,
			infinite: true,
			speed: 400,
			initialSlide: 0,
			slide: '.treatments .carousel .item',
			dots: false,
			arrows: true,
			prevArrow: $('.treatments .carousel .btn-prev'),
			nextArrow: $('.treatments .carousel .btn-next'),
			responsive: [
			{
				breakpoint: 2000,
				settings: {
					slidesToShow: 4,
					// initialSlide: 1,
					centerMode: true,
					centerPadding: '60px'
				}
			},{
				breakpoint: 1441,
				settings: {
					slidesToShow: 3,
					// initialSlide: 1,
					centerMode: true,
					centerPadding: '60px'
				}
			},{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					// initialSlide: 1,
					dots: true,
					arrows: false,
					centerMode: true,
					centerPadding: '60px'
				}
			},{
				breakpoint: 768,
				settings: {
					// initialSlide: 1,
					slidesToShow: 1,
					dots: true,
					arrows: false,
					centerMode: true,
					centerPadding: '7px'
				}
			}]
		})
	}

	function bindFormConsult()
	{
		$.datetimepicker.setLocale('pt')

		var arrayAvailable = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00']

		$('#field-data').datetimepicker({
			timepicker: false,
			format:'d/m/Y'
		})

		$('#field-horario').datetimepicker({
			datepicker:false,
			format:'H:i',
			allowTimes: arrayAvailable
		})

		$('#field-assunto').on('change',function(){
			var val = $(this).val(),
				$data = $('#field-data').parent().parent().parent().parent(),
				$horario = $('#field-horario')

			if (val != 0) {
				$data.fadeOut('400', function() {
					$('#field-nome').focus()
				})
			} else {
				$data.fadeIn('400')
			}
		})

		/* Enable/Disable form */
		$('#field-nome, #field-mensagem').keyup(function(){
			if ( ($('#field-nome').val() != "") && ($('#field-mensagem').val() != "") ) {
				disableForm()
			}
			if ( ($('#field-nome').val() == "") || ($('#field-mensagem').val() == "") ) {
				enableForm()
			}
		})

		var disableForm = function () {
			$('#submit').removeClass('disabled').removeAttr('disabled')
		}

		var enableForm = function() {
			$('#submit').addClass('disabled').attr('disabled', 'disabled')
		}
	}

	$formContato.on('submit',function(e) {
		e.preventDefault()

		var _this = this

		var	assunto    = $("#field-assunto").val(),
			nome       = $("#field-nome").val(),
			nome_      = nome.trim(),
			nome__     = nome.split(' '),
			name       = nome__[0],
			email      = $("#field-email").val(),
			email_     = email.trim(),
			telefone   = $("#field-telefone").val(),
			data       = $("#field-data").val(),
			horario    = $("#field-horario").val(),
			mensagem   = $("#field-mensagem").val(),
			dataString = 'assunto='+assunto+'&nome='+ nome_ + '&email=' + email_ + '&telefone=' + telefone + '&data=' + data + '&horario=' + horario + '&mensagem=' + mensagem

        // if((nome != "") && (email != "") && (telefone != "") && (mensagem != "")) {

        	$.ajax({
	            type: "POST",
	            // url: "../inc/sendmail.php",
	            url: "http://odontolago.com.br/inc/sendmail.php",
	            data: dataString,
	            success: function(){
        			return response('success', name, _this)
	            },
	            error: function(){
        			return response('error', name, _this)
	            }
	        })
	        
	        // return response('error', name, this)

        // } else {

        // 	if (nome == ""){
        // 		$('#field-nome').focus()
        // 	} else if (email == ""){
        // 		$('#field-email').focus()
        // 	} else if (telefone == ""){
        // 		$('#field-telefone').focus()
        // 	} else if (mensagem == ""){
        // 		$('#field-mensagem').focus()
        // 	} 

        // }

        // return false
    })

	function response(response, name, form)
	{
		var load = '<div class="loading-submit"><span class="load"></span></div>',
			$parentForm = $(form).parent()

		// 	if (form == 'contato') {
		// 		$parentForm = $('.form')
		// 		console.log('form contato');
		// 	}
		// 	else { (form == 'inscricao')
		// 		$parentForm = $('.col-form')

		// 	console.log('form inscricao');
		// }

		$parentForm.children('form').addClass('-inactive')
		$parentForm.prepend(load)
		// $('.form .submit').html('Enviando...')
		// $('.form .submit').attr('disabled','disabled')

		var divWarning = '<div class="response "><div class="warning"></div></div>',
			success_msg = 'Obrigado <span class="name">'+name+'!</span> <br> Sua mensagem foi enviado com sucesso. <br> Responderemos o mais breve possível.',
			error_msg = 'Desculpe o incômodo <span class="name">'+name+'</span>,<br> aconteceu um erro em nossos servidores.<br> Tente novamente mais tarde.'

		$parentForm.append(divWarning)
		$('.response .warning').html('')

		if(response == 'success'){
			$('.response .warning').append(success_msg)
		} else if(response == 'error'){
			$('.response .warning').append(error_msg)
		}
		
		setTimeout(function(){
			$('.response').addClass('-active')
			$parentForm.find('.loading-submit').remove()
		}, 3000)

		setTimeout(function(){
			location.reload()
		}, 8000)
	}

})