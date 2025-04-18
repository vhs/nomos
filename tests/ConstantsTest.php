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
    /**
     * test_DateTime_DATE_TIME_MIDNIGHT.
     *
     * @return void
     */
    public function test_DateTime_DATE_TIME_MIDNIGHT(): void {
        $this->assertEquals('Y-m-d 00:00:00', Formats::DATE_TIME_ISO_SHORT_MIDNIGHT);
    }

    /**
     * test_DateTime_DATE_TIME_SIMPLE.
     *
     * @return void
     */
    public function test_DateTime_DATE_TIME_SIMPLE(): void {
        $this->assertEquals('Y-m-d H:i:s', Formats::DATE_TIME_ISO_SHORT_FULL);
    }

    /**
     * test_Errors_E_INVALID_PASSWORD_HASH.
     *
     * @return void
     */
    public function test_Errors_E_INVALID_PASSWORD_HASH(): void {
        $this->assertEquals('Invalid password hash', Errors::E_INVALID_PASSWORD_HASH);
    }

    /**
     * test_StringLiterals_AuthAccessDenied.
     *
     * @return void
     */
    public function test_StringLiterals_AuthAccessDenied(): void {
        $this->assertEquals('Access Denied', StringLiterals::AUTH_ACCESS_DENIED);
    }

    /**
     * test_StringLiterals_AuthAccessGranted.
     *
     * @return void
     */
    public function test_StringLiterals_AuthAccessGranted(): void {
        $this->assertEquals('Access Granted', StringLiterals::AUTH_ACCESS_GRANTED);
    }

    /**
     * test_StringLiterals_HTTP_PREFIX.
     *
     * @return void
     */
    public function test_StringLiterals_HTTP_PREFIX(): void {
        $this->assertEquals('http://', StringLiterals::HTTP_PREFIX);
    }

    /**
     * test_StringLiterals_HTTPS_PREFIX.
     *
     * @return void
     */
    public function test_StringLiterals_HTTPS_PREFIX(): void {
        $this->assertEquals('https://', StringLiterals::HTTPS_PREFIX);
    }

    protected function setUp(): void {
        // Override
    }

    /**
     * tearDown.
     *
     * @return void
     */
    protected function tearDown(): void {
        // Override
    }
}
