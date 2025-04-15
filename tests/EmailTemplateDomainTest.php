<?php

use app\domain\EmailTemplate;
use app\services\EmailService;
use PHPUnit\Framework\TestCase;
use vhs\database\Database;
use vhs\database\engines\memory\InMemoryEngine;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 24/02/16
 * Time: 10:17 AM.
 */
class EmailTemplateDomainTest extends TestCase {
    /** @var InMemoryEngine */
    private static $engine;
    /** @var Logger */
    private static $logger;

    private $ids = [];

    public function test_Service() {
        $service = new EmailService();

        $rows = array_map(fn($row): array => get_object_vars($row), array: json_decode(json_encode($service->ListTemplates(1, 1, 'id', 'id', ''))));

        $this->assertCount(1, $rows);

        $this->assertCount(1, $rows[0]);

        $this->assertEquals(1, $rows[0]['id']);

        $id = $rows[0]['id'];

        $template = $service->GetTemplate($id);

        $this->assertEquals($id, $template->id);
        $this->assertEquals('This is the most random template, srsly', $template->name);
        $this->assertEquals('some_random_name', $template->code);
        $this->assertEquals('{{a}} {{other_value}} asdf', $template->subject);
        $this->assertEquals('some help text to describe whatever this is', $template->help);
        $this->assertEquals('{{a}} {{other_value}} qwer', $template->body);
        $this->assertEquals('<b>{{a}}</b> {{other_value}} zxcv', $template->html);

        $service->UpdateTemplateName($template->id, 'asdf');
        $service->UpdateTemplateCode($template->id, 'asdf');
        $service->UpdateTemplateSubject($template->id, 'asdf');
        $service->UpdateTemplateHelp($template->id, 'asdf');
        $service->UpdateTemplateBody($template->id, 'asdf');
        $service->UpdateTemplateHtml($template->id, 'asdf');

        $template = $service->GetTemplate($id);

        $this->assertEquals('asdf', $template->name);
        $this->assertEquals('asdf', $template->code);
        $this->assertEquals('asdf', $template->subject);
        $this->assertEquals('asdf', $template->help);
        $this->assertEquals('asdf', $template->body);
        $this->assertEquals('asdf', $template->html);

        $service->PutTemplate('zxcv', 'asdf', 'zxcv', 'zxcv', 'zxcv', 'zxcv');

        $rows = $service->ListTemplates(1, 1, 'id', 'id', '');

        $this->assertCount(1, $rows);

        $template = $service->GetTemplate($id);

        $this->assertEquals('zxcv', $template->name);
        $this->assertEquals('asdf', $template->code);
        $this->assertEquals('zxcv', $template->subject);
        $this->assertEquals('zxcv', $template->help);
        $this->assertEquals('zxcv', $template->body);
        $this->assertEquals('zxcv', $template->html);

        $service->DeleteTemplate($id);

        $template = $service->GetTemplate($id);

        $this->assertNull($template);

        $rows = $service->ListTemplates(1, 1, 'id', 'id', '');

        $this->assertCount(0, $rows);

        $service->PutTemplate('qwer', 'qwer', 'qwer', 'qwer', 'qwer', 'qwer');

        $rows = array_map(fn($row): array => get_object_vars($row), json_decode(json_encode($service->ListTemplates(1, 1, 'id', 'id', ''))));

        $this->assertCount(1, $rows);

        $this->assertCount(1, $rows[0]);

        $this->assertEquals(2, $rows[0]['id']);

        $id = $rows[0]['id'];

        $template = $service->GetTemplate($id);

        $this->assertEquals('qwer', $template->name);
        $this->assertEquals('qwer', $template->code);
        $this->assertEquals('qwer', $template->subject);
        $this->assertEquals('qwer', $template->help);
        $this->assertEquals('qwer', $template->body);
        $this->assertEquals('qwer', $template->html);
    }

    public function test_Template() {
        $generated = EmailTemplate::generate('some_random_name', [
            'a' => 'the value for a',
            'other_value' => 'some other value',
            'random' => 'random'
        ]);

        $this->assertEquals('the value for a some other value asdf', $generated->subject);
        $this->assertEquals('the value for a some other value qwer', $generated->txt);
        $this->assertEquals('<b>the value for a</b> some other value zxcv', $generated->html);
    }

    public static function setUpBeforeClass(): void {
        self::$logger = new ConsoleLogger();
        self::$engine = new InMemoryEngine();
        self::$engine->setLogger(self::$logger);
        Database::setEngine(self::$engine);
        Database::setLogger(self::$logger);
        Database::setRethrow(true);
    }

    public static function tearDownAfterClass(): void {
        self::$engine->disconnect();
    }

    public function setUp(): void {
        $template = new EmailTemplate();
        $template->name = 'This is the most random template, srsly';
        $template->code = 'some_random_name';
        $template->subject = '{{a}} {{other_value}} asdf';
        $template->help = 'some help text to describe whatever this is';
        $template->body = '{{a}} {{other_value}} qwer';
        $template->html = '<b>{{a}}</b> {{other_value}} zxcv';
        $template->save();
    }

    public function tearDown(): void {
        self::$engine->disconnect();
    }
}
