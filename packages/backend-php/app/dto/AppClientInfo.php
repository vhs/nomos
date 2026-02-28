<?php

namespace app\dto;

use app\domain\AppClient;

/** @typescript */
class AppClientInfo {
    public ?string $description;
    public ?string $name;
    public ?string $redirecturi;
    public ?string $url;

    /**
     * constructor.
     *
     * @param \app\domain\AppClient $clientInfo
     */
    public function __construct(AppClient $clientInfo) {
        $this->name = $clientInfo->name;
        $this->description = $clientInfo->description;
        $this->redirecturi = $clientInfo->redirecturi;
        $this->url = $clientInfo->url;
    }
}
