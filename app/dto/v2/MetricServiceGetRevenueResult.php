<?php

namespace app\dto\v2;

use app\utils\DTO;

/**
 * MetricServiceGetRevenueResult Data Transfer Object.
 *
 * @property string                                                        $start_range
 * @property string                                                        $end_range
 * @property array|array<string,array<string,number>|number>               $grouping
 * @property array<\app\enums\MetricServiceGroupType,array<string,number>> $by_membership
 *
 * @typescript
 */
class MetricServiceGetRevenueResult extends DTO {}
