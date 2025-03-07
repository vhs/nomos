<?php

namespace app\utils\converters;

use phpDocumentor\Reflection\DocBlockFactory;

class PHP2TS {
    public static function convertDataType(string $dataType): string {
        $result = $dataType;
        $result = preg_replace('/\barray\<\b/', 'Record<', $result);
        $result = preg_replace('/\bbool\b/', 'boolean', $result);
        $result = preg_replace('/\bint\b/', 'number', $result);
        $result = preg_replace('/\bmixed\b/', 'unknown', $result);
        $result = preg_replace('/([A-Z]\w+)\[\]/', '$1s', $result);

        $matches = preg_split('/[|,<>\n ]/', trim($result));

        foreach ($matches as $match) {
            if (strrpos($match, '\\') !== false) {
                $result = str_replace($match, PHP2TS::getBaseContractInterface($match), subject: $result);
            }
        }

        return $result;
    }

    public static function convertDocComment($docComment) {
        $factory = DocBlockFactory::createInstance();
        $docblock = $factory->create($docComment);

        $reconstructed = [];

        if (strlen(trim(string: $docblock->getSummary())) > 0) {
            $reconstructed[] = $docblock->getSummary();
        }

        if (strlen(trim(string: $docblock->getDescription())) > 0) {
            if (!empty($reconstructed)) {
                $reconstructed[] = '';
            }
            array_push($reconstructed, ...explode("\n", $docblock->getDescription()));
        }

        $lastTag = '';

        $tags = $docblock->getTags();

        /** @disregard P1013 manually checking */
        $longestType = max(array_map(fn($tag): int => $tag->getName() !== 'param' ? 0 : strlen(PHP2TS::convertDataType($tag->getType())) + 2, $tags));
        /** @disregard P1013 manually checking */
        $longestVarName = max(array_map(fn($tag): int => $tag->getName() !== 'param' ? 0 : strlen($tag->getVariableName()), $tags));

        foreach ($tags as $tag) {
            if ($tag->getName() !== $lastTag) {
                if (!empty($reconstructed)) {
                    $reconstructed[] = '';
                }
                $lastTag = $tag->getName();
            }

            $tagRow = [sprintf('@%s', $tag->getName())];

            switch ($tag->getName()) {
                case 'param':
                    /** @disregard P1013 manually checking */
                    $tagRow[] = str_pad(sprintf('{%s}', PHP2TS::convertDataType($tag->getType())), $longestType, ' ');
                    /** @disregard P1013 manually checking */
                    $tagRow[] = str_pad($tag->getVariableName(), $longestVarName, ' ');
                    /** @disregard P1013 manually checking */
                    $tagRow[] = $tag->getDescription();

                    break;
                case 'throws':
                    /** @disregard P1013 manually checking */
                    $tagRow[] = str_pad(sprintf('{%s}', PHP2TS::convertDataType($tag->getType())), $longestVarName + 2, ' ');
                    /** @disregard P1013 manually checking */
                    $tagRow[] = $tag->getDescription();

                    break;
                case 'return':
                    $tagRow[0] = '@returns';
                    /** @disregard P1013 manually checking */
                    $tagRow[] = str_pad(sprintf('{%s}', PHP2TS::convertDataType($tag->getType())), $longestVarName + 1, ' ');
                    /** @disregard P1013 manually checking */
                    $tagRow[] = $tag->getDescription();

                    break;
                default:
                    /** @disregard P1013 manually checking */
                    $tagRow[] = $tag->getDescription();

                    break;
            }

            $reconstructed[] = implode(' ', $tagRow);
        }

        $output = [];
        $output[] = '    /**';

        array_push($output, ...array_map(fn($row): string => sprintf('     * %s', $row), $reconstructed));

        $output[] = '     */';

        return implode("\n", $output);
    }

    public static function generateContractMethodArgs($contractMethod): string {
        $params = $contractMethod->getParameters();

        return join(
            ', ',
            array_map(
                fn($param): string => sprintf(
                    '%s: %s',
                    $param->getName(),
                    trim(str_replace('$', '', PHP2TS::getDocCommentParam($contractMethod, $param->getName())))
                ),
                $params
            )
        );
    }

    public static function generateContractMethodParams($contractMethod): string {
        $params = $contractMethod->getParameters();

        return join(', ', array_map(fn($param): string => sprintf('%s', $param->getName()), $params));
    }

    public static function generateContractMethodReturnType($contractMethod): string {
        $docComment = $contractMethod->getDocComment();

        $factory = DocBlockFactory::createInstance();
        $docblock = $factory->create($docComment);

        $tags = $docblock->getTags();

        $tag = null;

        foreach ($tags as $tag) {
            if ($tag->getName() === 'return') {
                /** @disregard P1013 manually checking */
                return PHP2TS::convertDataType($tag->getType());
            }
        }

        throw new \Exception(
            sprintf('Missing return statement for: %s->%s', $contractMethod->getDeclaringClass()->getName(), $contractMethod->getName())
        );
    }

    public static function getBaseContractInterface(string $name): string {
        return substr($name, strrpos($name, '\\') + 1);
    }

    public static function getDocCommentParam($contractMethod, string $param): mixed {
        $docComment = $contractMethod->getDocComment();

        $factory = DocBlockFactory::createInstance();
        $docblock = $factory->create($docComment);

        $tags = $docblock->getTags();

        $tag = null;

        foreach ($tags as $tag) {
            /** @disregard P1013 manually checking */
            if ($tag->getName() === 'param' && $tag->getVariableName() === $param) {
                /** @disregard P1013 manually checking */
                return PHP2TS::convertDataType($tag->getType());
            }
        }

        throw new \Exception(
            sprintf(
                'Missing @param doc comment for param %s of %s->%s',
                $param,
                $contractMethod->getDeclaringClass()->getName(),
                $contractMethod->getName()
            )
        );
    }
}
