<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM
 */

namespace app\contracts;


use vhs\services\IContract;

interface IPaymentService1 extends IContract {
  /**
    * @permission administrator|user
    */
  public function GetPaginated($offset, $limit);
}