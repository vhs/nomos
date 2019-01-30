<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/05/2016
 * Time: 2:00 PM
 */

namespace app\endpoints\web;


use app\services\PreferenceService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class PreferenceService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PreferenceService(new ServiceContext($this)));
    }
}