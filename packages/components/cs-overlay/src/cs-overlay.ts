import $ from 'jQuery';

interface IOverlay {
    show(): void;
    hide(): void;
    isVisible(): boolean;
}

interface IOverlaySettings {
    $element: JQuery;
    classes: {
        visible: string
    };
}

class Overlay implements IOverlay {
    private _visible: boolean = false;
    private $element: JQuery;
    private classes: Object = {};
    private allowBlurBackground: boolean = true;

    constructor(settings: IOverlaySettings) {
        this.$element = settings.$element;
        this.classes = settings.classes;
    }

    private _blurBackground() {

    }

    public hide() {
        this.$element.removeClass( this.classes.visible );
        this._visible = false;
        this.$element.trigger( 'overlay:hidden' );
    }

    public show() {
        this.$element.addClass( this.classes.visible );
        this._visible = true;
        this.$element.trigger( 'overlay:shown' );

        if (this.allowBlurBackground) {
            this._blurBackground();
        }

    }

    public isVisible() {
        return this._visible;
    }

}

const overlay = new Overlay({
    $element: $('.cs-overlay'),
    classes: {
        visible: 'cs-overlay--is-visible',
    },
    allowBlurBackground: true,
});

export {
    Overlay,
    overlay,
};
