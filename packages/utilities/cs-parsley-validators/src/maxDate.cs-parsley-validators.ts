import {IParsleyCustomValidatorSettings} from './config.cs-parsley-validators';
import moment from 'moment';
import Parsley from 'Parsley';

export const date: Function = (parsley: Parsley, settings: IParsleyCustomValidatorSettings): void => {
    parsley.addValidator('maxdate', {
        validateString (value: string, requirement: string): boolean {
            let val: moment = moment(value, 'DD-MM-YYYY');
            let req: moment = moment(requirement, 'DD-MM-YYYY');

            return val.diff(req, 'days') <= 0;

        },
        messages: settings.messages,
    });
};
