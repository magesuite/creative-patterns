<?php

namespace Creativestyle\CreativePatterns;

interface Locator
{
    /**
     * Returns realpath for searched file
     * @param $module
     * @param $file
     * @return string
     */
    public function locate($component, $file);
}