import {IParsleyCustomValidatorSettings} from './config.cs-parsley-validators';
import Parsley from 'Parsley';

export interface IPasswordDifficultyValidatorSettings extends IParsleyCustomValidatorSettings {
    regexpString?: string;
}

export const password: Function = (parsley: Parsley, settings: IPasswordDifficultyValidatorSettings): void => {
    parsley.addValidator('password', {
        validateString (value: string): boolean {
            let regexpString: string = null;

            if (settings.regexpString) {
                regexpString = settings.regexpString;
            } else {
                regexpString = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}';
            }

            let regexp: RegExp = new RegExp(regexpString);

            return regexp.test(value);

        },
        messages: settings.messages,
    });
};
