<?php

if (preg_match('/tools$/', __DIR__)) {
    chdir(realpath(dirname(__DIR__)));
}

require_once 'conf/config.ini.php';
require_once 'app/include.php';

/**
 * generateFieldDefinition.
 *
 * @param string               $className
 * @param \vhs\database\Column $column
 *
 * @return array{name:string,type:mixed}
 */
function generateFieldDefinition($className, $column) {
    $baseType = strtolower(str_replace('vhs\database\types\Type', '', get_class($column->type)));

    $field = [
        'name' => $column->name,
        'type' => $baseType
    ];

    switch ($field['type']) {
        case 'datetime':
        case 'text':
            $field['type'] = 'string';

            break;
        case 'enum':
            $enumName = sprintf('%s%sEnum', $className, ucfirst($column->name));

            $field['enum'] = [
                'name' => $enumName,
                /**
                 * @disregard P1014
                 *
                 * @phpstan-ignore property.notFound
                 */
                'values' => $column->type->values
            ];

            break;
        default:
            break;
    }

    return $field;
}

foreach (glob('app/schema/*.php') as $filename) {
    require_once $filename;
}

$schemas = [];

foreach (get_declared_classes() as $class) {
    if (is_subclass_of($class, '\\vhs\\domain\\Schema')) {
        $schemaName = str_replace('app\\schema\\', '', $class);
        $schemas[$schemaName] = $class;

        print_r($class::Table()->columns->all());
        /** @var \vhs\database\Column $column */
        foreach ($class::Table()->columns->all() as $column) {
            $schemas[$schemaName][] = generateFieldDefinition($schemaName, $column);
        }
    }
}

print_r($schemas);
