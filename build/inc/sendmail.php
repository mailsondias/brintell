<?php
if ($_POST) {
	// if(!isset($_POST[Submit])) die("N&atilde;o recebi nenhum par&acitc;metro. Por favor volte ao formulario.html antes");
	/* Medida preventiva para evitar que outros dom�nios sejam remetente da sua mensagem. */
	if (eregi('tempsite.ws$|locaweb.com.br$|hospedagemdesites.ws$|websiteseguro.com$', $_SERVER[HTTP_HOST])) {
	    $emailsender = 'site@odontolago.com.br';
	} else {
        $emailsender = "site@odontolago.com.br";
        // $emailsender = "contato@" . $_SERVER[HTTP_HOST];
        //    Na linha acima estamos for�ando que o remetente seja 'webmaster@seudominio',
        // voc� pode alterar para que o remetente seja, por exemplo, 'contato@seudominio'.
	}
	 
	/* Verifica qual � o sistema operacional do servidor para ajustar o cabe�alho de forma correta. N�o alterar */
	if(PHP_OS == "Linux") $quebra_linha = "\n"; //Se for Linux
	elseif(PHP_OS == "WINNT") $quebra_linha = "\r\n"; // Se for Windows
	else die("Este script nao esta preparado para funcionar com o sistema operacional de seu servidor");
	 
	// Passando os dados obtidos pelo formul�rio para as vari�veis abaixo
	// $nomeremetente     = $_POST['nomeremetente'];
	$emailremetente    = "site@odontolago.com.br";
	$emaildestinatario = "contato@odontolago.com.br";
	// $emaildestinatario = "mamagt@gmail.com";
	// $comcopia          = trim($_POST['comcopia']);
	// $comcopiaoculta    = trim($_POST['comcopiaoculta']);

	$assunto  = $_POST['assunto'];
	$nome     = $_POST['nome'];
	$email    = trim($_POST['email']);
	$telefone = $_POST['telefone'];
	$data     = $_POST['data'];
	$horario  = $_POST['horario'];
	$mensagem = $_POST['mensagem'];
	 
	/* Montando a mensagem a ser enviada no corpo do e-mail. */
	$message 						   	  = '<html><body>';
	$message 						  	 .= "<h3><font color='#d65345'>".$assunto."</font></h3>";
	$message 						  	 .= "<p><strong>Nome:</strong> " . $nome . "</p>";
	if(trim($email) != ""){  $message 	 .=  "<p><strong>E-mail:</strong> " . $email . "</p>"; }
	if(trim($telefone) != ""){  $message .=  "<p><strong>Telefone(s):</strong> " . $telefone . "</p>"; }
	if($data != ""){  $message 			 .=  "<p><strong>Data:</strong> " . $data . "</p>"; }
	if($horario != ""){  $message 		 .=  "<p><strong>Hor&aacute;rio:</strong> " . $horario . "</p>"; }
	$message 							 .=  "<p><strong>Mensagem:</strong> " . $mensagem . "</p>";
	$message 							 .= '<p>--</p>';
	$message 						     .= '<p><strong><font color="#d65345">Odontolago</font></strong><br><font color="#666666">E-mail enviado atrav&eacute;s do site.</font></p>';
	$message 							 .= '</body></html>';

	// $message = '<P>Esse email &eacute; um teste enviado no formato HTML via PHP mail();!</P>
	// <P>Aqui est&aacute; a mensagem postada por voc&ecirc; formatada em HTML:</P>
	// <p><b><i>'.$mensagem.'</i></b></p>
	// <hr>';
	 
	/* Montando o cabe�alho da mensagem */
	$headers = "MIME-Version: 1.1".$quebra_linha;
	// $headers .= "Content-type: text/html; charset=iso-8859-1".$quebra_linha;
	$headers .= "Content-type: text/html; charset=utf-8".$quebra_linha;
	// Perceba que a linha acima cont�m "text/html", sem essa linha, a mensagem n�o chegar� formatada.
	$headers .= "From: ".$emailsender.$quebra_linha;
	$headers .= "Return-Path: " . $emailsender . $quebra_linha;
	// Esses dois "if's" abaixo s�o porque o Postfix obriga que se um cabe�alho for especificado, dever� haver um valor.
	// Se n�o houver um valor, o item n�o dever� ser especificado.
	// if(strlen($comcopia) > 0) $headers .= "Cc: ".$comcopia.$quebra_linha;
	// if(strlen($comcopiaoculta) > 0) $headers .= "Bcc: ".$comcopiaoculta.$quebra_linha;
	$headers .= "Reply-To: ".$emailremetente.$quebra_linha;

	if(!mail($emaildestinatario, $assunto, $message, $headers ,"-r".$emailsender)){ // Se for Postfix
	    $headers .= "Return-Path: " . $emailsender . $quebra_linha; // Se "n�o for Postfix"
	    mail($emaildestinatario, $assunto, $mnessage, $headers );
	    return true;
	} else {
		return false;
	}
} else {
	return false;
}
?>