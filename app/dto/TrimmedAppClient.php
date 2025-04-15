<?php

namespace app\dto;

use app\domain\AppClient;

/** @typescript */
class TrimmedAppClient {
    public string $description;
    public bool $enabled;
    public string $expires;
    public int $id;
    public string $name;
    public ?TrimmedUser $owner;

    /**
     * constructor.
     *
     * @param \app\domain\AppClient $clientInfo
     */
    public function __construct(AppClient $clientInfo) {
        $this->id = $clientInfo->id;
        $this->name = $clientInfo->name;
        $this->description = $clientInfo->description;
        $this->enabled = $clientInfo->enabled;
        $this->expires = $clientInfo->expires;
        $this->owner = new TrimmedUser($clientInfo->owner);
    }
}
