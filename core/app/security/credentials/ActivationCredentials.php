<?php

namespace app\security\credentials;


class ActivationCredentials extends TokenCredentials {

    public function getType() {
        return "activation";
    }
}
