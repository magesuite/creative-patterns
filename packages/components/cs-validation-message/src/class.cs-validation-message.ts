// TODO: Should we move initial methods from constructor to init() method??

export interface IValidationMessageSettings {
    types: Map<string, string>;
}

export interface IValidationMessage {
    getMessage(): string;
    setMessage(message: string): void;
    getType(): string;
    setType(type: string): void;
}

export class ValidationMessage implements IValidationMessage {
    private _$component: JQuery = null;
    private _settings: IValidationMessageSettings = {
        types: null,
    };
    private _message: string = null;
    private _type: string = null;
    private _typeClasses: string = null;

    constructor($component: JQuery, settings?: IValidationMessageSettings) {
        this._$component = $component;
        this._settings = Object.assign(this._settings, settings);
        this._message = this._$component.text();

        if (this._settings.types) {
            this._typeClasses = this._getTypesClasses();
            this._detectType();
        }
    }

    public getMessage(): string {
        return this._message;
    }

    public setMessage(message: string): void {
        this._message = message;

        this._printMessage();
    }

    public getType(): string {
        return this._type;
    }

    public setType(type: string): void {
        this._type = type;

        this._resetComponentType();
        this._updateComponentType();
    }

    private _detectType(): void {
        this._settings.types.forEach((classname: string, type: string) => {
            if (this._$component.hasClass(classname)) {
                this._type = type;
            }
        });
    }

    private _getTypesClasses(): string {
        let classes: string = '';
        this._settings.types.forEach((value: string) => {
            classes += value + ' ';
        });

        return classes;
    }

    private _resetComponentType(): void {
        this._$component.removeClass(this._typeClasses);
    }

    private _updateComponentType(): void {
        this._$component.addClass(this._settings.types.get(this._type));
    }

    private _printMessage(): void {
        this._$component.text(this._message);
    }
}
