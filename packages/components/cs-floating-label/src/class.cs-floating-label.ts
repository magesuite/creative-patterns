interface IFloatingLabel {
    float(): void;
    unFloat(): void;
    init(): void;
}

interface IFloatingLabelSettings {
    input: JQuery;
    label: JQuery;
    labelFloatedClass: string;
}

class FloatingLabel {

    private input: JQuery;
    private label: JQuery;
    private labelFloatedClass: string;

    constructor(settings: IFloatingLabelSettings) {
        this.input = settings.input;
        this.label = settings.label;
        this.labelFloatedClass = settings.labelFloatedClass;

    }

    public float(): void {
        this.label.addClass(this.labelFloatedClass);
    }

    public unFloat(): void {
        this.label.removeClass(this.labelFloatedClass);
    }

    public init(): void {
        this._events();

    }

    private _events(): void {
        this.input.on('focus', () => {
            this.float();
        });

        this.input.on('blur', () => {
            if (!this.input.val().length) {
                this.unFloat();

            }
        });
    }
}

export {FloatingLabel};
export {IFloatingLabel};
