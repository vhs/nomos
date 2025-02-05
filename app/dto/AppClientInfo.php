<?php

namespace app\dto;

/** @typescript */
class TrimmedAppClient {
    public ?string $description;
    public ?string $name;
    public ?string $redirecturi;
    public ?string $url;

    public function __construct($name, $description, $redirecturi, $url) {
        $this->name = $name;
        $this->description = $description;
        $this->redirecturi = $redirecturi;
        $this->url = $url;
    }
}
