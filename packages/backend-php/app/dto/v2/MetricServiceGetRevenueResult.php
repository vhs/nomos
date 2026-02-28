<?php

namespace app\dto\v2;

use app\utils\DTO;

/**
 * MetricServiceGetRevenueResult Data Transfer Object.
 *
 * @property string                                                     $start_range
 * @property string                                                     $end_range
 * @property array<string,array<string,int>|int>|string                 $grouping
 * @property array<\app\enums\MetricServiceGroupType,array<string,int>> $by_membership
 *
 * @typescript
 */
class MetricServiceGetRevenueResult extends DTO {
}
