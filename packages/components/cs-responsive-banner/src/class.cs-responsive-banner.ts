interface IResponsiveBanner {
    setSize(sizeName: string): void;
    getCurrentSize(): string;
    addNewSource(name: string, size: ISize): void;
}

interface IResponsiveBannerSettings {
    $image: JQuery;
}

interface ISize {
    // For future extend
    sourceUrl: string;
}

class ResponsiveBanner implements IResponsiveBanner {
    private _settings: IResponsiveBannerSettings = {
        $image: null,
    };
    private _$element: JQuery;
    private _sizesArray: Map<string, ISize>;
    private _currentSize: string = null;

    constructor($element: JQuery, settings?: IResponsiveBannerSettings) {
        this._$element = $element;
        this._settings.$image = this._$element.find('img');
        this._settings = Object.assign(this._settings, settings);
        this._sizesArray = new Map();
    }

    public addNewSource(name: string, size: ISize): void {
        this._sizesArray.set(name, size);
    }

    public setSize(name: string): void {
        this._currentSize = name;
        let source: string = this._sizesArray.get(name).sourceUrl;

        this._replaceSrc(source);
    }

    public getCurrentSize(): string {
        return this._currentSize;
    }

    private _replaceSrc(src: string): void {
        this._settings.$image.attr('src', src);

    }

}

export {IResponsiveBanner, IResponsiveBannerSettings, ResponsiveBanner};
