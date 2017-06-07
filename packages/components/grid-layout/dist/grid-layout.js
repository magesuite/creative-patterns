(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define('gridLayout', ['jquery'], factory) :
    (global.gridLayout = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/**
 * Breakpoint utility for sharing breakpoints between CSS and JS.
 */
/**
 * Converts dash-case to camelCase.
 * @type {Function}
 */
var camelCase = function (input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group) {
        return group.toUpperCase();
    });
};
/**
 * Returns object containign available breakpoints.
 * @return {Object} Object containing avaliable breakpoints in shape { breakpointName: pixelsNumber }
 */
var getAvaliableBreakpoints = function () { return JSON.parse(window.getComputedStyle(body, ':before')
    .getPropertyValue('content').slice(1, -1).replace(/\\"/g, '"')); };
/**
 * Returs current breakpoint set by CSS.
 * @return {number} Current breakpoint in number of pixels.
 */
var getCurrentBreakpoint = function () { return +window.getComputedStyle(body, ':after')
    .getPropertyValue('content').replace(/"/g, ''); };
var body = document.querySelector('body');
/**
 * Module cache to export.
 * @type {Object}
 */
var breakpoint = {
    current: getCurrentBreakpoint(),
};
/**
 * Available breakpoints cache.
 */
var breakpoints = getAvaliableBreakpoints();
// Extend breakpoint module with available breakpoint keys converted to camelCase.
Object.keys(breakpoints).forEach(function (breakpointName) {
    breakpoint[camelCase(breakpointName)] = breakpoints[breakpointName];
});
// Let's check if we can register passive resize event for better performance.
var passiveOption = undefined;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            passiveOption = { passive: true };
        },
    });
    window.addEventListener('test', null, opts);
}
catch (e) { }
// Update current breakpoint on every resize.
window.addEventListener('resize', function () {
    breakpoint.current = getCurrentBreakpoint();
}, passiveOption);

/**
 * ItemCloner clones given item on mouseover and places is on top of hovered element in the same place
 * Clone resides on the bottom of the DOM tree and is positioned absolutely with height z-index ( defined in options )
 */
var GridLayout = (function () {
    /**
     * Creates and initiates new GridLayout component with given settings.
     * @param  {$wrapper} JQuery components' wrapper.
     * @param  {IGridLayoutSettings} settings Optional component settings.
     */
    function GridLayout($wrapper, settings) {
        this.$wrapper = $wrapper;
        this.settings = $.extend(true, {}, {
            gridClass: 'cs-grid-layout__grid',
            brickClass: 'cs-grid-layout__brick',
        }, settings);
        this.$grid = this.$wrapper.find("." + this.settings.gridClass);
        this.$bricks = this.$grid.children();
        this.teasers = [];
        this.isCssGrid = this._getIsCssGridSupported();
        this.columnsCfg = JSON.parse(JSON.stringify(this.$wrapper.data('columns-configuration')));
        this.teasersCfg = JSON.parse(JSON.stringify(this.$wrapper.data('teasers-configuration')));
        this.currentColsInRow = this.columnsCfg[this._getCurrentBreakpointName()];
        this.virtualBricksLength = this._getVirtualBricksLength();
        this.currentRowsCount = this.isCssGrid ? Math.ceil(this.virtualBricksLength / this.currentColsInRow) : Math.ceil(this.virtualBricksLength / this.currentColsInRow);
        this._initialize();
    }
    /**
     * Resets outdated information and recalculates positions of all teasers again
     * Runs after breakpoint change and is available from outside to recalculate manually if needed
     */
    GridLayout.prototype._recalculate = function () {
        this.currentColsInRow = this.columnsCfg[this._getCurrentBreakpointName()];
        this.virtualBricksLength = this._getVirtualBricksLength();
        this.currentRowsCount = this.isCssGrid ? Math.ceil(this.virtualBricksLength / this.currentColsInRow) : Math.ceil(this.virtualBricksLength / this.currentColsInRow);
        if (this.isCssGrid) {
            this._setTeasersCSS();
        }
        else {
            this.$grid.append(this.teasers);
            this.teasers = [];
            this._setTeasersPositions();
        }
    };
    /**
     * Checks if display: grid is supported in browser (excluding old spec of IE) and if grid has display set to "grid"
     * @return {boolean}
     */
    GridLayout.prototype._getIsCssGridSupported = function () {
        if (window.CSS && window.CSS.supports && typeof window.CSS.supports === 'function') {
            var currentCssDisplaySet = window.getComputedStyle(document.querySelector("." + this.settings.gridClass)).getPropertyValue('display');
            return CSS.supports('display', 'grid') && !CSS.supports('display', '-ms-grid') && currentCssDisplaySet === 'grid';
        }
        return false;
    };
    /**
     * Gets current breakpoint name (key)
     * @return {string} key with breakpoint's name
     */
    GridLayout.prototype._getCurrentBreakpointName = function () {
        return $.map(breakpoint, function (val, key) {
            if (breakpoint.current === val && key !== 'current') {
                return key;
            }
        });
    };
    /**
     * Calculates "virtual" length of grid items
     * "virtual" means that teasers are included and their sizes are calculated too
     * f.e if teaser covers 2 tiles it counts as 2 brics, accordingly if it's 2x2 then it takes 4 bricks
     * @return {number} number of available bricks in grid
     */
    GridLayout.prototype._getVirtualBricksLength = function () {
        var virtualLength = this.$grid.children().length;
        var teasers = this._getTeaserItems();
        if (this.currentColsInRow > 1) {
            virtualLength += teasers.x2.length + (teasers.x4.length * 3);
        }
        if ($(window).width() >= breakpoint.tablet) {
            virtualLength += (teasers.heros.length * 3);
        }
        return virtualLength;
    };
    /**
     * Returns all teasers and heros that are placed in the grid
     * @param {number} untilIndex - optional parameter to limit bricks if further filtering is not needed
     * @return {object} object with items sorted by type or size
     */
    GridLayout.prototype._getTeaserItems = function (untilIndex) {
        var $bricks = this.$grid.children();
        var $x4items;
        var $x2items;
        if (untilIndex > 0) {
            $bricks = $bricks.filter(function (idx) {
                return idx < untilIndex;
            });
        }
        $x4items = $bricks.filter("." + this.settings.brickClass + "--x2." + this.settings.brickClass + "--y2:not(." + this.settings.brickClass + "--hero)");
        $x2items = $bricks.filter("." + this.settings.brickClass + "--x2:not(." + this.settings.brickClass + "--y2)").add($bricks.filter("." + this.settings.brickClass + "--y2:not(." + this.settings.brickClass + "--x2)"));
        return {
            x2: $x2items,
            x4: $x4items,
            heros: $("." + this.settings.brickClass + "--hero"),
        };
    };
    /**
     * Calculates position of given teaser item and gives us position where item should be placed
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     * @param {object} teaserData - object containing required information about teaser: size and position where it should be added
     * @return {number} index of brick after which teaser should be placed (without adjustments)
     */
    GridLayout.prototype._getTeaserIndex = function (teaserData) {
        var windowWidth = $(window).width();
        var itemIndex = this.currentColsInRow * (teaserData.gridPosition.y - 1);
        var sizeX = teaserData.size.x;
        var sizeY = teaserData.size.y;
        if (this.currentColsInRow === 1 && sizeX > 1) {
            sizeX = 1;
        }
        if (this.currentColsInRow === 1 && sizeY > 1) {
            sizeY = 1;
        }
        if (teaserData.gridPosition.x === 'right') {
            itemIndex = itemIndex + (this.currentColsInRow - sizeX);
        }
        else if (teaserData.gridPosition.x === 'center' && sizeY < 2) {
            itemIndex = Math.floor(itemIndex + ((this.currentColsInRow / 2) - (sizeX / 2)));
        }
        var teasers = this._getTeaserItems(itemIndex);
        if (sizeX > 1 || sizeY) {
            itemIndex = itemIndex - teasers.x2.length;
        }
        if (windowWidth >= breakpoint.tablet) {
            itemIndex = itemIndex - (teasers.x4.length * 3) - (teasers.heros.length * 3);
        }
        return itemIndex;
    };
    /**
     * Loops through JSON of teasers and adjusts position returned by _getTeaserIndex method
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     */
    GridLayout.prototype._setTeasersPositions = function () {
        var windowWidth = $(window).width();
        for (var i = 0; i < this.teasersCfg.length; i++) {
            var $teaser = this.$grid.find("." + this.settings.brickClass + "[data-teaser-id=\"" + this.teasersCfg[i].id + "\"]");
            var idx = this._getTeaserIndex(this.teasersCfg[i]);
            if ($teaser.length) {
                if (windowWidth < breakpoint.tablet && !this.teasersCfg[i].mobile) {
                    $teaser.addClass(this.settings.brickClass + "--hidden");
                    idx = idx - (this.teasersCfg[i].size.x * this.teasersCfg[i].size.y);
                }
                else {
                    if (this.teasersCfg[i].gridPosition.x === 'right') {
                        $teaser.addClass(this.settings.brickClass + "--right");
                    }
                    this.teasers.push($teaser[0]);
                    this._insertTeaser($teaser, idx - 1);
                }
            }
            else {
                idx = idx - (this.teasersCfg[i].size.x * this.teasersCfg[i].size.y);
                console.warn("cs-grid-layout: Teaser was declared but not found in DOM (data-teaser-id: " + this.teasersCfg[i].id + ")");
            }
        }
    };
    /**
     * Physically appends given teaser to given position
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     * @param {object} $teaser - JQuery object to append
     * @param {number} gridIndex - indicates index of brick after which $teaser should be appended
     */
    GridLayout.prototype._insertTeaser = function ($teaser, gridIndex) {
        $teaser.insertAfter(this.$grid.children().eq(gridIndex));
        $teaser.removeClass(this.settings.brickClass + "--hidden").addClass(this.settings.brickClass + "--teaser-ready");
    };
    /**
     * Calculates X and Y axis of given teaser and adjusts if it overflows current grid possibilities (rows, columns)
     * This method runs only if CSS Grid Layout IS supported in user's browser
     * @param {object} teaserData - object containing required information about teaser: size and position where it should be added
     * @return {object} X and Y axis in the grid
     */
    GridLayout.prototype._getTeaserPositionInGrid = function (teaserData) {
        var xPos = 1;
        var yPos = teaserData.gridPosition.y;
        if (yPos >= this.currentRowsCount && teaserData.size.y > 1) {
            yPos = this.currentRowsCount - 1;
        }
        if (teaserData.gridPosition.x === 'right') {
            xPos = this.currentColsInRow - teaserData.size.x + 1;
        }
        else if (teaserData.gridPosition.x === 'center') {
            xPos = Math.floor(this.currentColsInRow / 2);
        }
        return {
            x: xPos,
            y: yPos,
        };
    };
    /**
     * Loops through all teasers, adjusts calculated position and applies CSS grid styles to all teasers declared in JSON
     * This method runs only if CSS Grid Layout IS supported in user's browser
     */
    GridLayout.prototype._setTeasersCSS = function () {
        this.teasers = [];
        var windowWidth = $(window).width();
        for (var i = 0; i < this.teasersCfg.length; i++) {
            var $teaser = this.$grid.find("." + this.settings.brickClass + "[data-teaser-id=\"" + this.teasersCfg[i].id + "\"]");
            var teaser = $teaser[0];
            if ($teaser.length) {
                if (windowWidth < breakpoint.tablet && !this.teasersCfg[i].mobile) {
                    $teaser.addClass(this.settings.brickClass + "--hidden");
                }
                else {
                    var pos = this._getTeaserPositionInGrid(this.teasersCfg[i]);
                    if (pos.x >= 1 && pos.y <= this.currentRowsCount) {
                        teaser.style.gridRowStart = pos.y;
                    }
                    if (pos.y <= this.currentRowsCount) {
                        if (pos.x >= 1 && pos.x <= this.currentColsInRow) {
                            teaser.style.gridColumnStart = pos.x;
                        }
                        else if (pos.x > this.currentColsInRow) {
                            pos.x = this.currentRowsCount - this.teasersCfg[i].size.x + 1;
                        }
                    }
                    $teaser.removeClass(this.settings.brickClass + "--hidden").addClass(this.settings.brickClass + "--teaser-ready");
                }
                this.teasers.push(teaser);
            }
            else {
                console.warn("cs-grid-layout: Teaser was declared but not found in DOM (data-teaser-id: " + this.teasersCfg[i].id + ")");
            }
        }
    };
    /**
     * Checks support of CSS Grid Layout in browsers and Initializes the correct methods
     */
    GridLayout.prototype._initialize = function () {
        if (this.isCssGrid) {
            this._setTeasersCSS();
        }
        else {
            this._setTeasersPositions();
        }
        this._resizeHandler();
    };
    /**
     * Resize handler
     * Recalculation is triggered only if number of columns was changed
     */
    GridLayout.prototype._resizeHandler = function () {
        var _this = this;
        $(window).on('resize', function () {
            if (_this.teasers.length && _this.currentColsInRow !== _this.columnsCfg[_this._getCurrentBreakpointName()]) {
                _this._recalculate();
            }
        });
    };
    return GridLayout;
}());

return GridLayout;

})));
//# sourceMappingURL=grid-layout.js.map
