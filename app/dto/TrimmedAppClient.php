<?php

namespace app\dto;

/** @typescript */
class TrimmedAppClient {
    public string $description;
    public bool $enabled;
    public string $expires;
    public int $id;
    public string $name;
    public ?TrimmedUser $owner;

    public function __construct(array $trimmedClientInfo) {
        $this->id = $trimmedClientInfo['id'];
        $this->name = $trimmedClientInfo['name'];
        $this->description = $trimmedClientInfo['description'];
        $this->enabled = $trimmedClientInfo['enabled'];
        $this->expires = $trimmedClientInfo['expires'];
        $this->owner = $trimmedClientInfo['owner'];
    }
}
