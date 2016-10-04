import {IParsleyCustomValidatorSettings} from './config.cs-parsley-validators';
import Parsley from 'Parsley';

export const exactLength: Function = (parsley: Parsley, settings: IParsleyCustomValidatorSettings): void => {
    parsley.addValidator('exactLength', {
            requirementType: 'string',
            validateString (value: string, requirement: string): boolean {
                return value.length === parseInt(requirement, 10);

            },
            messages: settings.messages,
        }
    );
};
