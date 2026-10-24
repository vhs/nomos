<?php

require_once join('/', [__DIR__, 'conf/config.ini.php']);
require_once join('/', [__DIR__, 'app/include.php']);

use Spatie\TypeScriptTransformer\Transformers\DtoTransformer;
use Spatie\TypeScriptTransformer\Transformers\EnumTransformer;
use Spatie\TypeScriptTransformer\Transformers\InterfaceTransformer;
use Spatie\TypeScriptTransformer\TypeScriptTransformer;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

$config = TypeScriptTransformerConfig::create()
    // path where your PHP classes are
    ->autoDiscoverTypes(__DIR__ . '/app')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/Cloneable.php')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/Logger.php')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/Singleton.php')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/SplClassLoader.php')
    ->autoDiscoverTypes(__DIR__ . '/vhs/database')
    ->autoDiscoverTypes(__DIR__ . '/vhs/domain')
    ->autoDiscoverTypes(__DIR__ . '/vhs/loggers')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/messaging')
    ->autoDiscoverTypes(__DIR__ . '/vhs/migration')
    ->autoDiscoverTypes(__DIR__ . '/vhs/monitors')
    ->autoDiscoverTypes(__DIR__ . '/vhs/security')
    ->autoDiscoverTypes(__DIR__ . '/vhs/services')
    // ->autoDiscoverTypes(__DIR__ . '/vhs/vhs.php')
    ->autoDiscoverTypes(__DIR__ . '/vhs/web')
    // list of transformers
    ->transformers([InterfaceTransformer::class, EnumTransformer::class, DtoTransformer::class])
    // file where TypeScript type definitions will be written
    ->outputFile(__DIR__ . '/packages/frontend-react/src/types/nomos.d.ts');

TypeScriptTransformer::create($config)->transform();
