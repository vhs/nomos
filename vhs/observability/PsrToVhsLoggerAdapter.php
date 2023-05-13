<?php

namespace vhs\observability;

use Psr\Log\InvalidArgumentException;
use Psr\Log\LogLevel;
use vhs\Logger;

/** Adapter from the PSR standard logging system to log to the existing VHS
 * logging
 */
final class PsrToVhsLoggerAdapter extends \Psr\Log\AbstractLogger
{
    private int $level;
    private Logger $vhsLogger;

    public function __construct(Logger $vhsLogger, string $level = LogLevel::DEBUG)
    {
        $this->level = $this->levelToInt($level);
        $this->vhsLogger = $vhsLogger;
    }

    private function levelToInt(string $level): int
    {
        $levels = [
            LogLevel::DEBUG => 0,
            LogLevel::INFO => 1,
            LogLevel::NOTICE => 2,
            LogLevel::WARNING => 3,
            LogLevel::ERROR => 4,
            LogLevel::CRITICAL => 5,
            LogLevel::ALERT => 6,
            LogLevel::EMERGENCY => 7
        ];
        if (!isset($levels[$level])) {
            throw new InvalidArgumentException('Unknown log level');
        }
        return $levels[$level];
    }

    public function log($level, $message, array $context = []): void
    {
        if ($level >= $this->level) {
            $listOfKvs = array_map(function ($v, $k) {
                return "$k = $v";
            }, array_values($context), array_keys($context));
            $contextS = sizeof($context) === 0 ? '' : "\nContext:\n" . implode("\n", $listOfKvs);
            $this->vhsLogger->log($message . $contextS);
        }
    }
}
