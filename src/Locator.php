<?php

namespace Creativestyle\CreativePatterns;

class Locator
{
    private static function getBasePath() {
        return realpath(__DIR__.'/../');
    }

    public static function locateTemplate($componentName, $templateName) {
        $path = self::getBasePath().'/components/'.$componentName.'/'.$templateName;

        return realpath($path);
    }
}