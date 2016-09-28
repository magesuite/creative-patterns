<?php

namespace Creativestyle\CreativePatterns;

class TemplateLocator implements Locator
{
    private function getBasePath() {
        return realpath(__DIR__.'/../');
    }

    public function locate($package, $componentName, $templateName) {
        $path = self::getBasePath().'/packages/'.$package.'/'.$componentName.'/src/'.$templateName;

        return $path;
    }
}