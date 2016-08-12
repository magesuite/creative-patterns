<?php

namespace Creativestyle\CreativePatterns;

class TemplateLocator implements Locator
{
    private function getBasePath() {
        return realpath(__DIR__.'/../');
    }

    public function locate($componentName, $templateName) {
        $path = self::getBasePath().'/packages/components/'.$componentName.'/src/'.$templateName;

        return $path;
    }
}