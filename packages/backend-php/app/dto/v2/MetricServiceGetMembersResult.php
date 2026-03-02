<?php

namespace app\dto\v2;

use app\utils\DTO;
use app\utils\IDTO;
use stdClass;

/**
 * MetricServiceGetMembersResult Data Transfer Object.
 *
 * @property string            $start_range
 * @property string            $end_range
 * @property array<string,int> $created
 * @property array<string,int> $expired
 * @property array<string,int> $total
 *
 * @typescript
 */
class MetricServiceGetMembersResult extends DTO implements IDTO {
    /**
     * jsonSerialize.
     *
     * @return mixed
     */
    public function jsonSerialize(): mixed {
        return $this->__serialize();
    }

    /**
     * __serialize.
     *
     * @return array{start_range: string, end_range: string, created: non-empty-array<string, int>|stdClass, expired: non-empty-array<string, int>|stdClass, total: non-empty-array<string, int>|stdClass}
     */
    public function __serialize(): array {
        return [
            'start_range' => $this->start_range,
            'end_range' => $this->end_range,
            'created' => !empty($this->created) ? $this->created : new stdClass(),
            'expired' => count(value: $this->expired) !== 0 ? $this->expired : new stdClass(),
            'total' => !empty($this->total) ? $this->total : new stdClass()
        ];
    }

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString(): string {
        return json_encode($this->jsonSerialize());
    }
}
