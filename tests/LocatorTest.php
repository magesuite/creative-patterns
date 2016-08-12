<?php

class LocatorTest extends PHPUnit_Framework_TestCase {
    public function testItGetsProperLocation() {
        $baseDirectory = realpath(__DIR__.'/../');

        $result = \Creativestyle\CreativePatterns\Locator::locateTemplate('headline', 'headline.twig');

        $this->assertEquals($baseDirectory.'/packages/components/headline/src/headline.twig', $result);
    }
}