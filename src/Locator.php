<?php

namespace Creativestyle\CreativePatterns;

class Locator
{
    private static function getBasePath() {
        return realpath(__DIR__.'/../');
    }

    public static function locateTemplate($componentName, $templateName) {
        $path = self::getBasePath().'/packages/components/'.$componentName.'/src/'.$templateName;

        return realpath($path);
    }
}