<?php

namespace app\dto\v2;

use app\utils\DTO;

/**
 * MetricServiceGetCreatedDatesResult Data Transfer Object.
 *
 * @property string                                                                                                      $start_range
 * @property string                                                                                                      $end_range
 * @property array<"0"|"1"|"2"|"3"|"4"|"5"|"6",array<"1"|"10"|"11"|"12"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"total",number>> $byDowHour
 * @property array<"1"|"10"|"11"|"12"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9",array<"0"|"1"|"2"|"3"|"4"|"5"|"6"|"total",number>> $byMonthDow
 *
 * @typescript
 */
class MetricServiceGetCreatedDatesResult extends DTO {}
