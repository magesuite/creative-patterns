interface IFloatingLabel {
    float(): void,
    unFloat(): void,
    init(): void
}

interface IFloatingLabelSettings {
    input: JQuery,
    label: JQuery,
    labelFloatedClass: string
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

    float() {
        this.label.addClass(this.labelFloatedClass);
    }

    unFloat() {
        this.label.removeClass(this.labelFloatedClass);
    }

    _events() {
        this.input.on('focus', () => {
            this.float();
        });

        this.input.on('blur', () => {
            if (!this.input.val().length) {
                this.unFloat();

            }
        });
    }

    init() {
        this._events();

    }
}
export default FloatingLabel;