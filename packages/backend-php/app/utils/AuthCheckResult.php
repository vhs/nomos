<?php

namespace app\utils;

use app\domain\Privilege;

/** @typescript */
class AuthCheckResult extends \stdClass {
    /** @var Privilege[] */
    public ?array $privileges = null;
    public ?string $type = null;
    public bool $valid = false;

    /** @var array<string,mixed> */
    private array $store = [];

    public function __get(string $name): mixed {
        return $this->store[$name];
    }

    public function __isset(string $name): bool {
        return isset($this->store[$name]);
    }

    public function __serialize(): array {
        return ['valid' => $this->valid, 'type' => $this->type, 'privileges' => $this->privileges, ...$this->store];
    }

    public function __set(string $name, mixed $value): void {
        $this->store[$name] = $value;
    }

    public function __unset(string $name): void {
        unset($this->store[$name]);
    }
}
