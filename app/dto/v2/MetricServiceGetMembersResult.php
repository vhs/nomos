<?php

namespace app\dto\v2;

use app\utils\DTO;

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
class MetricServiceGetMembersResult extends DTO {}
