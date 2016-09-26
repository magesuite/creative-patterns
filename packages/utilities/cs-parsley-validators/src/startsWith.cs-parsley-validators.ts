import {IParsleyCustomValidatorSettings} from './config.cs-parsley-validators';
import Parsley from 'Parsley';

export const startsWith: Function = (parsley: Parsley, settings: IParsleyCustomValidatorSettings): void => {
    parsley.addValidator('startsWith', {
            requirementType: 'string',
            validateString (value: string, requirement: string): boolean {
                return value.trim().toLowerCase().indexOf(requirement.toLowerCase()) === 0;
            },
            messages: settings.messages,
        }
    );
};
