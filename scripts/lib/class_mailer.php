<?php
  /**
   * Mailer Class
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: class_mailer.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');

  class Mailer
  {
	  
      private $mailer;
      private $smtp_host;
      private $smtp_user;
      private $smtp_pass;
      private $smtp_port;
	  private $is_ssl;
	  
	  
      /**
       * Mailer::__construct()
       * 
       * @return
       */
      function __construct()
      {          
          $this->mailer = Registry::get("Core")->mailer;
          $this->smtp_host = Registry::get("Core")->smtp_host;
          $this->smtp_user = Registry::get("Core")->smtp_user;
          $this->smtp_pass = Registry::get("Core")->smtp_pass;
          $this->smtp_port = Registry::get("Core")->smtp_port;
		  $this->is_ssl = Registry::get("Core")->is_ssl;
      }
	  
      /**
       * Mailer::sendMail()
       * 
	   * Sends a various messages to users
       * @return
       */
	  function sendMail()
	  {
		  require_once(BASEPATH . 'lib/swift/swift_required.php');
		  
          if ($this->mailer == "SMTP") {
			  $SSL = ($this->ssl) ? 'ssl' : null;
              $transport = Swift_SmtpTransport::newInstance($this->smtp_host, $this->smtp_port, $SSL)
						  ->setUsername($this->smtp_user)
						  ->setPassword($this->smtp_pass);
          } else
              $transport = Swift_MailTransport::newInstance();
          
          return Swift_Mailer::newInstance($transport);
	  }
	  
  }
  $mail = new Mailer();
?>