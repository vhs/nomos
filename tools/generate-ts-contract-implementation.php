#!/usr/bin/env php
<?php
require_once join('/', [__DIR__, '..', 'conf/config.ini.php']);
require_once join('/', [__DIR__, '..', 'app/include.php']);

$namespace = 'app\\handlers\\v2';

$wrappedTags = ['@param', '@throws', '@return'];

function getDocCommentParam($contractMethod, string $param): string {
    $docComment = $contractMethod->getDocComment();

    $lines = explode("\n", $docComment);

    foreach ($lines as $line) {
        $matchStr = sprintf('/@param (.+) \\$%s/', $param);
        if (preg_match($matchStr, trim($line), $match)) {
            return $match[1];
        }
    }

    throw new Error(
        sprintf(
            'Missing @param doc comment for param %s of %s->%s',
            $param,
            $contractMethod->getDeclaringClass()->getName(),
            $contractMethod->getName()
        )
    );
}

function convertDocComment(string $docComment): string {
    global $wrappedTags;

    $lines = explode("\n", $docComment);

    foreach ($lines as $lineNo => $line) {
        $chunks = explode(' ', preg_replace('/\r?\n?$/', '', trim($line)));

        foreach ($chunks as $id => $chunk) {
            if ($chunk === '@return') {
                $chunks[$id] = '@returns';
            }

            if (in_array($chunk, $wrappedTags)) {
                $chunks[$id + 1] = str_replace('\\app\\domain\\', '', sprintf('{%s}', trim($chunks[$id + 1])));
            }
        }

        $lines[$lineNo] = sprintf('      %s', implode(' ', $chunks));
    }

    return str_replace('$', '', implode("\n", $lines));
}

function generateContractMethodArgs($contractMethod): string {
    $params = $contractMethod->getParameters();

    return join(
        ', ',
        array_map(
            fn($param): string => sprintf(
                '%s: %s',
                $param->getName(),
                trim(str_replace('$', '', getDocCommentParam($contractMethod, $param->getName())))
            ),
            $params
        )
    );
}

function generateContractMethodParams($contractMethod): string {
    $params = $contractMethod->getParameters();

    return join(', ', array_map(fn($param): string => sprintf('%s', $param->getName()), $params));
}

function generateContractMethodReturnType($contractMethod): string {
    $comments = $contractMethod->getDocComment();

    // Check if there is an @return statement
    if (preg_match('%^\s*\*\s*@return\s+(.+)\s*$%im', $comments, $matches) && count($matches) > 1) {
        // Split the found @return statement
        $returnStatements = explode('|', str_replace('\\app\\dto\\', '', $matches[1]));

        foreach ($returnStatements as $i => $v) {
            // Convert array statements to Typescript style array statements
            if (preg_match('/^array\{.+\}$/', $v)) {
                $returnStatements[$i] = preg_replace('/^array(\{.+\})$/', 'Array<$1>', $v);
            }
        }

        return str_replace('\\app\\domain\\', '', implode('|', $returnStatements));
    } else {
        throw new Error(sprintf('Missing return statement for: %s->%s', $contractMethod->getDeclaringClass()->getName(), $contractMethod->getName()));
    }
}

if ($argc < 2) {
    die("Missing file argument\n");
}

array_shift($argv);

foreach ($argv as $service_file) {
    $serviceName = basename($service_file, '.php');
    $fqcn = sprintf('%s\\%s', $namespace, $serviceName);

    require_once $service_file;

    $serviceClass = new \ReflectionClass($fqcn);

    $contract = null;
    foreach ($serviceClass->getInterfaces() as $interface) {
        if (array_key_exists('vhs\\services\\IContract', $interface->getInterfaces())) {
            $contract = $interface;
        }
    }

    $baseInterface = substr($contract->getName(), strrpos($contract->getName(), '\\') + 1);
    $baseService = substr($baseInterface, 1);

    printf("export default class %s implements %s {\n", $baseService, $baseInterface);

    $contractMethods = $contract->getMethods();

    foreach ($contractMethods as $k => $contractMethod) {
        if ($k > 0) {
            echo "\n";
        }

        echo str_replace(
            'array',
            'Record',
            sprintf(
                "    %s\n    async %s(%s): BackendResult<%s> {\n        return await backendCall('/services/v2/%s.svc/%s', { %s })\n }\n",
                convertDocComment($contractMethod->getDocComment()),
                $contractMethod->getName(),
                generateContractMethodArgs($contractMethod),
                generateContractMethodReturnType($contractMethod),
                $baseService,
                $contractMethod->getName(),
                generateContractMethodParams($contractMethod)
            )
        );
    }

    printf("}\n");
}

