<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM.
 */

use app\constants\Errors;
use app\constants\Formats;
use app\constants\StringLiterals;
use PHPUnit\Framework\TestCase;

/** @typescript */
class ConstantsTest extends TestCase {
    public function test_DateTime_DATE_TIME_MIDNIGHT() {
        $this->assertEquals('Y-m-d 00:00:00', Formats::DATE_TIME_ISO_SHORT_MIDNIGHT);
    }

    public function test_DateTime_DATE_TIME_SIMPLE() {
        $this->assertEquals('Y-m-d H:i:s', Formats::DATE_TIME_ISO_SHORT_FULL);
    }

    public function test_Errors_E_INVALID_PASSWORD_HASH() {
        $this->assertEquals('Invalid password hash', Errors::E_INVALID_PASSWORD_HASH);
    }

    public function test_StringLiterals_AuthAccessDenied() {
        $this->assertEquals('Access Denied', StringLiterals::AUTH_ACCESS_DENIED);
    }

    public function test_StringLiterals_AuthAccessGranted() {
        $this->assertEquals('Access Granted', StringLiterals::AUTH_ACCESS_GRANTED);
    }

    public function test_StringLiterals_HTTP_PREFIX() {
        $this->assertEquals('http://', StringLiterals::HTTP_PREFIX);
    }

    public function test_StringLiterals_HTTPS_PREFIX() {
        $this->assertEquals('https://', StringLiterals::HTTPS_PREFIX);
    }

    protected function setUp(): void {}

    protected function tearDown(): void {}
}
