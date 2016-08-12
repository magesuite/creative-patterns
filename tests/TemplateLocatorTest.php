<?php

class TemplateLocatorTest extends PHPUnit_Framework_TestCase {
    public function testItGetsProperLocation() {
        $templateLocator = new \Creativestyle\CreativePatterns\TemplateLocator();

        $baseDirectory = realpath(__DIR__.'/../');

        $result = $templateLocator->locate('headline', 'headline.twig');

        $this->assertEquals($baseDirectory.'/packages/components/headline/src/headline.twig', $result);
    }
}