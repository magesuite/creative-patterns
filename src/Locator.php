<?php

namespace Creativestyle\CreativePatterns;

interface Locator
{
    /**
     * Returns realpath for searched file
     * @param $package
     * @param $module
     * @param $file
     * @return string
     */
    public function locate($package, $component, $file);
}