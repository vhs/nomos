<?php




use PHPUnit\Framework\TestCase;


use Psr\Log\LogLevel;
use vhs\loggers\StringLogger;
use vhs\observability\PsrToVhsLoggerAdapter;

class PsrToVhsLoggerAdapterTest extends TestCase
{
    private StringLogger $logger;

    public function setUp(): void
    {
        $this->logger = new StringLogger();
    }

    public function test_NoContext(): void
    {
        $adapter = new PsrToVhsLoggerAdapter($this->logger);

        $adapter->debug('nya nya');

        $this->assertEquals(['nya nya'], $this->logger->history);
    }

    public function test_Levels(): void
    {
        $adapter = new PsrToVhsLoggerAdapter($this->logger, LogLevel::INFO);

        $adapter->debug('nya nya');

        $this->assertEquals([], $this->logger->history);
    }

    public function test_ContextPrinting(): void
    {
        $adapter = new PsrToVhsLoggerAdapter($this->logger);

        $adapter->debug('nya nya', ['hmm', 'var' => 'yeah']);

        $this->assertEquals(["nya nya\nContext:\n0 = hmm\nvar = yeah"], $this->logger->history);
    }
}
