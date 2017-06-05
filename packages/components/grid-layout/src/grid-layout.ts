/* tslint:disable:no-unused-new object-literal-key-quotes max-classes-per-file */
import $ from 'jquery';

import breakpoint from '../../../utilities/breakpoint/src/breakpoint';

interface IGridLayoutSettings {
    /**
     * Defines class of grid element (not wrapper)
     * @default {cs-grid-layout__grid}
     * @type {String}
     */

    gridClass?: string;
    /**
     * Defines class of single brick
     * @default {cs-grid-layout__brick}
     * @type {String}
     */
    brickClass?: string;
}

/**
 * ItemCloner clones given item on mouseover and places is on top of hovered element in the same place
 * Clone resides on the bottom of the DOM tree and is positioned absolutely with height z-index ( defined in options )
 */
export default class GridLayout {
    private $wrapper: JQuery;
    private $grid: JQuery;
    private $bricks: JQuery;
    private settings?: IGridLayoutSettings;
    private columnsCfg: any;
    private teasersCfg: any;
    public isCssGrid: boolean;
    public virtualBricksLength: number;
    public teasers: any;
    public currentColsInRow: number;
    public currentRowsCount: number;

    /**
     * Creates and initiates new GridLayout component with given settings.
     * @param  {$wrapper} JQuery components' wrapper.
     * @param  {IGridLayoutSettings} settings Optional component settings.
     */
    public constructor( $wrapper: JQuery, settings?: IGridLayoutSettings ) {
        this.$wrapper = $wrapper;

        this.settings = $.extend( true, {},
            {
                gridClass: 'cs-grid-layout__grid',
                brickClass: 'cs-grid-layout__brick',
            },
            settings,
        );

        this.$grid = this.$wrapper.find( `.${ this.settings.gridClass }` );
        this.$bricks = this.$grid.children();
        this.teasers = [];
        this.isCssGrid = this._getIsCssGridSupported();

        this.columnsCfg = JSON.parse( JSON.stringify( this.$wrapper.data( 'columns-configuration' ) ) );
        this.teasersCfg = JSON.parse( JSON.stringify( this.$wrapper.data( 'teasers-configuration' ) ) );

        this.currentColsInRow = this.columnsCfg[ this._getCurrentBreakpointName() ];
        this.virtualBricksLength = this._getVirtualBricksLength();
        this.currentRowsCount = this.isCssGrid ? Math.ceil( this.virtualBricksLength / this.currentColsInRow ) : Math.ceil( this.virtualBricksLength / this.currentColsInRow );
        
        this._initialize();
    }

    /**
     * Resets outdated information and recalculates positions of all teasers again
     * Runs after breakpoint change and is available from outside to recalculate manually if needed
     */
    public _recalculate(): void {
        this.currentColsInRow = this.columnsCfg[ this._getCurrentBreakpointName() ];
        this.virtualBricksLength = this._getVirtualBricksLength();
        this.currentRowsCount = this.isCssGrid ? Math.ceil( this.virtualBricksLength / this.currentColsInRow ) : Math.ceil( this.virtualBricksLength / this.currentColsInRow );

        if ( this.isCssGrid ) {
            this._setTeasersCSS();
        } else {
            this.$grid.append( this.teasers );
            this.teasers = [];
            this._setTeasersPositions();
        }
    }

    /**
     * Checks if display: grid is supported in browser (excluding old spec of IE) and if grid has display set to "grid"
     * @return {boolean}
     */
    protected _getIsCssGridSupported(): boolean {
        if ( window.CSS && window.CSS.supports && typeof window.CSS.supports === 'function' ) {
            const currentCssDisplaySet: string = window.getComputedStyle( document.querySelector( `.${ this.settings.gridClass }` ) ).getPropertyValue( 'display' );

            return CSS.supports( 'display', 'grid' ) && !CSS.supports( 'display', '-ms-grid' ) && currentCssDisplaySet === 'grid';
        }
        
        return false;
    }

    /**
     * Gets current breakpoint name (key)
     * @return {string} key with breakpoint's name
     */
    protected _getCurrentBreakpointName(): string { 
        return $.map( breakpoint, ( val: number, key: string ): any => {
            if ( breakpoint.current === val && key !== 'current' ) {
                return key;
            }
        } );
    }

    /**
     * Calculates "virtual" length of grid items
     * "virtual" means that teasers are included and their sizes are calculated too
     * f.e if teaser covers 2 tiles it counts as 2 brics, accordingly if it's 2x2 then it takes 4 bricks
     * @return {number} number of available bricks in grid
     */
    protected _getVirtualBricksLength(): number {
        let virtualLength: number = this.$grid.children().length;
        const teasers: any = this._getTeaserItems();

        if ( this.currentColsInRow > 1 ) {
            virtualLength += teasers.x2.length + ( teasers.x4.length * 3 );
        }

        if ( $( window ).width() >= breakpoint.tablet ) {
            virtualLength += ( teasers.heros.length * 3 );
        }

        return virtualLength;
    }

    /**
     * Returns all teasers and heros that are placed in the grid
     * @param {number} untilIndex - optional parameter to limit bricks if further filtering is not needed
     * @return {object} object with items sorted by type or size
     */
    protected _getTeaserItems( untilIndex?: number ): any {
        let $bricks = this.$grid.children();
        let $x4items: any;
        let $x2items: any;

        if ( untilIndex > 0 ) {
            $bricks = $bricks.filter( ( idx: number ): any => {
                return idx < untilIndex;
            } );
        }

        $x4items = $bricks.filter( `.${ this.settings.brickClass }--x2.${ this.settings.brickClass }--y2:not(.${ this.settings.brickClass }--hero)` ); 
        $x2items = $bricks.filter( `.${ this.settings.brickClass }--x2:not(.${ this.settings.brickClass }--y2)` ).add( $bricks.filter( `.${ this.settings.brickClass }--y2:not(.${ this.settings.brickClass }--x2)` ) );

        return {
            x2: $x2items,
            x4: $x4items,
            heros: $( `.${ this.settings.brickClass }--hero` ),
        };
    }

    /**
     * Calculates position of given teaser item and gives us position where item should be placed
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     * @param {object} teaserData - object containing required information about teaser: size and position where it should be added
     * @return {number} index of brick after which teaser should be placed (without adjustments)
     */
    protected _getTeaserIndex( teaserData: any ): number {
        const windowWidth: number = $( window ).width();
        let itemIndex: number = this.currentColsInRow * ( teaserData.gridPosition.y - 1 );
        let sizeX: number = teaserData.size.x;
        let sizeY: number = teaserData.size.y;

        if ( this.currentColsInRow === 1 && sizeX > 1 ) {
            sizeX = 1;
        }

        if ( this.currentColsInRow === 1 && sizeY > 1 ) {
            sizeY = 1;
        }

        if ( teaserData.gridPosition.x === 'right' ) {
            itemIndex = itemIndex + ( this.currentColsInRow - sizeX );
        } else if ( teaserData.gridPosition.x === 'center' && sizeY < 2 ) {
            itemIndex = Math.floor( itemIndex + ( ( this.currentColsInRow / 2 ) - ( sizeX / 2 ) ) );
        }

        const teasers: any = this._getTeaserItems( itemIndex );

        if ( sizeX > 1 || sizeY ) {
            itemIndex = itemIndex - teasers.x2.length;
        }

        if ( windowWidth >= breakpoint.tablet ) {
            itemIndex = itemIndex - ( teasers.x4.length * 3 ) - ( teasers.heros.length * 3 );
        }
        
        return itemIndex;
    }

    /**
     * Loops through JSON of teasers and adjusts position returned by _getTeaserIndex method
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     */
    protected _setTeasersPositions(): void {
        const windowWidth: number = $( window ).width();

        for ( let i: number = 0; i < this.teasersCfg.length; i++ ) {
            const $teaser: any = this.$grid.find( `.${ this.settings.brickClass }[data-teaser-id="${ this.teasersCfg[ i ].id }"]` );
            let idx: any = this._getTeaserIndex( this.teasersCfg[ i ] );

            if ( $teaser.length ) {
                if ( windowWidth < breakpoint.tablet && !this.teasersCfg[ i ].mobile ) {
                    $teaser.addClass( `${ this.settings.brickClass }--hidden` );
                    idx = idx - ( this.teasersCfg[ i ].size.x * this.teasersCfg[ i ].size.y );
                } else {
                    if ( this.teasersCfg[ i ].gridPosition.x === 'right' ) {
                        $teaser.addClass( `${ this.settings.brickClass }--right` );
                    }
                    this.teasers.push( $teaser[ 0 ] );
                    this._insertTeaser( $teaser, idx - 1 );
                }
            } else {
                idx = idx - ( this.teasersCfg[ i ].size.x * this.teasersCfg[ i ].size.y );
                console.warn( `cs-grid-layout: Teaser was declared but not found in DOM (data-teaser-id: ${ this.teasersCfg[ i ].id })` );
            }
        }
    }

    /**
     * Physically appends given teaser to given position
     * This method runs only if CSS Grid Layout is NOT(!) supported in user's browser
     * @param {object} $teaser - JQuery object to append
     * @param {number} gridIndex - indicates index of brick after which $teaser should be appended
     */
    protected _insertTeaser( $teaser: any, gridIndex: number ) {
        $teaser.insertAfter( this.$grid.children().eq( gridIndex ) );
        $teaser.removeClass( `${ this.settings.brickClass }--hidden` ).addClass( `${ this.settings.brickClass }--teaser-ready` );
    }

    /**
     * Calculates X and Y axis of given teaser and adjusts if it overflows current grid possibilities (rows, columns)
     * This method runs only if CSS Grid Layout IS supported in user's browser
     * @param {object} teaserData - object containing required information about teaser: size and position where it should be added
     * @return {object} X and Y axis in the grid
     */
    protected _getTeaserPositionInGrid( teaserData: any ): any {
        let xPos: any = 1;
        let yPos: any = teaserData.gridPosition.y;

        if ( yPos >= this.currentRowsCount && teaserData.size.y > 1 ) {
            yPos = this.currentRowsCount - 1;
        }

        if ( teaserData.gridPosition.x === 'right' ) {
            xPos = this.currentColsInRow - teaserData.size.x + 1;
        } else if ( teaserData.gridPosition.x === 'center' ) {
            xPos = Math.floor( this.currentColsInRow / 2 );
        }

        return {
            x: xPos,
            y: yPos,
        };
    }

    /**
     * Loops through all teasers, adjusts calculated position and applies CSS grid styles to all teasers declared in JSON
     * This method runs only if CSS Grid Layout IS supported in user's browser
     */
    protected _setTeasersCSS(): void {
        this.teasers = [];
        const windowWidth = $( window ).width();

        for ( let i: number = 0; i < this.teasersCfg.length; i++ ) {
            const $teaser: any = this.$grid.find( `.${ this.settings.brickClass }[data-teaser-id="${ this.teasersCfg[ i ].id }"]` );
            const teaser: any = $teaser[ 0 ];

            if ( $teaser.length ) {
                if ( windowWidth < breakpoint.tablet && !this.teasersCfg[ i ].mobile ) {
                    $teaser.addClass( `${ this.settings.brickClass }--hidden` );
                } else {
                    const pos: any = this._getTeaserPositionInGrid( this.teasersCfg[ i ], );

                    if ( pos.x >= 1 && pos.y <= this.currentRowsCount ) {
                        teaser.style.gridRowStart = pos.y;
                    }

                    if ( pos.y <= this.currentRowsCount ) {
                        if ( pos.x >= 1 && pos.x <= this.currentColsInRow ) {
                            teaser.style.gridColumnStart = pos.x;
                        } else if ( pos.x > this.currentColsInRow ) {
                            pos.x = this.currentRowsCount - this.teasersCfg[ i ].size.x + 1;
                        }
                    }

                    $teaser.removeClass( `${ this.settings.brickClass }--hidden` ).addClass( `${ this.settings.brickClass }--teaser-ready` );
                }

                this.teasers.push( teaser );
            } else {
                console.warn( `cs-grid-layout: Teaser was declared but not found in DOM (data-teaser-id: ${ this.teasersCfg[ i ].id })` );
            }
        }
    }

    /**
     * Checks support of CSS Grid Layout in browsers and Initializes the correct methods
     */
    protected _initialize(): void {
        if ( this.isCssGrid ) {
            this._setTeasersCSS();
        } else {
            this._setTeasersPositions();
        }

        this._resizeHandler();
    }

    /**
     * Resize handler
     * Recalculation is triggered only if number of columns was changed
     */
    protected _resizeHandler(): void {
        let _this: any = this;

        $( window ).on( 'resize', function(): void {
            if ( _this.teasers.length && _this.currentColsInRow !== _this.columnsCfg[ _this._getCurrentBreakpointName() ] ) {
                _this._recalculate();
            }
        } );
    }
}