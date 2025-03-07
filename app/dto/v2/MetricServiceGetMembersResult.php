<?php

namespace app\dto\v2;

use app\utils\DTO;
use app\utils\IDTO;
use stdClass;

/**
 * MetricServiceGetMembersResult Data Transfer Object.
 *
 * @property string               $start_range
 * @property string               $end_range
 * @property array<string,number> $created
 * @property array<string,number> $expired
 * @property array<string,number> $total
 *
 * @typescript
 */
class MetricServiceGetMembersResult extends DTO implements IDTO {
    public function jsonSerialize(): array {
        return $this->__serialize();
    }

    public function __serialize(): array {
        return [
            'start_range' => $this->start_range,
            'end_range' => $this->end_range,
            'created' => !empty($this->created) ? $this->created : new stdClass(),
            'expired' => count(value: $this->expired) !== 0 ? $this->expired : new stdClass(),
            'total' => !empty($this->total) ? $this->total : new stdClass()
        ];
    }

    public function __toString(): string {
        return json_encode($this->jsonSerialize());
    }
}
