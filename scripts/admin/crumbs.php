<?php
  /**
   * Crumbs Navigation
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2011
   * @version $Id: footer.php, v2.00 2013-05-08 10:12:05 gewa Exp $
   */

  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php
  switch (Filter::$do) {
      case "users";

          switch (Filter::$action) {
              case "edit":
                  echo '<i class="icon-group"></i> User Management';
                  break;
              case "add":
                  echo '<i class="icon-group"></i> User Management';
                  break;
              default:
                  echo '<i class="icon-group"></i> User Management';
                  break;
          }

          break;

      case "config":

      default:
          echo '<i class="icon-cog"></i> System Configuration';
          break;

      case "backup":

      default:
          echo '<i class="icon-hdd"></i> Database Maintenance';
          break;

      case "maintenance":

      default:
          echo '<i class="icon-cog"></i> System Maintenance';
          break;
		  
      case "gateways":

          switch (Filter::$action) {
              case "edit":
                  echo '<i class="icon-credit-card"></i> Manage Payment Gateways';
                  break;
              default:
                  echo '<i class="icon-credit-card"></i> Manage Payment Gateways';
                  break;
          }


          break;

      case "news":

          switch (Filter::$action) {
              case "edit":
                  echo '<i class="icon-file-text-alt"></i> Manage News Announcements';
                  break;
              case "add":
                  echo '<i class="icon-file-text-alt"></i> Manage News Announcements';
                  break;
              default:
                  echo '<i class="icon-file-text-alt"></i> Manage News Announcements';
                  break;
          }

          break;

      case "templates":

          switch (Filter::$action) {
              case "edit":
                  echo '<i class="icon-file-text"></i> Manage Email Templates';
                  break;
              case "add":
                  echo '<i class="icon-file-text"></i> Manage Email Templates';
                  break;
              default:
                  echo '<i class="icon-file-text"></i> Manage Email Templates';
                  break;
          }

          break;

      case "memberships":

          switch (Filter::$action) {
              case "edit":
                  echo '<i class="icon-group"></i> Manage Memberships';
                  break;
              case "add":
                  echo '<i class="icon-group"></i> Manage Memberships';
                  break;
              default:
                  echo '<i class="icon-group"></i> Manage Memberships';
                  break;
          }

          break;
		  
      case "newsletter":

      default:
          echo '<i class="icon-envelope"></i> System Newsletter Manager';
          break;

      case "help-login":

      default:
          echo '<i class="icon-question-sign"></i> Login Protection';
          break;

      case "help-redirect":

      default:
          echo '<i class="icon-question-sign"></i> Login Redirect';
          break;

      case "help-member":

      default:
          echo '<i class="icon-question-sign"></i> Membership Based Protection';
          break;

      case "help-cron":

      default:
          echo '<i class="icon-question-sign"></i> Cron Jobs';
          break;

      case "builder":

      default:
          echo '<i class="icon-coffee"></i> Page Builder';
          break;
		     
      case "transactions":

      default:
          echo '<i class="icon-credit-card"></i> Transaction Management';
          break;


      default:
          echo '<i class="icon-microphone"></i> Admin Dashboard';

      break;
  }
?>