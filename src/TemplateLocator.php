<?php

namespace Creativestyle\CreativePatterns;

class TemplateLocator
{
    private function getBasePath() {
        return realpath(__DIR__.'/../');
    }

    public function locate($path) {
        $path = self::getBasePath() . '/packages/' . $path;

        return $path;
    }
}