import $ from 'jQuery';

interface INotification {
    getMessage(): string;
    getType(): string;
    remove(): void;
    setType(type: INotificationType): void;
    hide(hiddenClassName?: string): void;
    show(): void;
    getTemplate(): JQuery;
}

interface INotificationSettings {
    notificationHTML: string|JQuery;
    textSelector: string|JQuery;
    iconSelector?: string|JQuery;
    onClose?(): any;
    onAdd?(): any;
}

interface INotificationType {
    name: string;
    iconHTML?: string;
    textClass?: string;
}

class Notification {
    public message: string = null;

    protected _type: INotificationType = {
        name: 'default',
        iconHTML: null,
        textClass: null,
    };

    private _defaults: INotificationSettings = {
        notificationHTML: null,
        textSelector: null,
        iconSelector: null,
        onClose: null,
        onAdd: null,
    };

    private _settings: INotificationSettings = null;

    private _$template: JQuery = null;

    // If once set hidden by adding class name, will store it and reuse it
    private _hiddenClassName: string = null;

    constructor(message: string, settings: INotificationSettings) {

        this._settings = $.extend(this._defaults, settings);

        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }

    public getType(): string {
        return this._type.name;
    }

    public remove(): void {
        this._$template.remove();
    }

    public setType(type: INotificationType): void {
        this._type = type;
    }

    public hide(className?: string): void {
        if (className) {
            this._$template.addClass(className);
            this._hiddenClassName = className;

        } else if (this._hiddenClassName) {
            this._$template.addClass(this._hiddenClassName);

        } else {
            this._$template.hide();

        }
    }

    public show(): void {
        if (this._$template.hasClass(this._hiddenClassName)) {
            this._$template.removeClass(this._hiddenClassName);
        } else {
            this._$template.show();
        }
    }

    public getTemplate(): JQuery {
        if (!this._$template) {
            this._$template = this._compileTemplate();
        }

        return this._$template;
    }

    private _compileTemplate(): JQuery {
        let $html: JQuery = $(this._settings.notificationHTML);
        let $text: JQuery = $html.find(this._settings.textSelector);
        let $iconPlaceholder: JQuery = null;

        $text.text(this.message);
        $text.addClass(this._type.textClass);

        if (this._settings.iconSelector) {
            $iconPlaceholder = $html.find(this._settings.iconSelector);
            $iconPlaceholder.after(this._type.iconHTML);
            $iconPlaceholder.remove();
        }

        this._$template = $html;

        return $html;

    }
}

export {INotification, INotificationSettings, INotificationType, Notification};
