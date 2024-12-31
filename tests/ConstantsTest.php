<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM.
 */

use app\constants\DateTime;
use app\constants\Errors;
use app\constants\StringLiterals;
use PHPUnit\Framework\TestCase;

class ConstantsTest extends TestCase {
    public function test_DateTime_DATE_TIME_MIDNIGHT() {
        $this->assertEquals('Y-m-d 00:00:00', DateTime::DATE_TIME_MIDNIGHT);
    }

    public function test_DateTime_DATE_TIME_SIMPLE() {
        $this->assertEquals('Y-m-d H:i:s', DateTime::DATE_TIME_SIMPLE);
    }

    public function test_Errors_E_INVALID_PASSWORD_HASH() {
        $this->assertEquals('Invalid password hash', Errors::E_INVALID_PASSWORD_HASH);
    }

    public function test_StringLiterals_AuthAccessDenied() {
        $this->assertEquals('"Access Denied"', StringLiterals::AUTH_ACCESS_DENIED);
    }

    public function test_StringLiterals_AuthAccessGranted() {
        $this->assertEquals('"Access Granted"', StringLiterals::AUTH_ACCESS_GRANTED);
    }

    public function test_StringLiterals_HTTP_PREFIX() {
        $this->assertEquals('http://', StringLiterals::HTTP_PREFIX);
    }

    public function test_StringLiterals_HTTPS_PREFIX() {
        $this->assertEquals('https://', StringLiterals::HTTPS_PREFIX);
    }

    protected function setUp(): void {
    }

    protected function tearDown(): void {
    }
}
