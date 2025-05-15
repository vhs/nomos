<?php

namespace vhs;

class BasePath {
    protected static ?string $basePath = null;

    public static function getBasePath(bool $withSlash = true): string {
        if (BasePath::$basePath == null) {
            BasePath::$basePath = addslashes(substr(__FILE__, 0, -17));
        }

        return BasePath::$basePath . ($withSlash ? '/' : '');
    }
}
